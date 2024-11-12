const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config()

const secretKey = process.env.WhatIsYourName1


const verifyToken1 = async(req, res, next) => {
    const userToken = req.headers.token;

    if (!userToken) {
        return res.status(401).json({ error: "Token is required" });
    }
    try {
        const decoded = jwt.verify(token, secretKey)
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ error: "user not found" })
        }

        req.userId = user._id

        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Invalid token" });
    }

}

module.exports = verifyToken1