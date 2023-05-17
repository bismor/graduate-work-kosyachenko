const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovies, deleteMoviesById } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovies);
router.delete('/_id', deleteMoviesById);
