//REACT
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
//CONFIG
import Root from './config/Root';
//REDUX
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import itemReducer from './reducers/item.reducer';
import userReducer from './reducers/user.reducer';

const rootReducer = combineReducers({
  itemReducer,
  userReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./config/Root', () => {
    const newApp = require('./config/Root').default;
    render(newApp);
  });
}
