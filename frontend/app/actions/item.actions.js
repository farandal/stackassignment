import { itemConstants } from '../constants';
import { itemService } from '../services';
import { history } from '../helpers';
import { logActions } from './';

export const itemActions = {
  getItem,
  updateItem,
  getItems,
  deleteItem,
  createItem,
  getCalendar
};

const GET_ITEMS = 'GET_ITEMS';
const DELETE_ITEM = 'DELETE_ITEM';
const GET_CALENDAR = 'GET_CALENDAR';
const CREATE_ITEM = 'CREATE_ITEM';
const GET_ITEM = 'GET_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';

function getCalendar(id) {
  return dispatch => {
    //dispatch(request(GET_CALENDAR));
    itemService.getCalendar().then(
      response => {
        //TODO: IMPORTANT check where the calendar id comes in the response
        dispatch(
          logActions.success({ method: GET_CALENDAR, data: response.id })
        );
        window.localStorage.setItem('calendarId', response.id);
      },
      error => {
        //dispatch(failure(GET_CALENDAR));
        dispatch(
          logActions.error({
            method: GET_CALENDAR,
            error: error && error.message ? error.message.toString() : 'error'
          })
        );
      }
    );
  };
}

function createItem(item) {
  return dispatch => {
    //dispatch(request(CREATE_ITEM));
    itemService.createItem(item).then(
      response => {
        dispatch(logActions.success({ method: CREATE_ITEM, data: response }));
      },
      error => {
        //dispatch(failure(DELETE_ITEM));
        dispatch(
          logActions.error({
            method: DELETE_ITEM,
            error: error && error.message ? error.message.toString() : 'error'
          })
        );
      }
    );
  };
}

function deleteItem(id) {
  return dispatch => {
    //dispatch(request(DELETE_ITEM));
    itemService.deleteItem(id).then(
      response => {
        dispatch(logActions.success({ method: DELETE_ITEM, data: id }));
        dispatch(getItems());
      },
      error => {
        //dispatch(failure(DELETE_ITEM));
        dispatch(
          logActions.error({
            method: DELETE_ITEM,
            error: error && error.message ? error.message.toString() : 'error'
          })
        );
      }
    );
  };
}

function getItemsOneByOne() {
  return dispatch => {
    itemService.getItems().then(
      items => {
        dispatch(logActions.success({ method: GET_ITEMS, data: items }));
        items.map((item, i) => {
          let { id, created, creator, summary, description, end, start } = item;
          let parsedItem = {
            id,
            created,
            creator,
            summary,
            description,
            end,
            start
          };
          console.log('item', parsedItem);
          dispatch(append(parsedItem));
        });
      },
      error => {
        //dispatch(failure(GET_ITEMS));
        dispatch(
          logActions.error({
            method: GET_ITEMS,
            error: error && error.message ? error.message.toString() : 'error'
          })
        );
      }
    );
  };
}

function getItems() {
  return dispatch => {
    //dispatch(request(GET_ITEMS));
    itemService.getItems().then(
      items => {
        dispatch(logActions.success({ method: GET_ITEMS, data: items }));
        dispatch(appendItems(items));
      },

      error => {
        //dispatch(failure(GET_ITEMS));
        dispatch(
          logActions.error({
            method: GET_ITEMS,
            error: error && error.message ? error.message.toString() : 'error'
          })
        );
      }
    );
  };
}

function getItem(id) {
  return dispatch => {
    //dispatch(request(GET_ITEM));
    itemService.getItem(id).then(
      item => {
        dispatch(logActions.success({ method: GET_ITEM, data: item }));
        //dispatch(gettedItem(item));
      },

      error => {
        //dispatch(failure(GET_ITEMS));
        dispatch(
          logActions.error({
            method: GET_ITEM,
            error: error && error.message ? error.message.toString() : 'error'
          })
        );
      }
    );
  };
}

function updateItem(item) {
  return dispatch => {
    //dispatch(request(UPDATE_ITEM));
    itemService.updateItem(item).then(
      response => {
        dispatch(logActions.success({ method: UPDATE_ITEM, data: response }));
      },
      error => {
        //dispatch(failure(UPDATE_ITEM));
        dispatch(
          logActions.error({
            method: UPDATE_ITEM,
            error: error && error.message ? error.message.toString() : 'error'
          })
        );
      }
    );
  };
}

function request(data) {
  return { type: itemConstants.ITEM_REQUEST_SENT, data };
}
function success(data) {
  return { type: itemConstants.ITEM_REQUEST_SUCCESS, data };
}
function append(item) {
  return { type: 'APPEND_ITEM', item: item };
}
function appendItems(items) {
  return { type: 'APPEND_ITEMS', items: items };
}
/*function gettedItem(item) {
  return { type: 'GET_ITEM', item: item };
}*/
function failure(error) {
  return { type: itemConstants.ITEM_REQUEST_FAILURE, error };
}
