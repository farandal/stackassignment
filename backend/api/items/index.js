/**
 * Stack Assignment Backend - M800
 * Items Router
 * This file contains the mapping between the routes in the api
 * and the logic in the controller
 * Author: Francisco Aranda <farandal@gmail.com>
 */

import { Router } from 'express';
import { create, index, show, update, destroy, googleAuth } from './controller';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { master, token, googleauth } from '../../services/passport';

const router = new Router();

router.post('/create', token({ required: true }), create);

router.post('/', token({ required: true }), query(), index);

router.post('/:id', token({ required: true }), show);

router.put('/:id', token({ required: true }), update);

router.delete('/:id', token({ required: true }), destroy);

export default router;
