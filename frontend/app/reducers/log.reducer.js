import { logConstants } from '../constants';

const logReducer = (state = [], action) => {
  switch (action.type) {
    case logConstants.SUCCESS:
      return action;
    case logConstants.ERROR:
      return action;
    case logConstants.CLEAR:
      return {};
    default:
      return state;
  }
};
export default logReducer;
