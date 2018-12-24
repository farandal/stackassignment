import passport from 'passport';
import { Schema } from 'bodymen';
import { BasicStrategy } from 'passport-http';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as CustomBearerStrategy } from 'passport-http-custom-bearer';
import { jwtSecret, masterKey, google as gconfig } from '../../config';
import User, { schema } from '../../api/user/model';
import { getUserCalendar } from '../../services/calendar';

/*
Resources:
Interesting article about working with refresh tokens
-https://symfonycasts.com/screencast/oauth/refresh-token
*/

/* GOOGLE AUTHENTICATION */
passport.use(
  'google',
  new GoogleStrategy(
    {
      callbackURL: gconfig.callback,
      clientID: gconfig.clientID,
      clientSecret: gconfig.clientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;

      // check if user already exists
      const currentUser = await User.findOne({ googleId: profile.id });

      if (currentUser) {
        currentUser.accessToken = accessToken;
        if (refreshToken) {
          currentUser.refreshToken = refreshToken;
        }
        currentUser.save();

        return done(null, currentUser);
      } else {
        //create new user
        const usrObj = {
          email: email,
          googleId: profile.id,
          accessToken: accessToken
        };
        if (refreshToken) {
          usrObj.refreshToken = refreshToken;
        }

        const newUser = await new User(usrObj).save();

        //Creating or updating calendar first time
        getUserCalendar(newUser).then(calendar => console.log(calendar));

        return done(null, newUser);
      }
    }
  )
);

passport.use(
  'master',
  new BearerStrategy((token, done) => {
    if (token === masterKey) {
      done(null, {});
    } else {
      done(null, false);
    }
  })
);

export const master = () => passport.authenticate('master', { session: false });

export const googleauth = () =>
  passport.authenticate('google', { session: false });

export const token = ({ required, roles = User.roles } = {}) => (
  req,
  res,
  next
) => {
  passport.authenticate('token', { session: false }, (err, user, info) => {
    console.log('TOKEN AUTH');
    console.log(user);

    if (
      err ||
      (required && !user) ||
      (required && !~roles.indexOf(user.role))
    ) {
      return res.status(401).end();
    }
    req.logIn(user, { session: false }, err => {
      if (err) return res.status(401).end();
      next();
    });
  })(req, res, next);
};

passport.use(
  'master',
  new BearerStrategy((token, done) => {
    if (token === masterKey) {
      done(null, {});
    } else {
      done(null, false);
    }
  })
);

passport.use(
  'token',
  new JwtStrategy(
    {
      secretOrKey: jwtSecret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromBodyField('token'), //For development
        ExtractJwt.fromAuthHeaderWithScheme('Bearer')
      ])
    },
    ({ id }, done) => {
      console.log('TOKEN FROM JWT DECRYPTED', id);
      User.findOne({ googleId: id })
        .then(user => {
          console.log('USER FOUND BY ID:', user);
          console.log('Setting the refresh token to the auth client');

          /*authclient.setCredentials({
            refresh_token: 'REFRESH_TOKEN_YALL'
          });*/

          done(null, user);
          return null;
        })
        .catch(done);
    }
  )
);
