import { logConstants } from '../constants';
//The state is the action in this case
const logReducer = (state = {}, action) => {
  console.log(action);
  return action;
};
export default logReducer;
