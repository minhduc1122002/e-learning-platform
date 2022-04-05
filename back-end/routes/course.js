const router = require('express').Router()
const { verifyToken,  verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken")
const Course = require("../models/Course");
const Lecture = require('../models/Lecture');

//CREATE
router.post("/", async (req, res) => {
    const newCourse = new Course(req.body);
    try {
      const savedCourse = await newCourse.save();
      res.status(200).json(savedCourse);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
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

//UPDATE BY PATH
router.put("/update/:path", async (req, res) => {
  try {
    const updatedCourse = await Course.findOneAndUpdate(
        {path: req.params.path},
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
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});
  
//GET BY ID
router.get("/:id", async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET BY PATH
router.get("/findby/:path", async (req, res) => {
  try {
    const course = await Course.findOne( {path: req.params.path} );
    const lectures = await Lecture.find( {course_path: req.params.path} );
    res.status(200).json({...course._doc, lectures});
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
    try {
        const course = await Course.find();
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json(err);
    }
});
  
  module.exports = router;