const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "uploads/resumes",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = /pdf|doc|docx/;
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, allowed.test(ext));
    },
});

module.exports = upload;
