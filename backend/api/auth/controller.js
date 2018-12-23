import { sign, verifyToken } from '../../services/jwt'
import { success } from '../../services/response/'
import passport from 'passport'

export const login = ({ user }, res, next) =>
  sign(user.id)
    .then((token) => ({ token, user: user.view(true) }))
    .then(success(res, 201))
    .catch(next)

export const googleAuth = () => (req, res, next) => {
  passport.authenticate('google', {
      session: false,
      scope: ['profile', 'email'] //TODO: add calendar in the scope
  })(req, res, next)
}

// callback url upon successful google authentication
export const googleSuccess = ()  => (req, res, next) => {
  passport.authenticate('google', {
  	session: false
  })(req, res, next)
}
 
// route to check token with postman.
// using middleware to check for authorization header

export const googleVerify = () => {
    
    verifyToken(req, res);
    
    if (null === req.authData) {
        res.sendStatus(403);
    } else {
        res.json(req.authData);
    }

}