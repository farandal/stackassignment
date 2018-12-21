const itemReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      console.log('ADD_ITEM', action);
      return state.concat([action.data]);
    default:
      return state;
  }
};
export default itemReducer;
