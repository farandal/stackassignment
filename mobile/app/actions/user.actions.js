import { userService } from '../services';

export const userActions = {
  login,
  logout
};

function login(user) {
  function request(response) {
    return { type: 'LOGIN_REQUEST' };
  }
  function success(response) {
    return { type: 'LOGIN_SUCCESS', response };
  }
  function failure(error) {
    return { type: 'LOGIN_FAILURE', error };
  }
  return dispatch => {
    dispatch(request());
    userService
      .login(user)
      .then(response => {
        console.log('response', response);
        dispatch(success(response));
      })
      .catch(error => {
        console.log('error', error);
        dispatch(failure(error));
      });
  };
}

function logout() {
  function success() {
    return { type: 'LOGOUT_SUCCESS' };
  }
  return dispatch => {
    userService.logout();
    dispatch(success());
  };
}
