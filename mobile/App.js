import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import SplashScreen from 'react-native-splash-screen';
import userReducer from './app/reducers/user.reducer';
import Home from './app/components/Home';

const rootReducer = combineReducers({
  userReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

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
        <Home />
      </Provider>
    );
  }
}
