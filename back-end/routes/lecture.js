const router = require('express').Router()
const { verifyToken,  verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken")
const Lecture = require("../models/Lecture");

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
  
//GET
router.get("/find/:id", async (req, res) => {
    try {
      const lecture = await Lecture.findById(req.params.id);
      res.status(200).json(lecture);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
  module.exports = router;