const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const Movie = require('../models/movies');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    owner: req.user._id,
    movieId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Ошибка валидации'));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError('Фильм с данным id не найден');
    })
    .then((movie) => {
      if (req.user._id !== movie.owner._id.toString()) {
        throw new ForbiddenError('Фильм принадлежит другому пользователю');
      }
      console.log(req.user._id);
      console.log(movie.owner._id.toString());
      return movie.remove().then(() => res.send({ message: 'Фильм удалён' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Некорректный идентификатор'));
        return;
      }
      next(err);
    });
};
