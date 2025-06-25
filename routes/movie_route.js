import express from 'express'
import { getPopularMovies, searchMovies, getMoviesByCategory, getMovieById, getMovieVideos, getSimilarMovies  } from '../controllers/movieController.js';
const router = express.Router();


// Most specific routes first
router.get('/popular', getPopularMovies);
router.get('/search', searchMovies);
router.get('/category/:type', getMoviesByCategory);

// Least specific route last
router.get('/:id', getMovieById);
router.get('/:id/videos', getMovieVideos);
router.get('/:id/similar', getSimilarMovies);




export default router;
