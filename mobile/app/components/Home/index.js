import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userActions } from '../../actions';
import { API_URL } from '../../../app.config';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { UIManager, LayoutAnimation, Alert } from 'react-native';
import { Page, Button, ButtonContainer, Form, Heading } from '../../components';

import GoogleSignIn from 'react-native-google-sign-in';
import { userService } from '../../services';

import { AsyncStorage } from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

type Props = {};

class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    if (props.userStore.token) {
      AsyncStorage.setItem('token', props.userStore.token);
    }
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          console.log('Token found in storage', token);
        }
      })
      .done();
    return state;
  }

  googleOauth = async e => {
    GoogleSignIn.configure({
      clientID:
        '341947537567-s92njnjoagh7r6aelfnmchf99vqoghbv.apps.googleusercontent.com',
      scopes: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
      shouldFetchBasicProfile: true,
      language: 'en-EN',
      serverClientID:
        '341947537567-s6532eu6tkk44qkers2mkf8p7mglkt62.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true
    });

    const user = await GoogleSignIn.signInPromise();

    this.props.login(user);
  };

  render = () => {
    const { loggedIn, user, token } = this.props.userStore;

    return (
      <Page>
        {!!loggedIn ? (
          <Form>
            <Form.Label>User</Form.Label>
            <Form.Value>{JSON.stringify(user)}</Form.Value>
            <Form.Label>Token</Form.Label>
            <Form.Value>{token}</Form.Value>
          </Form>
        ) : (
          <Heading>
            {'Welcome!, please login with your google account.'}
          </Heading>
        )}

        <ButtonContainer>
          {!loggedIn && (
            <Button
              onPress={this.googleOauth}
              text='LOGIN WITH GOOGLE'
              color='#58861b'
              accessibilityLabel='Login with google Oauth2'
            />
          )}
        </ButtonContainer>
      </Page>
    );
  };
}

const login = userActions.login;

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
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
