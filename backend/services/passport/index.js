import passport from 'passport'
import { Schema } from 'bodymen'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { jwtSecret, masterKey, google } from '../../config'
import User, { schema } from '../../api/user/model'


/* GOOGLE AUTHENTICATION */
passport.use(
    new GoogleStrategy({
        // options for strategy
        callbackURL: '/google-auth-success',
        clientID: google.clientID,
        clientSecret: google.clientSecret
    }, async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;

        // check if user already exists
        const currentUser = await User.findOne({googleId: profile.id});
        if (currentUser) {
            // already have the user -> return (login)
            return done(null, currentUser);
        } else {
            // register user and return
            const newUser = await new User({email: email, googleId: profile.id}).save();
            return done(null, newUser);
        }
    }
))

export const googleAuth = () => (req, res, next) =>
  passport.authenticate('google', {
      session: false,
      scope: ['profile', 'email'] //TODO: add calendar in the scope
  })(req, res, next)


// callback url upon successful google authentication
export const googleSuccess = () => {
  passport.authenticate('google', {session: false}), (req, res) => {
    authService.signToken(req, res);
  }
}

// route to check token with postman.
// using middleware to check for authorization header

/*
app.get('/verify', authService.checkTokenMW, (req, res) => {
    authService.verifyToken(req, res);
    if (null === req.authData) {
        res.sendStatus(403);
    } else {
        res.json(req.authData);
    }
});
*/
export const googleVerify = () => {
    
    authService.verifyToken(req, res);
    
    if (null === req.authData) {
        res.sendStatus(403);
    } else {
        res.json(req.authData);
    }

}


export const password = () => (req, res, next) =>
  passport.authenticate('password', { session: false }, (err, user, info) => {
    if (err && err.param) {
      return res.status(400).json(err)
    } else if (err || !user) {
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)


passport.use('password', new BasicStrategy((email, password, done) => {
  const userSchema = new Schema({ email: schema.tree.email, password: schema.tree.password })

  userSchema.validate({ email, password }, (err) => {
    if (err) done(err)
  })

  User.findOne({ email }).then((user) => {
    if (!user) {
      done(true)
      return null
    }
    return user.authenticate(password, user.password).then((user) => {
      done(null, user)
      return null
    }).catch(done)
  })
}))


passport.use('master', new BearerStrategy((token, done) => {
  if (token === masterKey) {
    done(null, {})
  } else {
    done(null, false)
  }
}))


export const master = () =>
  passport.authenticate('master', { session: false })

export const token = ({ required, roles = User.roles } = {}) => (req, res, next) =>
  passport.authenticate('token', { session: false }, (err, user, info) => {
    if (err || (required && !user) || (required && !~roles.indexOf(user.role))) {
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)

passport.use('master', new BearerStrategy((token, done) => {
  if (token === masterKey) {
    done(null, {})
  } else {
    done(null, false)
  }
}))

passport.use('token', new JwtStrategy({
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer')
  ])
}, ({ id }, done) => {
  User.findById(id).then((user) => {
    done(null, user)
    return null
  }).catch(done)
}))
