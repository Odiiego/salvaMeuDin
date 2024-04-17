import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import router from './router';
import { MongoClient } from './db/mongo';

const app = express();
config();

app.use(
  cors({
    credentials: true,
  }),
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen('8080', () => {
  console.clear();
  console.log('Server running on:\nhttp://localhost:8080');
});

MongoClient.connect();

app.use('/', router());
