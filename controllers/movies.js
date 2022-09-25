const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const Movie = require('../models/movies');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.params._id })
    .orFail(() => {
      throw new NotFoundError('Нет добавленных фильмов');
    })
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
    owner: req.params._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Ошибка валидации'));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError('Карточка с данным id не найдена');
    })
    .then((movie) => {
      if (req.user._id === !movie.owner._id.toString()) {
        throw new ForbiddenError('Фильм принадлежит другому пользователю');
      }
      movie.remove();
      res.send({ message: 'Фильм удалён' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Некорректный идентификатор'));
        return;
      }
      next(err);
    });
};
