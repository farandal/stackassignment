import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userActions } from '../../actions';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { UIManager, LayoutAnimation, Alert } from 'react-native';
import { Page, Button, ButtonContainer, Form, Heading } from '../../components';
import config from '../../../app.config.js';
import { userService } from '../../services';
import { AsyncStorage } from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

type Props = {};

class Main extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Next Meetings...',
    headerStyle: {
      backgroundColor: config.colors.primary
    },
    headerTintColor: config.colors.text.primary,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  };

  render = () => {
    const { loggedIn, user, token } = this.props.userStore;
    return (
      <Page>
        {!!loggedIn && (
          <Form>
            <Form.Label>User</Form.Label>
            <Form.Value>{JSON.stringify(user)}</Form.Value>
            <Form.Label>Token</Form.Label>
            <Form.Value>{token}</Form.Value>
          </Form>
        )}
        <ButtonContainer>
          <Button
            onPress={() => this.props.navigation.push('Home')}
            text='Home'
            color={config.colors.secondaryDark}
          />
        </ButtonContainer>
      </Page>
    );
  };
}

/*
const login = userActions.login;

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );
*/

const mapStateToProps = state => {
  return {
    userStore: state.userReducer
  };
};

export default connect(mapStateToProps)(Main);
