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
  UIManager,
  LayoutAnimation,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Page, Button, ButtonContainer, Form, Heading } from '../../components';
import { Card, Button as ElementsButton } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { userActions, itemsActions } from '../../actions';
import { userService, itemsService } from '../../services';
import moment from 'moment';
import timezone from 'moment-timezone';
import { AsyncStorage } from 'react-native';
import config from '../../../app.config.js';
import Spinner from 'react-native-loading-spinner-overlay';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { isFocused: false, isLoading: false };
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

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('didFocus', () => {
        this.setState({ isFocused: true });
        if (this.props.navigation.getParam('update') === true) {
          console.log('GETTING THE LIST BECAUSE NEEDS UPDATE');
          this.setState({ isLoading: true });
          this.props.getItems();
        } else if (!this.props.itemsStore.length) {
          this.setState({ isLoading: true });
          console.log('GETTING THE LIST BECAUSE ITS EMPTY');
          this.props.getItems();
        }
      }),
      this.props.navigation.addListener('willBlur', () => {
        this.setState({ isFocused: false, isLoading: false });
      })
    ];
    console.log('UPDATING THE LIST FIRST TIME');
    this.props.getItems();
    this.setState({ isLoading: true });
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  static getDerivedStateFromProps(props, state) {
    if (
      state.isFocused &&
      ((props.logs.type === 'LOG_SUCCESS' &&
        props.logs.method === 'GET_ITEMS') ||
        (props.logs.type === 'LOG_ERROR' && props.logs.method === 'GET_ITEMS'))
    ) {
      return {
        isLoading: false
      };
    }

    if (
      state.isFocused &&
      (props.logs.type === 'LOG_ERROR' && props.logs.method === 'GET_ITEMS')
    ) {
      Alert('Error retrieving list');
    }

    return null;
  }

  render = () => {
    const { loggedIn, user, token } = this.props.userStore;
    const { itemsStore } = this.props;
    const { isLoading } = this.state;
    return (
      <Page>
        {isLoading ? (
          <Spinner
            visible={isLoading}
            customIndicator={
              <ActivityIndicator size={150} color={config.colors.primary} />
            }
          />
        ) : (
          <ScrollView>
            {itemsStore &&
              itemsStore.map((item, i) => (
                <Card key={i}>
                  <View style={styles.card}>
                    <View style={styles.cardContent}>
                      <View style={styles.iconView}>
                        <Icon
                          name='calendar'
                          size={30}
                          color={config.colors.primary}
                        />
                      </View>
                      <View style={styles.cardContent}>
                        <Text style={styles.titleText}>{item.summary}</Text>
                        <Text style={styles.bodyText}>{item.description}</Text>
                        <Text style={styles.bodyText}>
                          {moment(`${item.start.dateTime}`).calendar()}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.cardActions}>
                      <View style={styles.buttonsView}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => {
                            this.props.navigation.navigate('Edit', {
                              itemId: item.id
                            });
                          }}
                        >
                          <Icon name={'edit'} size={25} color='#ffffff' />
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => {
                            this.props.navigation.navigate('Detail', {
                              itemId: item.id
                            });
                          }}
                        >
                          <Icon
                            name={'info-circle'}
                            size={25}
                            color='#ffffff'
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.button, styles.buttonRed]}
                          onPress={() => {
                            this.props.deleteItem(item.id);
                          }}
                        >
                          <Icon
                            name={'times-circle'}
                            size={25}
                            color='#ffffff'
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Card>
              ))}
          </ScrollView>
        )}

        <ButtonContainer>
          <Button
            onPress={() =>
              this.props.navigation.push('Home', {
                redirect: false
              })
            }
            text='Home'
            color={config.colors.secondaryDark}
          />
          <Button
            onPress={() => this.props.navigation.push('Create')}
            text='Create Meeting'
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
    fontSize: 16,
    fontWeight: 'bold'
  },
  card: {
    flex: 1,
    flexDirection: 'row'
  },
  cardContent: {
    flex: 1,
    flexDirection: 'column',
    height: 100
  },
  cardActions: {
    flex: 1,
    flexDirection: 'row'
  },
  iconView: {
    width: 40
  },
  contentView: { flexGrow: 1 },
  buttonsView: {
    flexGrow: 1,
    flexDirection: 'row',
    padding: 5,
    borderRadius: 0,
    justifyContent: 'flex-end'
  },
  button: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: config.colors.secondary,
    borderRadius: 40,
    margin: 5
  },
  buttonRed: {
    backgroundColor: '#f44242'
  }
});

const getItems = itemsActions.getItems;
const deleteItem = itemsActions.deleteItem;

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getItems,
      deleteItem
    },
    dispatch
  );

const mapStateToProps = state => {
  return {
    userStore: state.userReducer,
    itemsStore: state.itemsReducer,
    logs: state.logReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
