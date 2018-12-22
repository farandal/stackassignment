import passport from 'passport';
import { Schema } from 'bodymen';
import { BasicStrategy } from 'passport-http';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as CustomBearerStrategy } from 'passport-http-custom-bearer';
import { jwtSecret, masterKey, google } from '../../config';
import User, { schema } from '../../api/user/model';

/* GOOGLE AUTHENTICATION */
passport.use(
  'google',
  new GoogleStrategy(
    {
      // options for strategy
      callbackURL: google.callback,
      clientID: google.clientID,
      clientSecret: google.clientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;

      console.log('email', email);
      console.log('accessToken:', accessToken);
      console.log('profile', profile);

      // check if user already exists
      const currentUser = await User.findOne({ googleId: profile.id });

      if (currentUser) {
        console.log('User already exists in database');
        // already have the user -> return (login)
        return done(null, currentUser);
      } else {
        // register user and return
        console.log('Registering new user');
        const newUser = await new User({
          email: email,
          googleId: profile.id,
          accessToken: accessToken
        }).save();
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

export const token = ({ required, roles = User.roles } = {}) => (
  req,
  res,
  next
) => {
  console.log('--------------------------');
  console.log(req.body);
  passport.authenticate('token', { session: false }, (err, user, info) => {
    console.log('authenticate');
    console.log(err);
    console.log(user);
    console.log(info);

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
        ExtractJwt.fromBodyField('token')
        //ExtractJwt.fromAuthHeaderWithScheme('Bearer') To implement in production
      ])
    },
    ({ id }, done) => {
      console.log('TOKEN FROM JWT DECRYPTED');
      console.log(id);
      User.findById(id)
        .then(user => {
          console.log(user);
          done(null, user);
          return null;
        })
        .catch(done);
    }
  )
);
