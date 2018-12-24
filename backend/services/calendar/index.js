import { google } from 'googleapis';
import { google as gconfig } from '../../config';
import { getAuthClient } from '../oauth2client';
import request from 'request-promise';

const DEFAULT_CALENDAR_NAME = 'Stackassignment';

export const getUserCalendar = (user, calendarName) => {
  const authclient = getAuthClient(user);
  const calendar = google.calendar({
    version: 'v3',
    auth: authclient
  });

  return new Promise(function(resolve, reject) {
    calendar.calendarList.list({}, (err, result) => {
      if (err) {
        reject({
          code: 409,
          message: 'There was an error contacting the Calendar service',
          error: err
        });
        /*res.status(409).json({
          message: 'There was an error contacting the Calendar service'
        });*/
        return;
      }

      let items = result.data.items;
      let stackcalendar = items.find(
        item => item.summary === DEFAULT_CALENDAR_NAME
      );

      if (stackcalendar) {
        //res.json(stackcalendar);

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
              reject({
                code: 409,
                message: 'There was an error contacting the Calendar service',
                error: err
              });
            }
            user.set({ calendarId: newCal.data.id });
            user.save();
            //res.json(newCal.data);
            resolve(newCal.data);
          }
        );
      }
    });
  });
};
