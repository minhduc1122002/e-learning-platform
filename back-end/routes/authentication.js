const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const JWT = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client("6121299943-jiqf0v9olgtvhck1qg0sjo2p1k8fp2ms.apps.googleusercontent.com")

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

//Login
router.post("/google", async (req, res) => {
    try {
        const { tokenId } = req.body
        const response = await client.verifyIdToken({idToken: tokenId, audience: "6121299943-jiqf0v9olgtvhck1qg0sjo2p1k8fp2ms.apps.googleusercontent.com"})
        const user = await User.findOne( { email: response.payload.email } )
        if (!user) {
            const newUser = new User({
                fullname: response.payload.name,
                username: response.payload.email,
                email: response.payload.email,
                profileImage: response.payload.picture,
                password: CryptoJS.AES.encrypt(response.payload.email, process.env.CRYPTO_KEY).toString(),
            })
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
        }
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
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router