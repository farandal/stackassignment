import { appendAuthToken } from '../helpers';
import { API_URL } from '../app.config';
export const itemService = {
  getItems,
  deleteItem,
  createItem,
  getCalendar
};

function getCalendar() {
  console.log('API_URL', API_URL);

  const requestOptions = {
    method: 'POST',
    headers: appendAuthToken()
  };
  return fetch(`${API_URL}/items/calendar`, requestOptions)
    .then(handleResponse)
    .then(res => {
      console.log('Get Calendar from API, logs:', res);
      return res;
    });
}
function createItem(item) {
  console.log('API_URL', API_URL);

  const parsedItem = {
    summary: item.summary,
    location: item.location,
    description: item.description,
    start: {
      dateTime: item.start.toString() + '-07:00'
    },
    end: {
      dateTime: item.end.toString() + '-07:00'
    }
  };

  const requestOptions = {
    method: 'POST',
    headers: appendAuthToken('json'),
    body: JSON.stringify(parsedItem)
  };

  return fetch(`${API_URL}/items/insert`, requestOptions)
    .then(handleResponse)
    .then(res => {
      console.log('Created Event from API, logs:', res);
      return res;
    });
}

function deleteItem(id) {
  console.log('API_URL', API_URL);

  const requestOptions = {
    method: 'POST',
    headers: appendAuthToken()
  };
  return fetch(`${API_URL}/items/delete/${id}`, requestOptions)
    .then(handleResponse)
    .then(res => {
      console.log('Deleted Event from API logs:', res);
      return res;
    });
}

function getItems() {
  console.log('API_URL', API_URL);
  const payload = { token: localStorage.getItem('jwt') };
  const requestOptions = {
    method: 'POST',
    headers: appendAuthToken(),
    body: JSON.stringify(payload)
  };
  return fetch(`${API_URL}/items`, requestOptions)
    .then(handleResponse)
    .then(data => {
      console.log('data', data);
      return data;
    });
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      console.log('-Response is not ok');
      if (response.status === 401) {
        console.log('-Response status 401');
      }
      const error =
        (data && data.error ? data.error : 'DEFAULT_ERROR') ||
        response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
