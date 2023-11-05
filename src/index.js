// second approach is to to create another file in db folder create function that would connect with db 
// import connectDB from "./db/connectDB.js";
import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})

// connectDB()


// First approach to connect with DB is to code an iifi in index.js file
import mongoose from "mongoose";
import { DBName } from './constants.js'
import express from 'express'
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DBName}`)
            .then(() => {
                console.log('connectd ');
            })
            .catch((err) => {
                console.error('error ', err);
                throw err
            })

        app.listen(process.env.PORT, () => {
            console.log('app is listening on PORT: ', process.env.PORT);
        })

    } catch (error) {
        console.error('error while connecting with database in index.js file ', error)
        // process.exit(1)
        throw error
    }

})()

