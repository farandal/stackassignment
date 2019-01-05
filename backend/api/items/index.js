/**
 * Stack Assignment Backend - M800
 * Items Router
 * This file contains the mapping between the routes in the api
 * and the logic in the controller
 * Author: Francisco Aranda <farandal@gmail.com>
 */

/*
 resources:
 -https://www.oodlestechnologies.com/blogs/Integrate-Swagger-in-your-NodeJS-Application
 */

import { Router } from 'express';
import { insert, index, show, update, destroy, calendar } from './controller';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { master, token, googleauth } from '../../services/passport';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
const router = new Router();

/**
 * @swagger
 * /items:
 *   post:
 *     description: Returns Calendar Events
 *     tags:
 *      - Items
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: event JSON object
 */

router.post('/', token({ required: true }), query(), index);

/**
 * @swagger
 * /items/insert:
 *   post:
 *     description: Create a calendar event
 *     tags:
 *      - Items
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: event JSON object
 */
router.post('/insert', jsonParser, token({ required: true }), insert);

/**
 * @swagger
 * /items/calendar:
 *   post:
 *     description: Returns the user calendar
 *     tags:
 *      - Items
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: calendar JSON object
 */
router.post('/calendar', token({ required: true }), calendar);

/**
 * @swagger
 * /items/calendar:
 *   post:
 *     description: Get a single calendar event
 *     tags:
 *      - Items
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: calendar JSON object
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of the event to be retrieved
 *        required: true
 */
router.post('/:id', token({ required: true }), show);
router.put('/:id', jsonParser, token({ required: true }), update);

/**
 * @swagger
 * /items/update:
 *   post:
 *     description: Updates the calendar event
 *     tags:
 *      - Items
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: calendar JSON object
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of the event to be updated
 *        required: true
 */
router.post('/update/:id', jsonParser, token({ required: true }), update);

/**
 * @swagger
 * /items/delete:
 *   post:
 *     description: Deletes an event from calendar
 *     tags:
 *      - Items
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: calendar JSON object
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of the event to be deleted
 *        required: true
 */
router.delete('/:id', token({ required: true }), destroy);
router.post('/delete/:id', token({ required: true }), destroy);

export default router;
