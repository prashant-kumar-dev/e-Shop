import mongoose from "mongoose";
import { config } from "./config.js";
import colors from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.get('mongoURL'));
        console.log(`Connect to DB ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`Error in db connection ${error}`.bgRed.white);
    }

}
export default connectDB;
