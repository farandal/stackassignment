import { logConstants } from '../constants';

const logReducer = (state = [], action) => {
  switch (action.type) {
    case logConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case logConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case logConstants.CLEAR:
      return {};
    default:
      return state;
  }
};
export default logReducer;
