const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({ dest: '/src/uploads/' })

module.exports = upload;