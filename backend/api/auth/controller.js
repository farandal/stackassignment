/**
 * @namespace AuthController
 * @summary Authentication controller
 * @author Francisco Aranda <farandal@gmail.com>
 */

import { sign, verifyToken } from '../../services/jwt';
import { success } from '../../services/response/';
import { findOrCreate } from '../../services/user';
import passport from 'passport';
import { webapp, google as gconfig } from '../../config';
import { google } from 'googleapis';

export const redirect = (res, url) => {
  res.redirect(url);
  return null;
};

export const login = (req, res, next) => {
  const user = req.user;
  sign(user.googleId)
    .then(token => ({ token, user: user.view(true) }))
    .then(success(res, 201))
    .catch(next);
};

export const googleRequestAuth = () => (req, res, next) => {
  passport.authenticate('google', {
    session: false,
    accessType: 'offline',
    approvalPrompt: 'force',
    failureRedirect: `${webapp}?error=failed_authentication`,
    scope: gconfig.scopes
  })(req, res, next);
};

export const googleAuth = () => (req, res, next) => {
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${webapp}?error=failed_authentication`
  })(req, res, next);
};

export const googleCallback = (req, res, next) => {
  const user = req.user;
  const authCode = req.query.code;
  const userId = user.id;
  sign(user.googleId)
    .then(token => {
      redirect(res, `${webapp}?token=${token}`);
    })
    .catch(next);
};

export const mobileCallback = ({ body }, res, next) => {
  console.log(body);
  const {
    userID,
    email,
    name,
    givenName,
    familyName,
    photoUrlTiny,
    accessToken,
    refreshToken,
    serverAuthCode
  } = body;

  findOrCreate(userID, email, accessToken, refreshToken)
    .then(user => {
      sign(user.googleId)
        .then(token => {
          console.log({ token: token, user: user });
          res.json({ token: token, user: user });
        })
        .catch(next);
    })
    .catch(next);
};
