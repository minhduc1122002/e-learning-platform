const router = require('express').Router()
const { verifyToken,  verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken")
const User = require("../models/User");
const Course = require('../models/Course');
const CryptoJS = require('crypto-js')

//Update
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_KEY).toString()
    }
    try {
        const user = await User.findById(req.params.id)
        if (user) {
          if (req.body.fullname) {
            user.fullname = req.body.fullname
          }
          if (req.body.location) {
            user.location = req.body.location
          }
          if (req.body.bio) {
            user.bio = req.body.bio
          }
          if (req.body.profileImage) {
            user.profileImage = req.body.profileImage
          }
          if (confirmPassword && confirmPassword === CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)) {
            if (req.body.username) {
              user.username = req.body.username
            }
          }
          if (oldPassword && newPassword) {
            if (oldPassword === CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)) {
                user.password = CryptoJS.AES.encrypt(newPassword, process.env.CRYPTO_KEY).toString()
            } else {
              return res.status(400).json("Wrong Password");
            }
          }
        }
        user.save()
        res.status(200).json(user);
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
router.put("/enroll/:id", verifyTokenAndAdmin, async (req, res) => {
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