const mongoose = require('mongoose');

const httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return httpRegex.test(v);
        },
        message: (props) => `${props.value} неверная ссылка.`,
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return httpRegex.test(v);
        },
        message: (props) => `${props.value} неверная ссылка.`,
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return httpRegex.test(v);
        },
        message: (props) => `${props.value} неверная ссылка.`,
      },
    },
    owner: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'user',
    },
    movieId: {
      required: true,
      // id фильма, который содержится в ответе сервиса MoviesExplorer.
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },

);

module.exports = mongoose.model('Movie', movieSchema);
