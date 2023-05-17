const mongoose = require('mongoose');

const emailRegex = /^\S+@\S+\.\S+$/;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(v) {
          return emailRegex.test(v);
        },
        message: (props) => `${props.value} неверный email.`,
      },
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    // https://github.com/Automattic/mongoose/issues/9118
    // Это костыль вокруг бага механизма projection при создании
    toObject: { useProjection: true },
    toJSON: { useProjection: true },
  },
);

module.exports = mongoose.model('User', userSchema);
