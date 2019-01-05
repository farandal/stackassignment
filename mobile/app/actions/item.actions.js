import { itemsConstants } from '../constants';
import { itemsService } from '../services';
import { removeItemValue, setItemValue, getItemValue } from '../helpers';
import { logActions } from './';

const GET_ITEMS = 'GET_ITEMS';
const DELETE_ITEM = 'DELETE_ITEM';
const GET_CALENDAR = 'GET_CALENDAR';
const CREATE_ITEM = 'CREATE_ITEM';
const GET_ITEM = 'GET_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';

function getCalendar(id) {
  return dispatch => {
    dispatch(request({ method: GET_CALENDAR }));
    itemsService.getCalendar().then(
      response => {
        //TODO: IMPORTANT check where the calendar id comes in the response
        setItemValue('calendarId', response.id);
        dispatch(success({ method: GET_CALENDAR, data: response.id }));
      },
      error => {
        dispatch(
          failure({
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
    dispatch(request({ method: CREATE_ITEM }));
    itemsService.createItem(item).then(
      response => {
        dispatch(success({ method: CREATE_ITEM, data: response }));
        dispatch(
          logActions.success({ method: CREATE_ITEM, data: response.id })
        );
      },
      error => {
        dispatch(
          failure({
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
    dispatch(request({ method: DELETE_ITEM }));
    itemsService.deleteItem(id).then(
      response => {
        dispatch(success({ method: DELETE_ITEM, data: id }));
        dispatch(getItems());
      },
      error => {
        dispatch(
          failure({
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
    dispatch(request({ method: GET_ITEMS }));
    itemsService.getItems().then(
      items => {
        dispatch(success({ method: GET_ITEMS, data: items }));
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
        dispatch(
          failure({
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
    dispatch(request({ method: GET_ITEMS }));
    itemsService.getItems().then(
      items => {
        dispatch(success({ method: GET_ITEMS, data: items }));
        dispatch(appendItems(items));
      },

      error => {
        dispatch(
          failure({
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
    dispatch(clearItem());
    dispatch(getItemRequest());
    itemsService.getItem(id).then(
      item => {
        dispatch(getItemSuccess({ data: item }));
      },

      error => {
        dispatch(
          getItemFailure({
            error: error && error.message ? error.message.toString() : 'error'
          })
        );
      }
    );
  };
}

function updateItem(item) {
  return dispatch => {
    dispatch(request({ method: UPDATE_ITEM }));
    itemsService.updateItem(item).then(
      response => {
        dispatch(success({ method: UPDATE_ITEM, data: response }));
      },
      error => {
        dispatch(
          failure({
            method: UPDATE_ITEM,
            error: error && error.message ? error.message.toString() : 'error'
          })
        );
      }
    );
  };
}

function request(data) {
  return { type: itemsConstants.ITEM_REQUEST_SENT, data };
}
function success(data) {
  return { type: itemsConstants.ITEM_REQUEST_SUCCESS, data };
}

function getItemSuccess(data) {
  return { type: itemsConstants.GET_ITEM_SUCCESS, data };
}

function clearItem() {
  return { type: itemsConstants.CLEAR_ITEM };
}

function getItemFailure(error) {
  return { type: itemsConstants.GET_ITEM_FAILURE, error };
}

function getItemRequest(id) {
  return { type: itemsConstants.GET_ITEM_REQUEST, id };
}

function append(item) {
  return { type: itemsConstants.APPEND_ITEM, item: item };
}
function appendItems(items) {
  return { type: itemsConstants.APPEND_ITEMS, items: items };
}
function failure(error) {
  return { type: itemsConstants.ITEM_REQUEST_FAILURE, error };
}

export const itemsActions = {
  getItem,
  updateItem,
  getItems,
  deleteItem,
  createItem,
  getCalendar
};
