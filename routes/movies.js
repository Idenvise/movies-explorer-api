const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const linkValidation = require('../middlewares/linkValidation');

const { postMovie, getMovies, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helper) => {
      if (linkValidation(value)) {
        return value;
      }
      return helper.message('Ссылка не валидна');
    }),
    trailerLink: Joi.string().required().custom((value, helper) => {
      if (linkValidation(value)) {
        return value;
      }
      return helper.message('Ссылка не валидна');
    }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (linkValidation(value)) {
        return value;
      }
      return helper.message('Ссылка не валидна');
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
}), postMovie);
router.delete('/movies/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().required().length(24),
  }),
}), deleteMovie);

module.exports = router;
