import { sign, verifyToken } from '../../services/jwt';
import { success } from '../../services/response/';
import passport from 'passport';

export const redirect = (res, url) => {
  res.redirect(url);
  return null;
};

export const login = (req, res, next) => {
  console.log(req);
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
    scope: ['profile', 'email'] //TODO: add calendar in the scope
  })(req, res, next);
};

export const googleCallback = () => (req, res, next) => {
  passport.authenticate('google', {
    session: false
  })(req, res, next);
};

export const redirectToFrontend = (req, res, next) => {
  console.log(req);
  const user = req.user;
  sign(user.id)
    .then(token => {
      redirect(
        res,
        `http://stackassignment-backend-local.farandal.com:8080/dashboard?token=${token}`
      );
    })
    .catch(next);
};
