import { AsyncStorage } from 'react-native';
import { removeItemValue, setItemValue, getItemValue } from './asyncstorage';

export async function appendAuthToken(type) {
  const token = await getItemValue('token');
  const headerObj = {};
  if (type === 'json') {
    headerObj['Content-Type'] = 'application/json';
  } else {
    headerObj['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  if (token) {
    headerObj['Authorization'] = `Bearer ${token}`;
  }

  return headerObj;
}
