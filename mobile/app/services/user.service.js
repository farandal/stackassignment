import { API_URL } from '../../app.config';

const login = user => {
  return fetch(`${API_URL}/auth/mobile-callback`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(handleResponse);
};

const logout = () => {};

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
