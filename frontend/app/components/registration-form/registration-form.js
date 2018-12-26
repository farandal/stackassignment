import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import style from './registration-form.scss';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { userActions } from '../../actions';
import { API_URL } from '../../app.config';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { history } from '../../helpers';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  input: {
    color: 'grey'
  },
  card: {
    width: '100%',
    minWidth: 400,
    margin: 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14,
    color: 'grey'
  }
});

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.loginBtnClick = this.loginBtnClick.bind(this);
    this.state = { loggedIn: false, user: {} };
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    var query = queryString.parse(location.search);
    if (query.token) {
      window.localStorage.setItem('jwt', query.token);
      dispatch(userActions.getUser());
      return;
    }
    if (window.localStorage.getItem('jwt')) {
      dispatch(userActions.getUser());
      return;
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.user.loggedIn) {
      history.push('/dashboard');
    }
    return state;
  }

  loginBtnClick = e => {
    window.location.href = `${API_URL}/auth/google`;
  };

  render = () => {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete='off'>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color='textPrimary'
              gutterBottom
            >
              Login with your Google Account
            </Typography>
          </CardContent>
          <CardActions>
            <div className='well' style={classes.well}>
              <Button
                color={'primary'}
                size={'large'}
                onClick={this.loginBtnClick}
                className={classes.button}
              >
                LOGIN WITH GOOGLE
              </Button>
            </div>
          </CardActions>
        </Card>
      </form>
    );
  };
}

RegistrationForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.userReducer
  };
};

const styledComponent = withStyles(styles)(RegistrationForm);
const routedComponent = withRouter(styledComponent);

export default connect(mapStateToProps)(routedComponent);
