import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userActions } from '../../actions';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { UIManager, LayoutAnimation, Alert } from 'react-native';
import { Page, Button, ButtonContainer, Form, Heading } from '../../components';
import config from '../../../app.config.js';

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
    if (props.userStore.token) {
      AsyncStorage.setItem('token', props.userStore.token);
    }
    AsyncStorage.getItem('token')
      .then(token => token && this.props.navigation.navigate('Main'))
      .done();
    return state;
  }

  googleOauth = async e => {
    GoogleSignIn.configure(config.google);
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
              color={config.colors.secondaryDark}
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
