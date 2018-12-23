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
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { userActions } from '../../actions';
import { API_URL } from '../../app.config';

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

const initialState = {
  loggedIn: false,
  accessToken: null,
  googleId: null,
  email: null,
  profileObj: {}
};

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.state = initialState;
  }

  responseGoogle = response => {
    if (response && response.accessToken && response.accessToken != '') {
      this.setState({
        loggedIn: true,
        accessToken: response.accessToken,
        tokenId: response.tokenId,
        googleId: response.googleId,
        email: response.profileObj.email,
        profileObj: response.profileObj
      });

      const user = {
        access_token: response.accessToken,
        token_id: response.tokenId,
        google_id: response.googleId,
        email: response.profileObj.email
      };

      //this.props.history.push('/dashboard');

      const { dispatch } = this.props;
      dispatch(userActions.register(user));
    }
  };

  logout = some => {
    this.setState(initialState);
    const data = this.state;
    this.props.dispatch({
      type: 'USER_LOGOUT',
      data
    });
  };

  render() {
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
            <a href={`${API_URL}/auth/google`}>LOGIN WITH GOOGLE</a>
          </CardActions>
        </Card>
      </form>
    );
  }
}

RegistrationForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    app: state.appReducer
  };
};

const styledComponent = withStyles(styles)(RegistrationForm);
const routedComponent = withRouter(styledComponent);

export default connect(mapStateToProps)(routedComponent);
