import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { config } from 'dotenv';
import { router as authRouter } from './routes/authentication';
import { router as usersRouter } from './routes/users';
import { router as listsRouter } from './routes/lists';
import { router as productsRouter } from './routes/products';
import { router as brandsRouter } from './routes/brands';
import { MongoClient } from './db/mongo';

const app = express();
config();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }),
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

MongoClient.connect();

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/lists', listsRouter);
app.use('/products', productsRouter);
app.use('/brands', brandsRouter);

const server = http.createServer(app);
server.listen('8080', () => {
  console.clear();
  console.log('Server running on:\nhttp://localhost:8080\n');
});
