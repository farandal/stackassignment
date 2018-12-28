import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import thunk from 'redux-thunk';
import SplashScreen from 'react-native-splash-screen';
import userReducer from './app/reducers/user.reducer';
import HomeScreen from './app/components/Home';
import MainScreen from './app/components/Main';
import config from './app.config.js';

const rootReducer = combineReducers({
  userReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Main: {
    screen: MainScreen
  }
});

const AppContainer = createAppContainer(AppNavigator);

type State = {
  session: {
    loggedIn: boolean,
    hasLoggedInOnce: boolean
  }
};

type Props = {};

export default class App extends Component<Props> {
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
