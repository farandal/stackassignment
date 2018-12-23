import { logConstants } from '../constants';

export const logActions = {
  success,
  error,
  clear
};

function success(message) {
  return { type: logConstants.SUCCESS, message };
}

function error(message) {
  return { type: logConstants.ERROR, message };
}

function clear() {
  return { type: logConstants.CLEAR };
}
