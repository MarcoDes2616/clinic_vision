const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1]; 
    try {
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        if (data.user.roleId !== 1 || !data.user.status) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.isAdmin = true;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = isAdmin;