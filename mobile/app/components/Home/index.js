import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userActions } from '../../actions';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { UIManager, LayoutAnimation, Alert } from 'react-native';
import { Page, Button, ButtonContainer, Form, Heading } from '../../components';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import config from '../../../app.config.js';
import oauth from '../../../mocks/oauth.response.js';

import GoogleSignIn from 'react-native-google-sign-in';
import { userService } from '../../services';

import { AsyncStorage } from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

type Props = {};

class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  static navigationOptions = {
    title: 'Login',
    headerStyle: {
      backgroundColor: config.colors.primary
    },
    headerTintColor: config.colors.text.primary,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  };

  static getDerivedStateFromProps(props, state) {
    console.log('props', props);
    AsyncStorage.getItem('token')
      .then(token => {
        if (token && token != '') {
          console.log('Token', token);
          if (props.navigation.getParam('redirect', true)) {
            props.navigation.navigate('Main');
          }
        }
      })
      .done();
    return state;
  }

  logout = async e => {
    this.props.logout();
    this.setState({ loggedIn: false });
    this.props.navigation.push('Home');
  };

  googleOauth = async e => {
    const { login } = this.props;
    if (config.env === 'dev') {
      console.log('login', oauth);
      login(oauth);
      return;
    }
    GoogleSignIn.configure(config.google);
    const user = await GoogleSignIn.signInPromise();
    login(user);
  };

  render = () => {
    const { loggedIn, user, token } = this.props.userStore;

    return (
      <Page>
        {!!loggedIn ? (
          <Text />
        ) : (
          <Heading>
            {'Welcome!, please login with your google account.'}
          </Heading>
        )}
        <ButtonContainer>
          {!loggedIn ? (
            <Button
              onPress={this.googleOauth}
              text='LOGIN WITH GOOGLE'
              color={config.colors.secondaryDark}
              accessibilityLabel='Login with google Oauth2'
            />
          ) : (
            <Button
              onPress={this.logout}
              text='LOGOUT'
              color={config.colors.secondaryDark}
              accessibilityLabel='Logout'
            />
          )}
        </ButtonContainer>
      </Page>
    );
  };
}

const login = userActions.login;
const logout = userActions.logout;

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      logout
    },
    dispatch
  );

const mapStateToProps = state => {
  return {
    userStore: state.userReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
