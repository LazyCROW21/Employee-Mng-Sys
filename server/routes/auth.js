const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const router = express.Router();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "SUPERSECRET";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "SUPERSECRET";

let refreshTokens = [];

function generateToken(data) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
}

// Login API
router.post("/login", async (req, res) => {
    const user = {
        id: 7,
        username: "LazyCROW",
    };
    const accessToken = generateToken(user);
    const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({
        accessToken: accessToken,
        refreshToken: refreshToken
    })
});

// Refresh Token
router.post("/token", async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if(refreshToken == null) {
        res.status(401).json({error: 'Refresh Token Not Found'});
    }
    if(!refreshTokens.includes(refreshToken)) {
        res.status(403).json({error: 'Refresh Token Not Valid'});
    }
    try {
        const decode = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        // req.user = decoded;
        const accessToken = generateToken(decode);
        res.json({accessToken: accessToken});
    } catch (error) {
        console.log(error);
        res.status(403).json({error: 'Token Expired'});
    }
});

// Delete Token
router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.refreshToken);
    res.status(204).json({message: 'Logout Successfull'});
})

function verifyToken(req, res, next) {
    // Get auth header value
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    // Check if bearer is undefined
    if (token != null) {
        try {
            const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            console.log(error);
            res.status(403).json({error: 'Token Expired'});
        }
    } else {
        // Forbidden
        res.status(403).json({error: 'Token Not Found'});
    }
}

module.exports = {router, verifyToken};