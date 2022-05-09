const router = require('express').Router()
const { verifyToken,  verifyTokenAndAuth, verifyTokenAndAdmin, verifyTokenAndAuthForBlog } = require("./verifyToken")
const Blog = require("../models/Blog");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//CREATE
router.post("/", verifyToken, async (req, res) => {
    const newBlog = new Blog(req.body);
    try {
      const savedBlog = await newBlog.save();
      res.status(200).json(savedBlog);
    } catch (err) {
      res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthForBlog, async (req, res) => {
    const { creator, ...others } = req.body
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {
                $set: others
            },
            { new: true }
        )
        const result = await Blog.aggregate([
            {
                $match: {_id: ObjectId(req.params.id)}
            },
            { $lookup:
                {
                    from: "users",
                    let: { creatorId: { $toObjectId:"$creator" } },
                    pipeline: [
                        { $match: { $expr: { $eq: [ "$_id", "$$creatorId" ] } } },
                        { $project: { "fullname": 1, "_id": 1, "profileImage": 1 } }
                    ],
                    as: "creator"
                }
            },
            { $unwind: {
                path: "$creator", 
                preserveNullAndEmptyArrays: true 
              } 
            },
            { $unwind: {
                path: "$comments", 
                preserveNullAndEmptyArrays: true 
              }  
            },
            { $lookup:
                {
                    from: "users",
                    let: { userId: { $toObjectId:"$comments.userId" } },
                    pipeline: [
                        { $match: { $expr: { $eq: [ "$_id", "$$userId" ] } } },
                        { $project: { "fullname": 1, "_id": 1, "profileImage": 1 } }
                    ],
                    as: "comments.commentator"
                }
            },
            { $unwind: {
                path: "$comments.commentator", 
                preserveNullAndEmptyArrays: true 
              }  
            },
            { $unset: "comments.userId" },
            { $group: {
                _id: "$_id",
                creator: { $first: "$creator" },
                title: { $first: "$title" },
                articles: { $first: "$articles" },
                image: { $first: "$image" },
                likes: { $first: "$likes" },
                comments: {
                  $push:  { $cond: { if: { $eq: ['$comments', {}] }, then: '$$REMOVE', else: '$comments' }}
                }
            }}
          ])
        res.status(200).json(result[0])
      } catch (err) {
          console.log(err)
        res.status(500).json(err);
      }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthForBlog, async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json("Blog has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//LIKE & UNLIKE
router.put("/like/:id", verifyToken, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        const index = blog.likes.findIndex((id) => id === String(req.body.userId));
        if (index === -1) {
            blog.likes.push(req.body.userId);
        } else {
            blog.likes = blog.likes.filter((id) => id !== String(req.body.userId));
        }
        await blog.save()
        const result = await Blog.aggregate([
            {
                $match: {_id: ObjectId(req.params.id)}
            },
            { $lookup:
                {
                    from: "users",
                    let: { creatorId: { $toObjectId:"$creator" } },
                    pipeline: [
                        { $match: { $expr: { $eq: [ "$_id", "$$creatorId" ] } } },
                        { $project: { "fullname": 1, "_id": 1, "profileImage": 1 } }
                    ],
                    as: "creator"
                }
            },
            { $unwind: {
                path: "$creator", 
                preserveNullAndEmptyArrays: true 
              } 
            },
            { $unwind: {
                path: "$comments", 
                preserveNullAndEmptyArrays: true 
              }  
            },
            { $lookup:
                {
                    from: "users",
                    let: { userId: { $toObjectId:"$comments.userId" } },
                    pipeline: [
                        { $match: { $expr: { $eq: [ "$_id", "$$userId" ] } } },
                        { $project: { "fullname": 1, "_id": 1, "profileImage": 1 } }
                    ],
                    as: "comments.commentator"
                }
            },
            { $unwind: {
                path: "$comments.commentator", 
                preserveNullAndEmptyArrays: true 
              }  
            },
            { $unset: "comments.userId" },
            { $group: {
                _id: "$_id",
                creator: { $first: "$creator" },
                title: { $first: "$title" },
                articles: { $first: "$articles" },
                image: { $first: "$image" },
                likes: { $first: "$likes" },
                comments: {
                  $push:  { $cond: { if: { $eq: ['$comments', {}] }, then: '$$REMOVE', else: '$comments' }}
                }
            }}
          ])
        res.status(200).json(result[0])
    } catch (err) {
      res.status(500).json(err);
    }
});

//COMMENT
router.put("/comment/:id", verifyToken, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        blog.comments.push(req.body)
        await blog.save()
        const result = await Blog.aggregate([
            {
                $match: {_id: ObjectId(req.params.id)}
            },
            { $lookup:
                {
                    from: "users",
                    let: { creatorId: { $toObjectId:"$creator" } },
                    pipeline: [
                        { $match: { $expr: { $eq: [ "$_id", "$$creatorId" ] } } },
                        { $project: { "fullname": 1, "_id": 1, "profileImage": 1 } }
                    ],
                    as: "creator"
                }
            },
            { $unwind: {
                path: "$creator", 
                preserveNullAndEmptyArrays: true 
              } 
            },
            { $unwind: {
                path: "$comments", 
                preserveNullAndEmptyArrays: true 
              }  
            },
            { $lookup:
                {
                    from: "users",
                    let: { userId: { $toObjectId:"$comments.userId" } },
                    pipeline: [
                        { $match: { $expr: { $eq: [ "$_id", "$$userId" ] } } },
                        { $project: { "fullname": 1, "_id": 1, "profileImage": 1 } }
                    ],
                    as: "comments.commentator"
                }
            },
            { $unwind: {
                path: "$comments.commentator", 
                preserveNullAndEmptyArrays: true 
              }  
            },
            { $unset: "comments.userId" },
            { $group: {
                _id: "$_id",
                creator: { $first: "$creator" },
                title: { $first: "$title" },
                articles: { $first: "$articles" },
                image: { $first: "$image" },
                likes: { $first: "$likes" },
                comments: {
                  $push:  { $cond: { if: { $eq: ['$comments', {}] }, then: '$$REMOVE', else: '$comments' }}
                }
            }}
          ])
        res.status(200).json(result[0])
    } catch (err) {
        console.log(err)
      res.status(500).json(err);
    }
});

