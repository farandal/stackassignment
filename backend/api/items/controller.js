/**
 * @namespace ItemsController
 * @summary Items Controller
 * @author Francisco Aranda <farandal@gmail.com>
 */

import { google } from 'googleapis';
import { google as gconfig } from '../../config';
import {
  success,
  notFound,
  error,
  handleServiceError
} from '../../services/response/';
import { sign, verifyToken } from '../../services/jwt';
import {
  getUserCalendar,
  getEventList,
  insertEvent,
  getEvent,
  updateEvent,
  deleteEvent
} from '../../services/calendar';

export const index = (
  { user, querymen: { query, select, cursor } },
  res,
  next
) =>
  getEventList(user, user.calendarId)
    .then(events => res.json(events))
    .catch(error => handleServiceError(res, error));

export const calendar = ({ user }, res, next) =>
  getUserCalendar(user)
    .then(calendar => res.json(calendar))
    .catch(error => handleServiceError(res, error));

export const insert = ({ user, body }, res, next) =>
  insertEvent(user, user.calendarId, body)
    .then(event => res.json(event))
    .catch(error => handleServiceError(res, error));

export const show = ({ user, params }, res, next) =>
  getEvent(user, user.calendarId, params.id)
    .then(event => res.json(event))
    .catch(error => handleServiceError(res, error));

export const update = ({ user, params, body }, res, next) =>
  updateEvent(user, user.calendarId, params.id, body)
    .then(event => res.json(event))
    .catch(error => handleServiceError(res, error));

export const destroy = ({ user, params }, res, next) =>
  deleteEvent(user, user.calendarId, params.id)
    .then(response => res.json(response))
    .catch(error => handleServiceError(res, error));
