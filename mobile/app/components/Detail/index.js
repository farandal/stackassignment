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
  TouchableOpacity
} from 'react-native';
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

type Props = {};

class Detail extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
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
    console.log('GET ITEM', this.props.navigation.getParam('itemId'));
    this.props.getItem(this.props.navigation.getParam('itemId'));
  }

  static getDerivedStateFromProps(props, state) {
    console.log(props);
    return state;
  }

  render = () => {
    const { loggedIn, user, token } = this.props.userStore;
    const item = this.props.itemStore.data;
    return (
      <Page>
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

        <ButtonContainer>
          <Button
            onPress={() => this.props.navigation.navigate('Main')}
            text='Calendar'
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
    itemStore: state.itemReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
