import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import thunk from 'redux-thunk';
import SplashScreen from 'react-native-splash-screen';
import userReducer from './app/reducers/user.reducer';
import itemsReducer from './app/reducers/items.reducer';
import itemReducer from './app/reducers/item.reducer';
import logReducer from './app/reducers/log.reducer';
import HomeScreen from './app/components/Home';
import MainScreen from './app/components/Main';
import DetailScreen from './app/components/Detail';
import ItemForm from './app/components/ItemForm';
import config from './app.config.js';
//import { reducer as formReducer } from 'redux-form';
import { dispatchSubscribe } from 'redux-dispatch-subscribe';
import ReactPropTypes from 'prop-types';

const rootReducer = combineReducers({
  userReducer,
  itemsReducer,
  itemReducer,
  logReducer
  //formReducer
});

const enhancer = compose(
  applyMiddleware(thunk),
  dispatchSubscribe()
);

const store = createStore(rootReducer, enhancer);

// Note: passing enhancer as the last argument to createStore requires redux@>=3.1.0
//const store = createStore(reducer, initialState, enhancer);

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Main: {
    screen: MainScreen
  },
  Detail: {
    screen: DetailScreen
  },
  Create: {
    screen: ItemForm
  },
  Edit: {
    screen: ItemForm
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => SplashScreen.hide(), 5000);
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
