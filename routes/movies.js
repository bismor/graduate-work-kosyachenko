const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovies, deleteMoviesById } = require('../controllers/movies');
const auth = require('../middlewares/auth');

router.get('/', auth, getMovies);
router.post('/', auth, createMovies);
router.delete('/_id', auth, deleteMoviesById);
