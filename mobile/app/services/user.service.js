import config from '../../app.config';
import { AsyncStorage } from 'react-native';
import { removeItemValue, addItemValue } from '../helpers';

const login = user => {
  return fetch(`${config.apiUrl}/auth/mobile-callback`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(handleResponse)
    .then(data => {
      console.log('setting token from login response', data.token);
      AsyncStorage.setItem('token', data.token);
      return data;
    });
};

const logout = async () => {
  console.log('Celared token from AsyncStorage');
  return removeItemValue('token');
};

const handleResponse = response => {
  const text = response._bodyText;

  const data = text && JSON.parse(text);
  console.log('ok', response.ok);
  if (!response.ok) {
    if (response.status === 401) {
      logout();
    }
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  return data;
};

export const userService = {
  login,
  logout
};
