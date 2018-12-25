/**
 * @namespace CalendarService
 * @summary Contains the google calendar api calls
 * @author Francisco Aranda <farandal@gmail.com>
 */

/* resources: 
-https://developers.google.com/calendar/quickstart/nodejs
-https://www.diycode.cc/projects/google/google-api-nodejs-client
-https://github.com/wanasit/google-calendar/blob/master/example/list-example.js#L17
-https://github.com/gsuitedevs/node-samples/issues/6
 */

import { google } from 'googleapis';
import { google as gconfig } from '../../config';
import { getAuthClient } from '../oauth2client';
import request from 'request-promise';

const DEFAULT_CALENDAR_NAME = 'Stackassignment';
/**
 * @function getUserCalendar
 * @memberof CalendarService
 * @summary Promise that checks if user calendar exists, if not, creates one
 * @param {Object} user user from the database as a Mongoose User Schema object
 * @param {String} calendarName string specifying the calendar name
 * @return {Object} Calnedar JSON object
 */
export const getUserCalendar = (user, calendarName) => {
  const authclient = getAuthClient(user);
  const calendar = google.calendar({
    version: 'v3',
    auth: authclient
  });

  return new Promise(function(resolve, reject) {
    calendar.calendarList.list({}, (err, result) => {
      if (err) {
        console.log(err);
        reject({
          code: 409,
          message: 'There was an error contacting the Calendar service',
          error: err
        });
        return;
      }

      let items = result.data.items;
      let stackcalendar = items.find(
        item => item.summary === DEFAULT_CALENDAR_NAME
      );

      if (stackcalendar) {
        user.set({ calendarId: stackcalendar.id });
        user.save();
        resolve(stackcalendar);
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
            if (err) {
              console.log(err);
              reject({
                code: 409,
                message: 'There was an error contacting the Calendar service',
                error: err
              });
            }
            user.set({ calendarId: newCal.data.id });
            user.save();
            resolve(newCal.data);
          }
        );
      }
    });
  });
};

/**
 * @function getEventList
 * @memberof CalendarService
 * @summary Promise that returns the event list from a user calendar
 * @param {Object} user user from the database as a Mongoose User Schema object
 * @return {Object} Calnedar list JSON object
 */
export const getEventList = (user, calendarId) => {
  const authclient = getAuthClient(user);
  const calendar = google.calendar({
    version: 'v3',
    auth: authclient
  });
  const object = {
    calendarId: calendarId,
    timeMin: new Date().toISOString(),
    maxResults: 16,
    singleEvents: true,
    orderBy: 'startTime'
  };
  return new Promise((resolve, reject) => {
    calendar.events.list(object, (err, result) => {
      if (err) {
        console.log(err);
        reject({
          code: 409,
          message: 'There was an error contacting the Calendar service',
          error: err
        });
        return;
      }
      resolve(result.data.items);
    });
  });
};

/**
 * @function insertEvent
 * @memberof CalendarService
 * @summary Promise that inserts a calendar event into google user's calendar
 * @param {Object} user user from the database as a Mongoose User Schema object
 * @param {String} calendarId calendarIs
 * @param {Object} resource calendar resource
 * @return {Object} Iserted Calnedar JSON object
 */
export const insertEvent = (user, calendarId, resouce) => {
  const authclient = getAuthClient(user);
  const calendar = google.calendar({ version: 'v3', auth: authclient });
  const object = {
    auth: authclient,
    calendarId: calendarId,
    resource: resouce
  };
  return new Promise((resolve, reject) => {
    calendar.events.insert(object, (err, response) => {
      if (err) {
        console.log(err);
        reject({
          code: 409,
          message: 'There was an error contacting the Calendar service',
          error: err
        });
        return;
      }
      resolve(response.data);
    });
  });
};

/**
 * @function getEvent
 * @memberof CalendarService
 * @summary Promise that returns a single from a google user calendar
 * @param {Object} user user from the database as a Mongoose User Schema object
 * @param {String} eventId eventId
 * @return {Object} calnedar JSON object
 */
export const getEvent = (user, calendarId, eventId) => {
  const authclient = getAuthClient(user);
  const calendar = google.calendar({ version: 'v3', auth: authclient });
  const object = {
    auth: authclient,
    calendarId: calendarId,
    eventId: eventId
  };
  return new Promise((resolve, reject) => {
    calendar.events.get(object, function(err, response) {
      if (err) {
        console.log(err);
        reject({
          code: 409,
          message: 'There was an error contacting the Calendar service',
          error: err
        });
        return;
      }
      resolve(response.data);
    });
  });
};

/**
 * @function updateEvent
 * @memberof CalendarService
 * @summary Promise that updates an event and returns the updated event from a user google alendar
 * @param {Object} user user from the database as a Mongoose User Schema object
 * @param {String} eventId eventId
 * @param {Object} resource Calendar Event object
 * @return {Object} Updated Calnedar Event JSON object
 */
export const updateEvent = (user, calendarId, eventId, resource) => {
  const authclient = getAuthClient(user);
  const calendar = google.calendar({ version: 'v3', auth: authclient });
  const object = {
    auth: authclient,
    calendarId: calendarId,
    eventId: eventId,
    resource: resource
  };
  return new Promise((resolve, reject) => {
    calendar.events.update(object, (err, response) => {
      if (err) {
        console.log(err);
        reject({
          code: 409,
          message: 'There was an error contacting the Calendar service',
          error: err
        });
        return;
      }
      resolve(response.data);
    });
  });
};

/**
 * @function deleteEvent
 * @memberof CalendarService
 * @summary Promise that detletes an event
 * @param {Object} user user from the database as a Mongoose User Schema object
 * @param {String} calendar eventId
 * @param {String} eventId  eventId
 * @return {Object} object with a message containing 'Resource has been deleted'
 */

export const deleteEvent = (user, calendarId, eventId) => {
  const authclient = getAuthClient(user);
  const calendar = google.calendar({ version: 'v3', auth: authclient });
  const object = {
    auth: authclient,
    calendarId: calendarId,
    eventId: eventId
  };
  return new Promise((resolve, reject) => {
    calendar.events.delete(object, (err, response) => {
      if (err) {
        console.log(err);
        reject({
          code: 409,
          message: 'There was an error contacting the Calendar service',
          error: err
        });
        return;
      }
      resolve({
        message: 'Resource has been deleted'
      });
    });
  });
};
