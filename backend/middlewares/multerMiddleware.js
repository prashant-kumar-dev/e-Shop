import multer from "multer";
import { mkdirSync, existsSync } from "fs";
import { resolve } from "path";

// Function to create the upload folder if it doesn't exist
const uploadFolderPath = resolve('./upload/tmp');
if (!existsSync(uploadFolderPath)) {
    mkdirSync(uploadFolderPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolderPath)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const upload = multer({ storage: storage })