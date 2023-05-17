const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const { celebrate, Joi } = require('celebrate');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(3000);
