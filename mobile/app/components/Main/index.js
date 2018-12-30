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
import { userActions, itemsActions } from '../../actions';
import { userService, itemsService } from '../../services';
import moment from 'moment';
import timezone from 'moment-timezone';
import { AsyncStorage } from 'react-native';
import config from '../../../app.config.js';

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

  componentDidMount() {
    console.log('GET ITEMS');
    this.props.getItems();
  }

  static getDerivedStateFromProps(props, state) {
    console.log(props);
    return state;
  }

  render = () => {
    const { loggedIn, user, token } = this.props.userStore;
    const { itemsStore } = this.props;
    return (
      <Page>
        <ScrollView>
          {itemsStore &&
            itemsStore.map((item, i) => (
              <Card key={i}>
                <View style={styles.card}>
                  <View style={styles.iconView}>
                    <Icon
                      name='calendar'
                      size={30}
                      color={config.colors.primary}
                    />
                  </View>
                  <View style={styles.contentView}>
                    <Text style={styles.titleText}>{item.summary}</Text>
                    <Text style={styles.bodyText}>{item.description}</Text>
                    <Text style={styles.bodyText}>
                      {moment(`${item.start.dateTime}`).calendar()}
                    </Text>
                  </View>
                  <View style={styles.buttonsView}>
                    <TouchableOpacity style={styles.button}>
                      <Icon name={'edit'} size={20} color='#ffffff' />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        this.props.navigation.navigate('Detail', {
                          itemId: item.id
                        });
                      }}
                    >
                      <Icon name={'eye'} size={20} color='#ffffff' />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            ))}
        </ScrollView>

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
  }
});

const getItems = itemsActions.getItems;

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getItems
    },
    dispatch
  );

const mapStateToProps = state => {
  return {
    userStore: state.userReducer,
    itemsStore: state.itemsReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
