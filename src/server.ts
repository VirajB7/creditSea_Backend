import express from 'express';
import http from 'http';
import mongoose, { connect } from 'mongoose';
import {config} from './config/config';
import connectDB from './db/index';
import routes from './routes';
import {createAdmin} from './utils/createAdmin';
import bodyParser from 'body-parser';
const app= express();

// Create Admin
// createAdmin();

// Connect to MongoDB
connectDB()


const startServer= ()=>{
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(bodyParser.json());
    
    /**HealthCheck */
    // app.get('/health', (req: express.Request, res: express.Response) => {
    //     res.status(200).send('I am OK');
    // });

    //Routes
    app.use('/api', routes);

    //Error Handling
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        const error = new Error('Not found');
        res.status(404).json({
            message: error.message
        });
    });

    const server = http.createServer(app);
    server.listen(config.server.port, () => {
        console.log(`Server running at http://localhost:${config.server.port}`);
    });
};

startServer();