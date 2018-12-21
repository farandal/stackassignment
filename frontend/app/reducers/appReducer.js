const appReducer = (state = [], action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      console.log('USER_LOGIN', action.data);
      return state.concat([action.data]);
    case 'USER_LOGOUT':
      console.log('USER_LOGOUT', action.data);
      return state.concat([action.data]);
    default:
      return state;
  }
};
export default appReducer;
