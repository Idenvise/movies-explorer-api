const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ConflictError = require('../errors/conflictError');
const UnauthorizedError = require('../errors/unauthorizedError');
const ValidationError = require('../errors/validationError');
const User = require('../models/users');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(() => {
      throw new UnauthorizedError('Неправильные почта или пароль');
    })
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
            return;
          }
          let genToken = 'Bearer ';
          genToken += jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-giga-mega-secret-key', { expiresIn: '7d' });
          res.send({
            token: genToken,
            user: {
              email: user.email,
              _id: user._id,
              name: user.name,
            },
          });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.postUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((user) => {
          res.send({
            name: user.name,
            email: user.email,
            id: user._id,
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError('Переданы некорректные данные'));
            return;
          }
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже существует'));
            return;
          }
          next(err);
        });
    })
    .catch(next);
};
