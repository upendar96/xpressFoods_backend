const Rider = require('../models/Rider');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config()

const secretKey = process.env.WhatIsYour


const verifyToken2 = async(req, res, next) => {
    const riderToken = req.headers.token;

    if (!riderToken) {
        return res.status(401).json({ error: "Token is required" });
    }
    try {
        const decoded = jwt.verify(token, secretKey)
        const rider = await Rider.findById(decoded.riderId);

        if (!rider) {
            return res.status(404).json({ error: "user not found" })
        }

        req.riderId = rider._id

        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Invalid token" });
    }

}

module.exports = verifyToken2