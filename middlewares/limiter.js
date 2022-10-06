const rateLimiter = require('express-rate-limit');

module.exports = rateLimiter({
  windowMs: 1000,
  max: 1,
});
