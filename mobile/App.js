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
import GoogleSignIn from 'react-native-google-sign-in';

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
      },
      user: {}
    };
  }

  googleOauth = async e => {
    try {
      await GoogleSignIn.configure({
        // iOS
        clientID:
          '341947537567-s92njnjoagh7r6aelfnmchf99vqoghbv.apps.googleusercontent.com',

        // iOS, Android
        // https://developers.google.com/identity/protocols/googlescopes
        scopes: [
          'profile',
          'email',
          'https://www.googleapis.com/auth/calendar'
        ],

        // iOS, Android
        // Whether to request email and basic profile.
        // [Default: true]
        // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a06bf16b507496b126d25ea909d366ba4
        shouldFetchBasicProfile: true,

        // iOS
        // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a486c8df263ca799bea18ebe5430dbdf7
        language: 'en-EN',

        // iOS
        // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd
        //loginHint: string,

        // iOS, Android
        // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#ae214ed831bb93a06d8d9c3692d5b35f9
        serverClientID:
          '341947537567-s6532eu6tkk44qkers2mkf8p7mglkt62.apps.googleusercontent.com',

        // Android
        // Whether to request server auth code. Make sure to provide `serverClientID`.
        // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#requestServerAuthCode(java.lang.String, boolean)
        offlineAccess: true,

        // Android
        // Whether to force code for refresh token.
        // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#requestServerAuthCode(java.lang.String, boolean)
        forceCodeForRefreshToken: true

        // iOS
        // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a211c074872cd542eda53f696c5eef871
        //openIDRealm: string,

        // Android
        // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#setAccountName(java.lang.String)
        //accountName: 'yourServerAccountName',

        // iOS, Android
        // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a6d85d14588e8bf21a4fcf63e869e3be3
        //hostedDomain: 'yourHostedDomain',
      });

      const user = await GoogleSignIn.signInPromise();

      console.log(user);
      this.setState({ session: { loggedIn: true }, user: user });
      alert(JSON.stringify(user, null, '  '));
    } catch (error) {
      alert(JSON.stringify(error));
      // some other error happened
    }
  };

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const { session, user } = this.state;
    return (
      <Page>
        {!!session.loggedIn ? (
          <Form>
            <Form.Label>LoggedIn</Form.Label>
            <Form.Value>{session.loggedIn}</Form.Value>
            <Form.Label>User</Form.Label>
            <Form.Value>{JSON.stringify(user)}</Form.Value>
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
