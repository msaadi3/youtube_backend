import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            // return null
            throw new Error("didn't get the local file path")
        }
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: 'auto' })
        console.log('file uploaded successfully', response.url);
        // console.log('response: \n', response);
        fs.unlinkSync(localFilePath) //remove the localy saved temp file as the file uploaded successfully
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the localy saved temp file as the file upload operation got failed
        console.log('error while uploading file on cloudinary', error);
        return null
    }
}
