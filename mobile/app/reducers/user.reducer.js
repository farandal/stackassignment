const INITIAL_STATE = {
  user: {},
  loggedIn: false,
  token: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      state = {
        loggedIn: true,
        user: action.response.user,
        token: action.response.token
      };
      return state;
    case 'LOGIN_FAILURE':
      state = {
        loggedIn: false,
        user: INITIAL_STATE.user,
        token: INITIAL_STATE.token
      };
      return state;
    case 'LOGOUT_SUCCESS':
      state = INITIAL_STATE;
      return state;
    default:
      return state;
  }
};
export default userReducer;
