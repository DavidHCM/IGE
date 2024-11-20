import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {config} from 'dotenv'
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from 'swagger-ui-express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import swaggerConfig from '../swagger.config.json';
import notificationSocketHandler from './sockets/socket.handler';


config();


import routesIndex from './routes/index';
const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

const dbURL = process.env.DB_URL;

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*', // TODO: Cambiar a la url en deploy
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

notificationSocketHandler(io);


mongoose.connect(dbURL as string).then(() => {
    console.log('Base de datos conectada');

    app.use(routesIndex);
    const swaggerDocs = swaggerJSDoc(swaggerConfig);
    app.use('/swagger', serve, setup(swaggerDocs));
    console.log('Swagger configurado');

    const server = app.listen(port, () => {
        console.log(`Servidor ejecutándose en el puerto ${port}`);
    });

    const io = new Server(server, {
        cors: {
            origin: '*', // Cambiar a la URL específica si es necesario
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        },
    });

    notificationSocketHandler(io);

}).catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
});

//TODO: Cambiar las rutas de las suggestionRoutes para que implementen la libreria y tambien en el guardado de ellas en mongoDB.
