/**
 * @namespace AuthController
 * @summary Authentication controller
 * @author Francisco Aranda <farandal@gmail.com>
 */

import { sign, verifyToken } from '../../services/jwt';
import { success } from '../../services/response/';
import passport from 'passport';
import { webapp, google as gconfig } from '../../config';
import { google } from 'googleapis';
import request from 'request';
import fs from 'fs';
import readline from 'readline';

const TOKEN_PATH = '../../credentials.json';

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
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar']
  })(req, res, next);
};

export const googleAuth = () => (req, res, next) => {
  console.log(req);
  console.log(res);
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login'
  })(req, res, next);
};
export const googleCallback = (req, res, next) => {
  const user = req.user;
  const authCode = req.query.code;
  const userId = user.id;
  console.log(user);

  sign(user.googleId)
    .then(token => {
      console.log('-----------');
      console.log('USER TOKEN', token);
      console.log('-----------');
      redirect(res, `${webapp}?token=${token}`);
    })
    .catch(next);
};
