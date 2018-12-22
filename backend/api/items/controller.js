/**
 * Stack Assignment Backend - M800
 * Items Controller
 * This file contains the logic for the Items API Endpoints
 * Author: Francisco Aranda <farandal@gmail.com>
 */

/* resources: 
 https://www.diycode.cc/projects/google/google-api-nodejs-client
 https://github.com/wanasit/google-calendar/blob/master/example/list-example.js#L17
 */

//https://github.com/gsuitedevs/node-samples/issues/6
import { google } from 'googleapis';
import { google as gconfig } from '../../config';
import { sign, verifyToken } from '../../services/jwt';
import passport from 'passport';

const authclient = new google.auth.OAuth2(
  gconfig.clientID,
  gconfig.clientSecret,
  gconfig.callback
);

export const index = (
  { user, querymen: { query, select, cursor } },
  res,
  next
) => {
  authclient.setCredentials({
    access_token: user.accessToken,
    refresh_token: user.accessToken,
    expiry_date: true
  });

  const calendar = google.calendar({ version: 'v3', auth: authclient });

  calendar.calendarList.list({}, (err, result) => {
    res.json(result.data.items);
  });
};

export const create = ({ body }, res, next) => res.status(201).json(body);

export const show = ({ params }, res, next) => res.status(200).json({});

export const update = ({ body, params }, res, next) =>
  res.status(200).json(body);

export const destroy = ({ params }, res, next) => res.status(204).end();
