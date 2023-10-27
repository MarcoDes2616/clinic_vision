const jwt = require('jsonwebtoken');
require('dotenv').config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decode.user;
    req.iat = decode.iat;
    next();
}

module.exports = verifyJWT;