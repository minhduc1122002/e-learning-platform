const router = require('express').Router()
const { verifyToken,  verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken")
const User = require("../models/User");
const Course = require('../models/Course');

//Update
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_KEY).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedUser);
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//Delete
router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});

//Get User
router.get("/find/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
});

//Get All User (only admin)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
});

//ADD COURSE
router.put("/enroll/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user.courses.includes(req.body)) {
      user.courses.push(req.body)
      user.save()
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL COURSE ENROLLED
router.get("/my_course/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const courses = await Course.find( { path : { $in : user.courses } } )
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router