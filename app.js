const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const auth = require('./middlewares/auth');
const ConflictError = require('./errors/conflict-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/filmsbd', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(/^\S+@\S+\.\S+$/),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().regex(/^\S+@\S+\.\S+$/),
    password: Joi.string().required(),
  }),
}), createUser);

app.use('/movies', auth, require('./routes/movies'));
app.use('/users', auth, require('./routes/users'));

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.code === 11000) {
    return next(new ConflictError('Такой email уже существует'));
  }

  return res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(3000);
