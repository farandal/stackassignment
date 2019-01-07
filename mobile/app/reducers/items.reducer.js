import { itemsConstants } from '../constants';

const itemsReducer = (state = [], action) => {
  const data = action.data || action;
  switch (action.type) {
    case itemsConstants.APPEND_ITEMS:
      console.log('Appending items', data.items);
      state = data.items;
      return state;
    case itemsConstants.APPEND_ITEM:
      console.log('Trying to appned', data.item);
      if (state.find(item => item.id === data.item.id)) {
        return state;
      } else {
        return [data.item, ...state];
      }
    default:
      return state;
  }
};
export default itemsReducer;
