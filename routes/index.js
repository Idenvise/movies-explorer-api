const router = require('express').Router();
const moviesRouter = require('./movies');
const usersRouter = require('./users');

router.use('/', moviesRouter);
router.use('/', usersRouter);

module.exports = router;
