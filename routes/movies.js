const router = require('express').Router();
const { postMovie, getMovies, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', postMovie);
router.delete('/movies/:_id', deleteMovie);

module.export = router;
