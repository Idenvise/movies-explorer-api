const options = {
  origin: [
    'https://frontend.mesto.nomorepartiesxyz.ru',
    'https://Idenvise.github.io',
    'http://frontend.mesto.nomorepartiesxyz.ru/',
    'https://web.postman.co/',
    'https://movies.nomoredomains.icu/',
    'https://localhost:3000',
    'http://movies.nomoredomains.icu/',
    'https://movies.nomoredomains.icu',
    'http://movies.nomoredomains.icu',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = {
  options,
};
