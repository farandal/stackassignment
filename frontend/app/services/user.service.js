import { appendAuthToken } from '../helpers';

const API_URL = 'http://stackassignment-backend-local.farandal.com:8888';

export const userService = {
  register
};

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(`${API_URL}/auth/google`, requestOptions)
    .then(handleResponse)
    .then(user => {
      console.log('user', user);
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  console.log('-logout');
  localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      console.log('-Response is not ok');
      if (response.status === 401) {
        console.log('-Response status 401');
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
