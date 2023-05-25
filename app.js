const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login, logout } = require('./controllers/users');
const { validateCreateUser, validateLogin } = require('./middlewares/requestValidation');
const NotFoundError = require('./errors/not-found-err');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/filmsbd', {
  useNewUrlParser: true,
});

const allowedCors = [
  'http://kosyachenko.filmsite.nomoredomains.monster',
  'https://kosyachenko.filmsite.nomoredomains.monster',
  'http://api.kosyachenko.filmsite.nomoredomains.monster',
  'https://api.kosyachenko.filmsite.nomoredomains.monster',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.post('/signout', auth, logout);
app.use('/movies', auth, require('./routes/movies'));
app.use('/users', auth, require('./routes/users'));

app.use(errorLogger);
app.use(errors());

app.use(auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
  next();
});

app.listen(3000);
