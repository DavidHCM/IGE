import express from 'express';
import mongoose from 'mongoose';
import {config} from 'dotenv'


config();
const app = express();
const port = process.env.PORT || 3000;

const dbURL = process.env.DB_URL;


mongoose.connect(dbURL as string).then(res =>{
    console.log("Data base connected")
    app.listen(3000, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => console.log(err));

