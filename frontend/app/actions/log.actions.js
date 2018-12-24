import { logConstants } from '../constants';

export const logActions = {
  success,
  error,
  clear
};

function success(method) {
  return { type: logConstants.SUCCESS, ...method };
}

function error(method) {
  return { type: logConstants.ERROR, ...method };
}

function clear() {
  return { type: logConstants.CLEAR };
}
