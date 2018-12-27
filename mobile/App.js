/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { UIManager, LayoutAnimation, Alert } from 'react-native';
import { Page, Button, ButtonContainer, Form, Heading } from './app/components';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});

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
    this.state = {
      session: {
        loggedIn: false,
        hasLoggedInOnce: false
      }
    };
  }

  googleOauth = async e => {
    //Not yet implemented
  };

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const { session } = this.state;
    return (
      <Page>
        {!!session.loggedIn ? (
          <Form>
            <Form.Label>LoggedIn</Form.Label>
            <Form.Value>{session.loggedIn}</Form.Value>
          </Form>
        ) : (
          <Heading>
            {'Welcome!, please login with your google account.'}
          </Heading>
        )}

        <ButtonContainer>
          {!session.loggedIn && (
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
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
