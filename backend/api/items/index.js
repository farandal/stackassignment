/**
 * Stack Assignment Backend - M800
 * Items Router
 * This file contains the mapping between the routes in the api
 * and the logic in the controller
 * Author: Francisco Aranda <farandal@gmail.com>
 */

import { Router } from 'express';
import { insert, index, show, update, destroy, calendar } from './controller';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { master, token, googleauth } from '../../services/passport';
import bodyParser from 'body-parser';

const router = new Router();
const jsonParser = bodyParser.json();

router.post('/insert', jsonParser, token({ required: true }), insert);

router.post('/calendar', token({ required: true }), calendar);

router.post('/', token({ required: true }), query(), index);

router.post('/:id', token({ required: true }), show);

router.put('/:id', token({ required: true }), update);

router.delete('/:id', token({ required: true }), destroy);
router.post('/delete/:id', token({ required: true }), destroy);

export default router;
