import { userConstants } from '../constants';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'GOOGLE_LOGIN':
      console.log('GOOGLE_LOGIN', action.data);
      return state.concat([action.data]);
    case 'USER_LOGOUT':
      console.log('USER_LOGOUT', action.data);
      return state.concat([action.data]);
    default:
      return state;
  }
};
export default userReducer;
