const router = require('express').Router()
const { verifyToken,  verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken")
const Lecture = require("../models/Lecture");
const Course = require("../models/Course")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;

//CREATE
router.post("/",verifyTokenAndAdmin, async (req, res) => {
    const newLecture = new Lecture(req.body);
    try {
      const savedLecture = await newLecture.save();
      res.status(200).json(savedLecture);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedLecture = await Lecture.findByIdAndUpdate(
          req.params.id,
          {
              course_path: req.body.course_path,
              title: req.body.title,
              description: req.body.description
          },
          { new: true}
      )
      res.status(200).json(updatedLecture)
    } catch (err) {
      res.status(500).json(err);
    }
});
  
//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Lecture.findByIdAndDelete(req.params.id);
      res.status(200).json("Lecture has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});
  
//GET BY ID
router.get("/find/:id", async (req, res) => {
    try {
      const lecture = await Lecture.findById(req.params.id);
      res.status(200).json(lecture);
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET BY COURSE PATH
router.get("/findby/:coursePath", async (req, res) => {
  try {
    const lectures = await Lecture.find( {course_path: req.params.coursePath} );
    res.status(200).json(lectures);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET LESSONS
router.get("/lessons/:lessonId", async (req, res) => {
  try {
    const lecture = await Lecture.aggregate([
      {
        $unwind: "$lessons"
      },
      {
          $match: { "lessons._id": ObjectId(req.params.lessonId) }
      },
      {
          $replaceRoot: { newRoot: "$lessons"}
      }
    ]);
    res.status(200).json(lecture);
  } catch (err) {
    res.status(500).json(err);
  }
});

//ADD LESSONS
router.put("/lessons/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id)
    if (req.body.title) {
      lecture.lessons.push(req.body)
    } else {
      return res.status(500).json("Title field is required")
    }
    
    lecture.save()
    res.status(200).json(lecture);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE A LESSON
router.put("/lessons/update/:lessonId", verifyTokenAndAdmin,async(req, res) => {
  try {
    const lecture = await Lecture.findOneAndUpdate(
      {
        lessons: {$elemMatch: {_id: req.params.lessonId}}
      },
      {
        $set : {"lessons.$" : req.body}
      },
      { new: true}
    )
    res.status(200).json(lecture);
  }catch(err){
    res.status(500).json(err)
  }
});

//DELETE A LESSON
router.put("/lessons/delete/:lessonId",verifyTokenAndAdmin, async(req, res) => {
  try {
    const lecture = await Lecture.findOneAndUpdate(
      {
        lessons: {$elemMatch: {_id: req.params.lessonId}}
      },
      {
        $pull: {lessons : {_id: req.params.lessonId}}
      },
      { new: true}
    )
    res.status(200).json(lecture)
  }catch(err){
    res.status(500).json(err)
  }
});

//GET ALL LECTURES
router.get("/", async (req, res) => {
  try {
    const lecture = await Lecture.aggregate( [
      { $lookup:
        {
          from: "courses",
          localField: "course_path",
          foreignField: "path",
          as: "course",
        }
      },
      // { $unset: ["lessons"]}
    ])
    res.status(200).json(lecture);
  }catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;