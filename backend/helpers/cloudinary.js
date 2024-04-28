import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import { config } from '../config/config.js';

cloudinary.config({
    cloud_name: config.get('cloudinary_cloude_name'),
    api_key: config.get('cloudinary_api_key'),
    api_secret: config.get('cloudinary_api_secret')
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null
        }
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file uploaded successfully
        console.log("file is uploaded successfully", response.url);
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the uplode operation got failed
        return null
    }
}

