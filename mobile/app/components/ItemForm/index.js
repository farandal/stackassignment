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
  ScrollView,
  ActivityIndicator
} from 'react-native';

import { Page, Button, ButtonContainer, Heading } from '../../components';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import config from '../../../app.config.js';
import { itemsActions } from '../../actions';

import moment from 'moment';
import timezone from 'moment-timezone';
import Spinner from 'react-native-loading-spinner-overlay';

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

const InitialState = {
  isFocused: false,
  isLoading: true,
  edit: false,
  item: {
    id: null,
    summary: '',
    location: '',
    description: '',
    start: null,
    end: null
  }
};

class ItemForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = InitialState;
  }
  reset() {
    this.setState(InitialState);
  }

  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: config.colors.primary
    },
    headerTintColor: config.colors.text.primary,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  };

  submitForm = (values, actions) => {
    let { dispatch } = this.props;

    actions.setSubmitting(false);
    if (this.state.edit) {
      this.setState({ isLoading: true, item: values });
      console.log('POST EDIT', this.state);
      this.props.updateItem(values);
    } else {
      this.setState({ isLoading: true, item: values });
      this.props.createItem(this.state.item);
    }
    //console.log('reseting form');
    //actions.resetForm();
    return;
  };

  componentDidUpdate(props, state) {
    //console.log('Component did update from:', state);
    //console.log('to:', this.state);
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('didFocus', () => {
        if (this.props.navigation.getParam('itemId')) {
          this.setState({
            isFocused: true,
            isLoading: true,
            title: 'Edit Item',
            edit: true,
            item: InitialState.item //resets the item
          });
          this.props.getItem(this.props.navigation.getParam('itemId'));
          return;
        }
        this.setState({
          isFocused: true,
          isLoading: false,
          edit: false,
          title: 'Create Item',
          item: InitialState.item //resets the item
        });
      }),
      this.props.navigation.addListener('willBlur', () => {
        this.setState({ isFocused: false });
      })
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  static getDerivedStateFromProps(props, state) {
    if (
      state.isFocused &&
      props.logs.type === 'LOG_SUCCESS' &&
      props.logs.method === 'CREATE_ITEM'
    ) {
      props.navigation.navigate('Main', { update: true });
      return { isLoading: false };
    }

    if (
      state.isFocused &&
      props.logs.type === 'LOG_SUCCESS' &&
      props.logs.method === 'UPDATE_ITEM'
    ) {
      props.navigation.navigate('Detail', { itemId: state.item.id });
      return { isLoading: false };
    }

    if (
      state.isFocused &&
      props.logs.type === 'LOG_SUCCESS' &&
      props.logs.method === 'GET_ITEM'
    ) {
      return {
        item: {
          id: props.logs.data.id,
          summary: props.logs.data.summary,
          location: props.logs.data.location,
          description: props.logs.data.description,
          start: moment(props.logs.data.start.dateTime).format(
            'YYYY-MM-DDTHH:mm:00'
          ),
          end: moment(props.logs.data.end.dateTime).format(
            'YYYY-MM-DDTHH:mm:00'
          )
        },
        isLoading: false
      };
    }
    return null;
  }

  render = () => {
    const { loggedIn, user, token } = this.props.userStore;
    const { itemsStore } = this.props;
    const { isLoading, item, edit } = this.state;

    return (
      <Page>
        {isLoading ? (
          <Spinner
            visible={isLoading}
            textContent={''}
            customIndicator={
              <ActivityIndicator size={150} color={config.colors.primary} />
            }
            textStyle={styles.spinnerTextStyle}
          />
        ) : (
          <Formik
            validationSchema={validationSchema}
            initialValues={edit ? item : {}}
            onSubmit={this.submitForm}
            enableReinitialize
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
        )}
      </Page>
    );
  };
}

const styles = StyleSheet.create({
  spinnerTextStyle: {}
});
/*
Resources:
-https://stackoverflow.com/questions/35300419/redux-do-i-have-to-import-store-in-all-my-containers-if-i-want-to-have-access-t
-https://blog.benestudio.co/5-ways-to-connect-redux-actions-3f56af4009c8
*/

const createItem = itemsActions.createItem;
const updateItem = itemsActions.updateItem;
const getItem = itemsActions.getItem;
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createItem,
      getItem,
      updateItem
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
