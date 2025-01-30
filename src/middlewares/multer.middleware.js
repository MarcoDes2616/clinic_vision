const fs = require("node:fs")

const saveImage = (req, res, next) => {
    const file = req.file;
    const newPath = `/uploads/${file.originalname}`
    fs.renameSync(file.path, `./src${newPath}`)
    req.body.signatureImg = newPath
    next()
}

module.exports = saveImage;