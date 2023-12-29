const express = require('express');
const PORT = 5000;

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello Fuckers!</h1>');
});

app.listen(PORT, (req, res) => {
  console.log('porta: 5000');
});
