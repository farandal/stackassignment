import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Root from './config/Root';
import itemReducer from './reducers/itemReducer';
import appReducer from './reducers/appReducer';

const rootReducer = combineReducers({
  itemReducer,
  appReducer
});

const store = createStore(rootReducer);

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
