const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMoviesById } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/_id', deleteMoviesById);

module.exports = router;
