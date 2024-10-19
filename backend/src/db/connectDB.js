import mongoose from "mongoose";
import { DBName } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionResponse = await mongoose.connect(`${process.env.MONGODB_URI}/${DBName}`)
        console.log('MongoDB connected!! connection host: ', connectionResponse.connection.host);
        // console.log('connectionResponse: ', connectionResponse)
    } catch (error) {
        console.log('error while connecting with database in db/index.js file ', error)
        // throw error
        process.exit(1)
    }
}

export default connectDB