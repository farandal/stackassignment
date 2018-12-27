import { Router } from 'express';
import {
  login,
  redirectToFrontend,
  googleRequestAuth,
  googleAuth,
  googleCallback,
  mobileCallback
} from './controller';
import { master, token } from '../../services/passport';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
const router = new Router();
router.post('/', master(), login);
router.get('/google', googleRequestAuth());
router.get('/google-success', googleAuth(), googleCallback);
router.get('/mobile-callback', jsonParser, mobileCallback);

export default router;
