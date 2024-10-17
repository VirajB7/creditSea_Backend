import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL= process.env.MONGODB_URI? process.env.MONGODB_URI : 'mongodb://localhost:27017/test';

const SERVER_PORT = process.env.PORT? Number(process.env.PORT) : 3000;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    jwtSecret: process.env.JWT_SECRET as string
}
