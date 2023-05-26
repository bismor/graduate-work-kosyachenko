require('dotenv').config();

module.exports = {
  PORT: 3000,
  MONGO_BD_URL: (process.env.NODE_ENV !== 'production') ? 'mongodb://127.0.0.1:27017/filmsbd' : process.env.MONGO_BD_URL,
  JWT_SECRET: (process.env.NODE_ENV !== 'production') ? 'JWT_SECRET' : process.env.JWT_SECRET,
};
