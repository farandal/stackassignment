import { sign, verifyToken } from '../../services/jwt';
import { success } from '../../services/response/';
import passport from 'passport';
import { webapp, google as gconfig } from '../../config';
import { google } from 'googleapis';
import request from 'request';
import fs from 'fs';
import readline from 'readline';

const authclient = new google.auth.OAuth2(
  gconfig.clientID,
  gconfig.clientSecret,
  gconfig.callback
);

const TOKEN_PATH = '../../credentials.json';

export const redirect = (res, url) => {
  res.redirect(url);
  return null;
};

export const login = (req, res, next) => {
  const user = req.user;
  sign(user.id)
    .then(token => ({ token, user: user.view(true) }))
    .then(success(res, 201))
    .catch(next);
};

export const googleAuth = () => (req, res, next) => {
  passport.authenticate('google', {
    session: false,
    access_type: 'offline',
    approval_prompt: 'force',
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar']
  })(req, res, next);
};

export const googleCallback = () => (req, res, next) => {
  passport.authenticate('google', {
    session: false,
    access_type: 'offline',
    approval_prompt: 'force',
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar']
  })(req, res, next);
};

export const redirectToFrontend = (req, res, next) => {
  const user = req.user;
  const authCode = req.query.code;
  const userId = user.id;

  sign(user.id)
    .then(token => {
      console.log('-----------');
      console.log('USER TOKEN', token);
      console.log('-----------');
      redirect(res, `${webapp}?token=${token}`);
    })
    .catch(next);
};

/* 
  Stucked several hours trying to get the token from the code after user authorisation callback, invalid grant
  lack on documentation on nodejs api's from google
  Best shot: https://github.com/gsuitedevs/node-samples/blob/e426bd6af84904ea49ebd043787659936264727a/sheets/quickstart/index.js#L20
  */

/* Solution: Seems google is not giving the refresh token, which is necessary to initialize the google oauth client to make request in behalf of the user */
/* The temporary solution was to add the refresh token as the access token */

/* First attempt */
/*google.options({ auth: authclient });
  authclient.getToken(authCode).then(tokenResponse => {
    console.log('Tokens received');
    console.log(tokenResponse);

    authclient.setCredentials(tokenResponse.tokens);
  });*/

/* Seccond attempt */
/*authclient.getToken(req.query.code, function(err, tokens) {
    // set tokens to the client
    // TODO: tokens should be set by OAuth2 client.
    console.log('Tokens received');
    console.log(err);
    console.log(tokens);
    authclient.setCredentials(tokens);
  });*/

/* Third attempt */
/*
  var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  var params = {
    code: authCode,
    client_id: gconfig.clientID,
    client_secret: gconfig.clientSecret,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  request.post(accessTokenUrl, { json: true, form: params }, function(
    err,
    response,
    token
  ) {
    var accessToken = token.access_token;
    var headers = { Authorization: 'Bearer ' + accessToken };
    console.log('accessTokenUrl', token);
  });*/
