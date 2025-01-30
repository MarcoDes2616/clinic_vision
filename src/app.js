const express = require('express');
const initModels = require("./models/");
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./utils/errorHandler');
require('dotenv').config();
initModels();
// Esta es nuestra aplicación
const app = express();
const path = require("path");

// Middlewares 
app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors());
app.use('/api/v1', router);
app.get('/api/v1', (req, res) => {
    return res.send("Welcome to express!");
})
app.use("/api/v1/uploads", express.static(path.join(__dirname, "uploads")));

// middlewares después de las rutas
app.use(errorHandler)

module.exports = app;
