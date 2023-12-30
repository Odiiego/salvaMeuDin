const express = require('express');
const mongoose = require('mongoose');
const List = require('./models/list.model');
const listRouter = require('./routes/list.route');

require('dotenv').config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(express.json());

app.use('/', listRouter);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
