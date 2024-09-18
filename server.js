import express, { json } from 'express';
import fs from 'node:fs';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import authorRouter from './Routes/authorsRouter.js';
import quoteRouter from './Routes/quotesRouter.js';

const app = express();
const dirname = path.resolve();

// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(dirname, 'Logs/request_logs.txt'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

// Enable CORS for all routes
app.use(cors({
    origin: '*', //wildcard is not for production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

// Middleware
app.use(morgan('dev'));
app.use(json())


// Router Middleware
app.use('/api/V1/authors', authorRouter)
app.use('/api/V1/quotes', quoteRouter)

export default app;