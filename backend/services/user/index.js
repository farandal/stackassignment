/**
 * @namespace UserService
 * @summary User helper functions
 * @author Francisco Aranda <farandal@gmail.com>
 */

import User, { schema } from '../../api/user/model';

/**
 * @function findOrCreate
 * @memberof UserService
 * @summary Find or create a user by its googleID
 * @param {Object} user user from the database as a Mongoose User Schema object
 * @param {String} calendarName string specifying the calendar name
 * @return {Object} Calnedar JSON object
 */
export const findOrCreate = (googleId, email, accessToken, refreshToken) => {
  return new Promise(async (resolve, reject) => {
    if (!email || !googleId || !accessToken) {
      console.log('Parameters missing, either, googleId, email, accessToken ');
      reject({
        code: 409,
        message: 'Parameters missing, either, googleId, email, accessToken '
      });
    }

    try {
      console.log('googleId', googleId);
      // check if user already exists
      const currentUser = await User.findOne({ googleId: googleId });
      console.log('CurrentUser by googleId', googleId);
      console.log(currentUser);

      if (currentUser) {
        currentUser.accessToken = accessToken;
        if (refreshToken) {
          currentUser.refreshToken = refreshToken;
        }
        currentUser.save();
        resolve(currentUser);
      } else {
        //create new user
        const usrObj = {
          email: email,
          googleId: googleId,
          accessToken: accessToken
        };
        if (refreshToken) {
          usrObj.refreshToken = refreshToken;
        }

        new User(usrObj).save().then(newUser => {
          getUserCalendar(newUser).then(calendar => console.log(calendar));
          resolve(newUser);
        });
      }
    } catch (error) {
      console.log(error);
      reject({
        code: 409,
        message: 'There was an error creating or updating the user',
        error: error
      });
    }
  });
};
