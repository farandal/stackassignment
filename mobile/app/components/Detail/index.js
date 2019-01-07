import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { UIManager, LayoutAnimation, Alert } from 'react-native';
import { Page, Button, ButtonContainer, Form, Heading } from '../../components';
import { Card, Button as ElementsButton } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { itemsActions } from '../../actions';
import moment from 'moment';
import timezone from 'moment-timezone';
import { AsyncStorage } from 'react-native';
import config from '../../../app.config.js';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  static navigationOptions = {
    title: 'Detail',
    headerStyle: {
      backgroundColor: config.colors.primary
    },
    headerTintColor: config.colors.text.primary,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  };

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('didFocus', () => {
        console.log('GET ITEM', this.props.navigation.getParam('itemId'));
        let itemId = this.props.navigation.getParam('itemId');
        this.props.getItem(itemId);
        this.setState({ isLoading: true, isFocused: true });
      }),
      this.props.navigation.addListener('willBlur', () => {
        this.setState({ isFocused: false, isLoading: false });
      })
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  static getDerivedStateFromProps(props, state) {
    if (props.logs.type === 'LOG_ERROR' && props.logs.method === 'GET_ITEM') {
      alert(props.logs.data);
      return {
        isLoading: false
      };
    }

    if (
      state.isFocused &&
      (props.logs.type === 'LOG_SUCCESS' && props.logs.method === 'GET_ITEM')
    ) {
      return {
        isLoading: false
      };
    }

    return null;
  }

  render = () => {
    const { loggedIn, user, token } = this.props.userStore;
    const item = this.props.itemStore.data;
    const { isLoading } = this.state;
    return (
      <Page>
        <Spinner
          visible={isLoading}
          customIndicator={
            <ActivityIndicator size={150} color={config.colors.primary} />
          }
        />
        {!isLoading && (
          <Card style={styles.card}>
            {!!item && item.summary ? (
              <View style={styles.contentView}>
                <Text style={styles.titleText}>{item.summary}</Text>
                <Text style={styles.bodyText}>{item.description}</Text>
                <Text style={styles.bodyText}>
                  {moment(`${item.start.dateTime}`).calendar()}
                </Text>
              </View>
            ) : (
              <Text style={styles.titleText}>loading</Text>
            )}
          </Card>
        )}

        <ButtonContainer>
          <Button
            onPress={() => this.props.navigation.navigate('Create')}
            text='Create'
            color={config.colors.secondaryDark}
          />
        </ButtonContainer>
      </Page>
    );
  };
}

const styles = StyleSheet.create({
  baseText: {},
  titleText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  card: {
    flex: 1,
    flexDirection: 'row'
  },
  iconView: {
    width: 40
  },
  contentView: { flexGrow: 1 }
});

const getItem = itemsActions.getItem;

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getItem
    },
    dispatch
  );

const mapStateToProps = state => {
  return {
    userStore: state.userReducer,
    itemStore: state.itemReducer,
    logs: state.logReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
