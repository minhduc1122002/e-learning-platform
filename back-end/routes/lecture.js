const router = require('express').Router()
const { verifyToken,  verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken")
const Lecture = require("../models/Lecture");
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;

//CREATE
router.post("/", async (req, res) => {
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
              $set: req.body
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
router.put("/lessons/:id", async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id)
    lecture.lessons.push(req.body)
    lecture.save()
    res.status(200).json(lecture);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;