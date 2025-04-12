import multer from "multer";
import { mkdirSync, existsSync } from 'fs';
import path from 'path';

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Remove extra curly brace
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

export default upload;