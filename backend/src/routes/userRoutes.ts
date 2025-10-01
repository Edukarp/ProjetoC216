import { Router } from 'express';
import { registerUser, loginUser, getMe, addFavorite, removeFavorite } from '../controllers/userController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', getMe);
router.post('/favorites', addFavorite);
router.delete('/favorites', removeFavorite);

export default router;