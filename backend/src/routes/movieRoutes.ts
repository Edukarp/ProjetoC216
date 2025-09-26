import { Router } from 'express';
import {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  getMoviesByType,
  getMoviesByGenre,
  getBestRatedMovies
} from '../controllers/movieController';

const router = Router();

router.post('/', createMovie);
router.get('/', getAllMovies);
router.get('/best-rated', getBestRatedMovies);
router.get('/type/:type', getMoviesByType);
router.get('/genre/:genre', getMoviesByGenre);
router.get('/:id', getMovieById);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;