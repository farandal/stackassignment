import { userConstants } from '../constants';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER_SUCCESS':
      console.log('GET_USER_SUCCESS', action.user);
      state = { loggedIn: true, user: action.user };
      return state;
    case 'GET_USER_FAILURE':
    case 'LOGOUT_SUCCESS':
      console.log('GET_USER_FAILURE OR LOGOUT_SUCCESS', action.user);
      state = { loggedIn: false, user: {} };
      return state;
    default:
      return state;
  }
};
export default userReducer;
