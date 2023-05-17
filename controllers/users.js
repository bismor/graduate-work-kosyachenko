const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const HTTP_STATUS_CODE = require('../utils/http-status-code');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
require('dotenv').config();

const { JWT_SECRET } = process.env;

module.exports.getUsers = async (req, res, next) => {
  try {
    const data = await User.find({});
    res.status(HTTP_STATUS_CODE.OK)
      .send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { name } = req.body;

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const userData = await User.create({
      name,
      email: req.body.email,
      password: passwordHash, // записываем хеш в базу
    });
    const safeData = userData.toObject({ useProjection: true });

    res.status(HTTP_STATUS_CODE.OK).send({ safeData });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('некорректное поле name'));
    } else next(error);
  }
};

module.exports.changeUsers = async (req, res, next) => {
  try {
    const { name } = req.body;

    const data = await User.findByIdAndUpdate(
      req.User._id,
      { name },
      { new: true, runValidators: true },
    );

    if (data === null) {
      throw new NotFoundError('Передан "userId" несуществующего пользователя');
    }
    res.status(HTTP_STATUS_CODE.OK)
      .send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email }).select('+password');

    if (userData === null) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    const isPasswordMatch = await bcrypt.compare(password, userData.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    const token = jwt.sign({ _id: userData._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(HTTP_STATUS_CODE.OK).send({ token });
  } catch (error) {
    next(error);
  }
};
