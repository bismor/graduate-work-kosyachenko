const router = require('express').Router();
const { getMovies, createMovie, deleteMoviesById } = require('../controllers/movies');
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/requestValidation');

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:_id', validateDeleteMovie, deleteMoviesById);

module.exports = router;
