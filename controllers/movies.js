const Movie = require('../models/movie');
const HTTP_STATUS_CODE = require('../utils/http-status-code');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getMovies = async (req, res, next) => {
  try {
    const data = await Movie.find({});
    res.status(HTTP_STATUS_CODE.OK).send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.createMovies = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const userId = req.user._id;

    const createMovie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
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
    next(error);
  }
};

module.exports.deleteMoviesById = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const movieData = await Movie.findById(req.params.movieId);

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
