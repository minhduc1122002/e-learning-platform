const router = require('express').Router()
const { verifyToken,  verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken")
const Course = require("../models/Course");
const Lecture = require('../models/Lecture');

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newCourse = new Course(req.body);
    try {
      const savedCourse = await newCourse.save();
      res.status(200).json(savedCourse);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
//UPDATE
router.put("/update/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        { new: true}
    )
    res.status(200).json(updatedCourse)
  } catch (err) {
    res.status(500).json(err);
  }
});
  
//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Course.findByIdAndDelete(req.params.id);
      res.status(200).json("Course has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET BY PATH
router.get("/findby/:path", async (req, res) => {
  try {
    const course = await Course.aggregate([
      {
        $match: {path: req.params.path}
      },
      { $lookup:
          {
            from: "lectures",
            localField: "path",
            foreignField: "course_path",
            as: "lectures"
          }
      },
      { $lookup:
        {
          from: "users",
          localField: "path",
          foreignField: "courses",
          as: "students"
        }
    },
      { $addFields: {
          totalLessons: { $size: "$lectures.lessons" },
          totalLectures: { $size: "$lectures" },
          totalStudents: { $size: "$students" }
        }
      },
      { $unset: ["students", "lectures"] }
    ]);
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  try {
      const course = await Course.aggregate([
        { $lookup:
            {
              from: "lectures",
              localField: "path",
              foreignField: "course_path",
              as: "lectures"
            }
        },
        { $lookup:
          {
            from: "users",
            localField: "path",
            foreignField: "courses",
            as: "students"
          }
      },
        { $addFields: {
            totalLessons: { $size: "$lectures.lessons" },
            totalLectures: { $size: "$lectures" },
            totalStudents: { $size: "$students" }
          }
        },
        { $unset: ["students", "lectures"] }
      ]);
      res.status(200).json(course);
  } catch (err) {
      res.status(500).json(err);
  }
});
  
  module.exports = router;