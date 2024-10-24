import express from 'express';
import mongoose from 'mongoose';
import {config} from 'dotenv'
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from 'swagger-ui-express';
import swaggerConfig from '../swagger.config.json';


config();
import routesIndex from './routes/index';
const app = express();
const port = process.env.PORT || 3000;

const dbURL = process.env.DB_URL;


mongoose.connect(dbURL as string).then(res =>{
    app.use(routesIndex);
    const swaggerDocs = swaggerJSDoc(swaggerConfig);
    app.use('/swagger',serve,setup(swaggerDocs));
    console.log("Data base connected")
    app.listen(3000, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => console.log(err));

