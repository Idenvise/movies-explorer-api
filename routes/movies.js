const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { postMovie, getMovies, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    trailerLink: Joi.string().required(),
    thumbnail: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), postMovie);
router.delete('/movies/:_id', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required().length(24),
  }),
}), deleteMovie);

module.exports = router;