//GET BLOG BY ID
router.get("/:id", async (req, res) => {
    try {
      const blog = await Blog.aggregate([
        {
            $match: {_id: ObjectId(req.params.id)}
        },
        { $addFields: {
            date: { $dateDiff:
                {
                    startDate: "$createdAt",
                    endDate: new Date(),
                    unit: "hour"
                }
            }
          }
        },
        { $lookup:
            {
                from: "users",
                let: { creatorId: { $toObjectId:"$creator" } },
                pipeline: [
                    { $match: { $expr: { $eq: [ "$_id", "$$creatorId" ] } } },
                    { $project: { "fullname": 1, "_id": 1, "profileImage": 1 } }
                ],
                as: "creator"
            }
        },
        { $unwind: {
            path: "$creator", 
            preserveNullAndEmptyArrays: true 
          } 
        },
        { $unwind: {
            path: "$comments", 
            preserveNullAndEmptyArrays: true 
          }  
        },
        { $lookup:
            {
                from: "users",
                let: { userId: { $toObjectId:"$comments.userId" } },
                pipeline: [
                    { $match: { $expr: { $eq: [ "$_id", "$$userId" ] } } },
                    { $project: { "fullname": 1, "_id": 1, "profileImage": 1 } }
                ],
                as: "comments.commentator"
            }
        },
        { $unwind: {
            path: "$comments.commentator", 
            preserveNullAndEmptyArrays: true 
          }  
        },
        { $unset: "comments.userId" },
        { $group: {
            _id: "$_id",
            creator: { $first: "$creator" },
            title: { $first: "$title" },
            articles: { $first: "$articles" },
            image: { $first: "$image" },
            likes: { $first: "$likes" },
            comments: {
              $push:  { $cond: { if: { $eq: ['$comments', {}] }, then: '$$REMOVE', else: '$comments' }}
            },
            dateDiff: { $first: "$date" },
        }}
      ])
      res.status(200).json(blog[0])
    } catch (err) {
        console.log(err)
      res.status(500).json(err);
    }
});

//GET ALL
router.get("/", async (req, res) => {
    try {
      const blogs = await Blog.aggregate([
        { $addFields: {
            date: { $dateDiff:
                {
                    startDate: "$createdAt",
                    endDate: new Date(),
                    unit: "hour"
                }
            }
          }
        },
        { $lookup:
            {
                from: "users",
                let: { creatorId: { $toObjectId:"$creator" } },
                pipeline: [
                    { $match: { $expr: { $eq: [ "$_id", "$$creatorId" ] } } },
                    { $project: { "fullname": 1, "_id": 1, "profileImage": 1 } }
                ],
                as: "creator"
            }
        },
        { $unwind: {
            path: "$creator", 
            preserveNullAndEmptyArrays: true 
          } 
        },
        { $unwind: {
            path: "$comments", 
            preserveNullAndEmptyArrays: true 
          }  
        },
        { $lookup:
            {
                from: "users",
                let: { userId: { $toObjectId:"$comments.userId" } },
                pipeline: [
                    { $match: { $expr: { $eq: [ "$_id", "$$userId" ] } } },
                    { $project: { "fullname": 1, "_id": 1, "profileImage": 1 } }
                ],
                as: "comments.commentator"
            }
        },
        { $unwind: {
            path: "$comments.commentator", 
            preserveNullAndEmptyArrays: true 
          }  
        },
        { $unset: "comments.userId" },
        { $group: {
            _id: "$_id",
            creator: { $first: "$creator" },
            title: { $first: "$title" },
            articles: { $first: "$articles" },
            image: { $first: "$image" },
            likes: { $first: "$likes" },
            dateDiff: { $first: "$date" },
            comments: {
              $push:  { $cond: { if: { $eq: ['$comments', {}] }, then: '$$REMOVE', else: '$comments' }}
            }
        }}
      ])
      res.status(200).json(blogs)
    } catch (err) {
        console.log(err)
      res.status(500).json(err);
    }
});

module.exports = router;