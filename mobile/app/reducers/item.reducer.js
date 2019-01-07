import { itemsConstants } from '../constants';
const INITIAL_STATE = {};
const itemReducer = (state = INITIAL_STATE, action) => {
  const data = action.data || action;
  switch (action.type) {
    case itemsConstants.GET_ITEM_SUCCESS:
      console.log('Get Item', data);
      state = data;
      return state;
    case itemsConstants.CLEAR_ITEM:
      console.log('CLEAR ITEM');
      state = INITIAL_STATE;
    default:
      return state;
  }
};
export default itemReducer;
