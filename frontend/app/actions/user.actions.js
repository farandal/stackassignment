import { userConstants } from '../constants';
import { userService } from '../services';
import { history } from '../helpers';
import { logActions } from './';

export const userActions = {
  register
};

function register(user) {
  return dispatch => {
    dispatch(request(user));
    userService.register(user).then(
      user => {
        dispatch(success());
        history.push('/dashboard');
        console.log('registration success');
        dispatch(logActions.success('Registration successful'));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(logActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}
