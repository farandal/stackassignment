import { userService } from '../services';
import { history } from '../helpers';

export const userActions = {
  getUser,
  logout
};

function logout() {
  userService.logout();
  return { type: 'LOGOUT_SUCCESS' };
}

function getUser(user) {
  return dispatch => {
    dispatch(request());
    userService.getUser().then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request(user) {
    return { type: 'GET_USER_REQUEST', user };
  }
  function success(user) {
    return { type: 'GET_USER_SUCCESS', user };
  }
  function failure(error) {
    return { type: 'GET_USER_FAILURE', error };
  }
}
