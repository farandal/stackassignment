import { Router } from 'express';
import {
  login,
  redirectToFrontend,
  googleRequestAuth,
  googleAuth,
  googleCallback
} from './controller';
import { master, token } from '../../services/passport';

const router = new Router();
router.post('/', master(), login);
router.get('/google', googleRequestAuth());
router.get('/google-success', googleAuth(), googleCallback);

export default router;
