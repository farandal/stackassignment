import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { master, token } from '../../services/passport';
import { index, showMe, show, create, update, destroy } from './controller';
import User, { schema } from './model';

const router = new Router();
const { email, googleId, accessToken } = schema.tree;

router.get('/', token({ required: true, roles: ['admin'] }), query(), index);
router.post('/me', token({ required: true }), showMe);
router.post('/:id', token({ required: true }), show);
router.post('/', master(), body({ email, googleId, accessToken }), create);
router.delete('/:id', token({ required: true, roles: ['admin'] }), destroy);
//To update the access token if needs to be refreshed, not implemented
router.put('/:id', token({ required: true }), body({ accessToken }), update);

export default router;
