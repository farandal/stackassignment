import { Router } from 'express';
import {
  login,
  redirectToFrontend,
  googleAuth,
  googleCallback
} from './controller';
import { master, token } from '../../services/passport';

const router = new Router();
router.post('/', master(), login);
router.get('/google', googleAuth());
router.get('/google-success', googleCallback(), redirectToFrontend);

export default router;
