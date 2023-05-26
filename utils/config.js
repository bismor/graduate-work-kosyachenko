require('dotenv').config();

module.exports = {
  PORT: 3000,
  MONGO_BD_URL: (process.env.NODE_ENV === 'production') ? process.env.MONGO_BD_URL : 'mongodb://127.0.0.1:27017/filmsbd',
  JWT_SECRET: (process.env.NODE_ENV === 'production') ? process.env.JWT_SECRET : 'JWT_SECRET',
};
