const Movie = require('../models/movie');
const HTTP_STATUS_CODE = require('../utils/http-status-code');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const ConflictError = require('../errors/conflict-err');

module.exports.getMovies = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const data = await Movie.find({ owner });
    res.status(HTTP_STATUS_CODE.OK).send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.createMovie = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;

    const createMovie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: userId,
    });

    const data = await Movie
      .find({ _id: createMovie._id });

    res.status(HTTP_STATUS_CODE.OK).send({ data });
  } catch (error) {
    if (error.code === 11000) {
      next(new ConflictError('Такой фильм уже существует'));
    } else next(error);
  }
};

module.exports.deleteMoviesById = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const movieData = await Movie.findById(req.params.ObjectId);

    if (!movieData) {
      throw new NotFoundError('Нет фильма по заданному ID');
    }

    if (userId !== movieData.owner._id.toString()) {
      throw new ForbiddenError('Нельзя удалять чужой фильм');
    }

    const cardDelete = await Movie.findByIdAndRemove({ _id: movieData._id.toString() });

    res.status(HTTP_STATUS_CODE.OK).send({ cardDelete });
  } catch (error) {
    next(error);
  }
};
