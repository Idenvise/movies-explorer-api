require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors, Joi, celebrate } = require('celebrate');
const { ERROR_SERVER } = require('./errors/errors');
const { moviesRouter, usersRouter } = require('./routes/index');
const { login, postUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/notFoundError');
const { options } = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();
app.use('*', cors(options));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), postUser);

app.use(auth);

app.use('/', moviesRouter);
app.use('/', usersRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = ERROR_SERVER, message } = err;
  res.status(statusCode).send({ message: statusCode === ERROR_SERVER ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
