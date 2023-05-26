require('dotenv').config();

module.exports = {
  PORT: 3000,
  MONGO_BD_URL: (process.env.NODE_ENV !== 'production') ? 'mongodb://localhost:27017/movies-explorerdb' : process.env.MONGO_BD_URL,
  JWT_SECRET: (process.env.NODE_ENV !== 'production') ? 'JWT_SECRET' : process.env.JWT_SECRET,
};
