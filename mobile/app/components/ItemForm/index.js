import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ReactPropTypes from 'prop-types';

import {
  Platform,
  StyleSheet,
  View,
  Text,
  UIManager,
  LayoutAnimation,
  TextInput,
  ScrollView
} from 'react-native';

import { Page, Button, ButtonContainer, Heading } from '../../components';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import config from '../../../app.config.js';
import { itemsActions } from '../../actions';

import moment from 'moment';
import timezone from 'moment-timezone';

import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
  withFormikControl
} from 'react-native-formik';

import { TextField } from 'react-native-material-textfield';
import DatePicker from '../Form/DatePicker';
const DEFAULT_DATE_FORMAT = 'YYYY-MM-DDTHH:mm';
const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextField);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false
});

const FocusedDatePicker = compose(
  withFormikControl,
  withNextInputAutoFocusInput
)(DatePicker);

const validationSchema = Yup.object().shape({
  summary: Yup.string()
    .required('Summary required')
    .min(3, 'input is too short!'),
  description: Yup.string()
    .required()
    .min(3, 'input is too short!')
});

class ItemForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      summary: '',
      location: '',
      description: '',
      start: null,
      end: null
    };
  }

  submitForm = (values, actions) => {
    let { dispatch } = this.props;
    this.setState(values);
    actions.setSubmitting(false);
    this.props.createItem(this.state);
    return;
  };

  static navigationOptions = {
    title: 'Add Meeting...',
    headerStyle: {
      backgroundColor: config.colors.primary
    },
    headerTintColor: config.colors.text.primary,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.logs.type === 'LOG_SUCCESS' &&
      props.logs.method === 'CREATE_ITEM'
    ) {
      alert('Item was created');
      props.navigation.navigate('Main', { update: true });
    }
    return null;
  }

  render = () => {
    const { loggedIn, user, token } = this.props.userStore;
    const { itemsStore } = this.props;
    const { store } = this.context;
    return (
      <Page>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            start: moment().format(DEFAULT_DATE_FORMAT),
            end: moment()
              .add(1, 'hour')
              .format(DEFAULT_DATE_FORMAT)
          }}
          onSubmit={this.submitForm}
        >
          {props => {
            return (
              <Form>
                <MyInput label='Summary' name='summary' type='name' />

                <MyInput label='Description' name='description' type='name' />

                <MyInput label='Location' name='location' type='name' />

                <DatePicker
                  setFieldTouched={() => {}}
                  setFieldValue={value => {
                    props.values.start = moment(value).format(
                      DEFAULT_DATE_FORMAT
                    );
                  }}
                  value={props.values.start}
                  label='Start'
                  name='start'
                />

                <DatePicker
                  setFieldTouched={() => {}}
                  setFieldValue={value => {
                    props.values.end = moment(value).format(
                      DEFAULT_DATE_FORMAT
                    );
                  }}
                  value={props.values.end}
                  label='End'
                  name='end'
                />

                <Button
                  color={config.colors.secondary}
                  onPress={props.handleSubmit}
                  text='Submit'
                />
              </Form>
            );
          }}
        </Formik>
      </Page>
    );
  };
}

/*
Resources:
-https://stackoverflow.com/questions/35300419/redux-do-i-have-to-import-store-in-all-my-containers-if-i-want-to-have-access-t
-https://blog.benestudio.co/5-ways-to-connect-redux-actions-3f56af4009c8
*/

const createItem = itemsActions.createItem;
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createItem
    },
    dispatch
  );

const mapStateToProps = state => {
  return {
    userStore: state.userReducer,
    logs: state.logReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemForm);
