import { itemConstants } from '../constants';

const itemReducer = (state = [], action) => {
  switch (action.type) {
    case 'APPEND_ITEMS':
      state = action.items;
      return state;
    case 'APPEND_ITEM':
      if (state.find(item => item.id === action.item.id)) {
        return state;
      } else {
        return [action.item, ...state];
      }
    default:
      console.log(action);
      return state;
  }
};
export default itemReducer;
