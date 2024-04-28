//we are efficiently handling env variable from here

const _config = {
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    devMode: process.env.DEV_MODE,
    jwtSecret: process.env.JWT_SECRET,
    cloudinary_cloude_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET



}

export const config = {
    get(key) {
        const value = _config[key];
        if (!value) {
            console.log(`The ${key} vraible not found!!`);
            process.exit();
        }
        return value;
    }
}