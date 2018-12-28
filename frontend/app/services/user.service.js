import { appendAuthToken } from '../helpers';
import { API_URL } from '../app.config';

const getUser = user =>
  fetch(`${API_URL}/users/me`, {
    method: 'POST',
    headers: appendAuthToken('json')
  })
    .then(handleResponse)
    .then(user => {
      return user;
    });

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('jwt');
};

const handleResponse = response =>
  response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });

export const userService = {
  getUser,
  logout
};
