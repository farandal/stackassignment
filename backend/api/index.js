import { Router } from 'express';
//API controllers
import user from './user';
import auth from './auth';
import items from './items';
//documentation endpoints
import docs from './docs';
import apidocs from './apidocs';

const router = new Router();
//API routes
router.use('/users', user);
router.use('/auth', auth);
router.use('/items', items);
//Documentation endpoints
router.use('/docs', docs);
router.use('/apidocs', apidocs);

export default router;
