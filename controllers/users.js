const User = require('../models/users');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const ConflictError = require('../errors/conflictError');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.patchUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { runValidators: true, new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.codeName === 'DuplicateKey') {
        next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные'));
        return;
      }
      next(err);
    });
};
