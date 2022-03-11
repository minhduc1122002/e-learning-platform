const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const JWT = require('jsonwebtoken')

//Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_KEY).toString(),
    })
    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) res.status(401).json("Wrong username")
        const originalPass = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)
        if (originalPass !== req.body.password) res.status(401).json("Wrong password")
        const accessToken = JWT.sign(
            {
                id: user._id, 
                isAdmin: user.isAdmin
            }, 
            process.env.JWT_KEY, 
            {expiresIn: "1d"}
        )
        const { password, ...others } = user._doc
        res.status(200).json({ ...others, accessToken })
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})


module.exports = router