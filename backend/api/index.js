import { Router } from 'express';
import user from './user';
import auth from './auth';
import items from './items';
import docs from './docs';

const router = new Router();

router.use('/users', user);
router.use('/auth', auth);
router.use('/items', items);
router.use('/docs', docs);

export default router;
