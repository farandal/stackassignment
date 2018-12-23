/**
 * Stack Assignment Backend - M800
 * Items Controller
 * This file contains the logic for the Items API Endpoints
 * Author: Francisco Aranda <farandal@gmail.com>
 */

/* resources: 
-https://developers.google.com/calendar/quickstart/nodejs
-https://www.diycode.cc/projects/google/google-api-nodejs-client
-https://github.com/wanasit/google-calendar/blob/master/example/list-example.js#L17
 */

//https://github.com/gsuitedevs/node-samples/issues/6

/* 
TODO: 
-Standarize json response, to be encapsulated in the response service
-Standarize response http codes, as constants in the response service
-Investigate if there is a way to refactor the code in order to do not repeat the authclient initialization,
-But it's necessary to be initialize in every request, as it depends on the user access token
*/
import { google } from 'googleapis';
import { google as gconfig } from '../../config';
import { success, notFound, error } from '../../services/response/';
import { sign, verifyToken } from '../../services/jwt';
import passport from 'passport';

const authclient = new google.auth.OAuth2(
  gconfig.clientID,
  gconfig.clientSecret,
  gconfig.callback
);

const DEFAULT_CALENDAR_NAME = 'Stackassignment';

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
  const object = {
    calendarId: user.calendarId,
    timeMin: new Date().toISOString(),
    maxResults: 16,
    singleEvents: true,
    orderBy: 'startTime'
  };
  console.log('LIST EVENTS', object);
  calendar.events.list(object, (err, result) => {
    if (err) {
      //TODO: use the default response message format to send errors
      console.log(err);
      res.status(409).json({
        message: 'There was an error contacting the Calendar service'
      });

      return;
    }

    const events = result.data.items;

    /*events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });*/

    res.json(events);
  });
};

export const calendar = ({ body, user }, res, next) => {
  authclient.setCredentials({
    access_token: user.accessToken,
    refresh_token: user.accessToken,
    expiry_date: true
  });

  const calendar = google.calendar({ version: 'v3', auth: authclient });

  calendar.calendarList.list({}, (err, result) => {
    if (err) {
      res.status(409).json({
        message: 'There was an error contacting the Calendar service'
      });

      return;
    }

    let items = result.data.items;
    let stackcalendar = items.find(
      item => item.summary === DEFAULT_CALENDAR_NAME
    );
    if (stackcalendar) {
      res.json(stackcalendar);

      user.set({ calendarId: stackcalendar.id });
      user.save();
    } else {
      calendar.calendars.insert(
        {
          resource: {
            summary: DEFAULT_CALENDAR_NAME,
            title: DEFAULT_CALENDAR_NAME
          },
          auth: authclient
        },
        function(err, newCal) {
          user.set({ calendarId: newCal });
          user.save();

          res.json(newCal.data);
        }
      );
    }
  });
};

export const insert = ({ body, user }, res, next) => {
  authclient.setCredentials({
    access_token: user.accessToken,
    refresh_token: user.accessToken,
    expiry_date: true
  });

  const calendar = google.calendar({ version: 'v3', auth: authclient });

  const object = {
    auth: authclient,
    calendarId: user.calendarId,
    resource: JSON.parse(body)
  };
  console.log('INSERTING EVENT', object);
  calendar.events.insert(object, function(err, createdEvent) {
    if (err) {
      res.status(409).json({
        message: 'There was an error contacting the Calendar service',
        error: err.message
      });

      return;
    }

    res.json(createdEvent.data);
  });
};

export const show = ({ params }, res, next) => res.status(200).json({});

export const update = ({ body, params, user }, res, next) => {
  authclient.setCredentials({
    access_token: user.accessToken,
    refresh_token: user.accessToken,
    expiry_date: true
  });

  const calendar = google.calendar({ version: 'v3', auth: authclient });

  const event = JSON.parse(body.event);

  const object = {
    auth: authclient,
    calendarId: user.calendarId || body.calendarId,
    eventId: params.id || body.eventId,
    resource: event
  };
  console.log('UPDATING EVENT', object);
  calendar.events.update(object, function(err, updatedEvent) {
    if (err) {
      res.status(409).json({
        message: 'There was an error contacting the Calendar service',
        error: err.message
      });

      return;
    }

    res.json(updatedEvent.data);
  });
};

export const destroy = ({ body, params, user }, res, next) => {
  authclient.setCredentials({
    access_token: user.accessToken,
    refresh_token: user.accessToken,
    expiry_date: true
  });

  const calendar = google.calendar({ version: 'v3', auth: authclient });

  const object = {
    auth: authclient,
    calendarId: user.calendarId || body.calendarId,
    eventId: params.id || body.eventId
  };

  console.log('DELETING EVENT', object);

  calendar.events.delete(object, function(err, response) {
    if (err) {
      res.status(409).json({
        message: 'There was an error contacting the Calendar service',
        error: err.message
      });

      return;
    }

    res.status(200).json({
      message: 'Resource has been deleted'
    });
  });
};
