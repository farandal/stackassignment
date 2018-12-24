import { google } from 'googleapis';
import { google as gconfig } from '../../config';

const authclient = new google.auth.OAuth2(
  gconfig.clientID,
  gconfig.clientSecret,
  gconfig.callback
);

authclient.on('tokens', tokens => {
  if (tokens.refresh_token) {
    console.log('store the refresh_token in my database', tokens.refresh_token);
    authclient.user.refreshToken = tokens.refresh_token;
    authclient.user.save();
  }
  console.log('access_token', tokens.access_token);
});

export const getAuthClient = user => {
  authclient.user = user;
  authclient.setCredentials({
    access_token: user.accessToken,
    refresh_token: user.refreshToken,
    expiry_date: true
  });

  return authclient;
};
