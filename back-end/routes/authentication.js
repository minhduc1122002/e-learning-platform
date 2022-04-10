const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const JWT = require('jsonwebtoken')

//Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_KEY).toString(),
    })
    try {
        const savedUser = await newUser.save()
        const accessToken = JWT.sign(
            {
                id: newUser._id, 
                isAdmin: newUser.isAdmin
            }, 
            process.env.JWT_KEY, 
            {expiresIn: "30d"}
        )
        res.status(200).json({ ...savedUser._doc, accessToken })
    } catch(err) {
        res.status(500).json(err)
    }
})

//Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return res.status(401).json("Your Username is incorrect")
        const originalPass = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)
        if (originalPass != req.body.password) return res.status(401).json("Your Password is incorrect")
        const accessToken = JWT.sign(
            {
                id: user._id, 
                isAdmin: user.isAdmin
            }, 
            process.env.JWT_KEY, 
            {expiresIn: "30d"}
        )
        res.status(200).json({ ...user._doc, accessToken })
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router