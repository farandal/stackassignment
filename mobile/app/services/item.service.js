import { appendAuthToken, removeItemValue, setItemValue } from '../helpers';
import config from '../../app.config';
import moment from 'moment';
import timezone from 'moment-timezone';

export const itemsService = {
  getItem,
  updateItem,
  getItems,
  deleteItem,
  createItem,
  getCalendar
};

async function getCalendar() {
  const header = await appendAuthToken();
  const requestOptions = {
    method: 'POST',
    headers: header
  };
  return fetch(`${config.apiUrl}/items/calendar`, requestOptions)
    .then(handleResponse)
    .then(res => {
      console.log('Get Calendar from API, logs:', res);
      return res;
    });
}
async function createItem(item) {
  const header = await appendAuthToken('json');
  const parsedItem = {
    summary: item.summary,
    location: item.location,
    description: item.description,
    start: {
      dateTime: moment(item.start).format('YYYY-MM-DDTHH:mm:ssZ')
    },
    end: {
      dateTime: moment(item.end).format('YYYY-MM-DDTHH:mm:ssZ')
    }
  };

  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(parsedItem)
  };

  return fetch(`${config.apiUrl}/items/insert`, requestOptions)
    .then(handleResponse)
    .then(res => {
      console.log('Created Event from API, logs:', res);
      return res;
    });
}

async function updateItem(item) {
  const header = await appendAuthToken('json');
  const parsedItem = {
    summary: item.summary,
    location: item.location,
    description: item.description,
    start: {
      dateTime: moment(item.start).format('YYYY-MM-DDTHH:mm:ssZ')
    },
    end: {
      dateTime: moment(item.end).format('YYYY-MM-DDTHH:mm:ssZ')
    }
  };

  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(parsedItem)
  };

  return fetch(`${config.apiUrl}/items/update/${item.id}`, requestOptions)
    .then(handleResponse)
    .then(res => {
      console.log('Updated Event from API, logs:', res);
      return res;
    });
}

async function deleteItem(id) {
  const header = await appendAuthToken();
  const requestOptions = {
    method: 'POST',
    headers: header
  };
  return fetch(`${config.apiUrl}/items/delete/${id}`, requestOptions)
    .then(handleResponse)
    .then(res => {
      console.log('Deleted Event from API logs:', res);
      return res;
    });
}

async function getItems() {
  const header = await appendAuthToken();
  const requestOptions = {
    method: 'POST',
    headers: header
  };

  return fetch(`${config.apiUrl}/items`, requestOptions)
    .then(handleResponse)
    .then(data => {
      console.log('data', data);
      return data;
    });
}

async function getItem(id) {
  const header = await appendAuthToken();
  const requestOptions = {
    method: 'POST',
    headers: header
  };

  return fetch(`${config.apiUrl}/items/${id}`, requestOptions)
    .then(handleResponse)
    .then(data => {
      console.log('data', data);
      return data;
    });
}

const handleResponse = response => {
  const text = response._bodyText;

  const data = text && JSON.parse(text);
  console.log('ok', response.ok);
  console.log(data);
  if (!response.ok) {
    if (response.status === 401) {
      console.log('-Response status 401');
    }
    const error =
      (data && data.error ? data.error : 'DEFAULT_ERROR') ||
      response.statusText;
    return Promise.reject(error);
  }
  return data;
};
