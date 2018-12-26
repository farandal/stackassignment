import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import timezone from 'moment-timezone';
import { connect } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withRouter } from 'react-router-dom';
import { itemActions } from '../../actions';
import style from './item-form.scss';

import LoadingOverlay from 'react-loading-overlay';
import LoaderSpinner from 'react-spinners/CircleLoader';

class EditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resource: {
        id: '',
        summary: '',
        location: '',
        description: '',
        start: moment()
          .add(2, 'hour')
          .format('YYYY-MM-DDTHH:mm:00'),
        end: moment()
          .add(4, 'hour')
          .format('YYYY-MM-DDTHH:mm:00')
      },
      loading: true
    };

    console.log(props);
  }

  handleChange = event => {
    this.setState({
      resource: {
        ...this.state.resource,
        [event.target.name]: event.target.value
      }
    });
  };

  submitItem = e => {
    e.preventDefault();
    this.setState({ loading: true });
    //const { resource } = this.state;
    this.props.dispatch(itemActions.updateItem(this.state.resource));
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.logs.type === 'LOG_SUCCESS' &&
      nextProps.logs.method === 'GET_ITEM'
    ) {
      this.setState({
        resource: {
          id: nextProps.logs.data.id,
          summary: nextProps.logs.data.summary,
          location: nextProps.logs.data.summary,
          description: nextProps.logs.data.description,
          start: moment(nextProps.logs.data.start.dateTime).format(
            'YYYY-MM-DDTHH:mm:00'
          ),
          end: moment(nextProps.logs.data.end.dateTime).format(
            'YYYY-MM-DDTHH:mm:00'
          )
        },
        loading: false
      });
    }

    if (
      nextProps.logs.type === 'LOG_SUCCESS' &&
      nextProps.logs.method === 'UPDATE_ITEM'
    ) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillMount() {
    //GET the event data from backend
    const { dispatch, match } = this.props;

    this.props.dispatch(itemActions.getItem(match.params.id));
    //GET THE CALENDAR ID
    console.log(
      'localStorage CalendarId',
      window.localStorage.getItem('calendarId')
    );

    if (window.localStorage.getItem('calendarId')) {
      return;
    }
    this.setState({ loading: true });
    this.props.dispatch(itemActions.getCalendar());
  }

  componentDidMount() {
    console.log('Edit Form Mounted');
    ValidatorForm.addValidationRule('notEmpty', value => {
      if (value !== '') {
        return true;
      }
      return false;
    });
  }

  render() {
    const { classes, match } = this.props;
    //const { summary, location, description, start, end } = this.state.resource;
    const { loading } = this.state;

    this.submitItem = this.submitItem.bind(this);
    this.handleChange = this.handleChange.bind(this);

    return (
      <LoadingOverlay
        active={loading}
        spinner={
          <LoaderSpinner
            size={150}
            sizeUnit={'px'}
            size={350}
            color={'#8dc147'}
          />
        }
        styles={{
          overlay: base => ({
            ...base,
            background: 'rgba(255, 255, 255, 0)'
          })
        }}
        text=''
      >
        <Grid container spacing={16}>
          <ValidatorForm
            name='editForm'
            ref='form'
            onSubmit={this.submitItem}
            onError={errors => console.log(errors)}
          >
            <Card className={classes.card}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color='textSecondary'
                  gutterBottom
                >
                  Edit Form
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container justify='center' spacing={24}>
                  <Grid item key='left' xs={6}>
                    <TextValidator
                      id='summary'
                      label='Summary'
                      name='summary'
                      validators={['notEmpty']}
                      errorMessages={['This field is required']}
                      className={classNames(classes.textField, classes.spaced)}
                      InputProps={{
                        className: classes.input
                      }}
                      onChange={this.handleChange}
                      margin='normal'
                      value={this.state.resource.summary}
                    />

                    <TextField
                      id='location'
                      name='location'
                      label='Location'
                      className={classNames(classes.textField, classes.spaced)}
                      InputProps={{
                        className: classes.input
                      }}
                      onChange={this.handleChange}
                      margin='normal'
                      value={this.state.resource.location}
                    />

                    <TextField
                      id='start'
                      name='start'
                      label='Start Date Time'
                      type='datetime-local'
                      className={classNames(classes.textField, classes.spaced)}
                      onChange={this.handleChange}
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={this.state.resource.start}
                    />

                    <TextField
                      id='end'
                      name='end'
                      label='End Date Time'
                      type='datetime-local'
                      className={classNames(classes.textField, classes.spaced)}
                      onChange={this.handleChange}
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={this.state.resource.end}
                    />
                  </Grid>
                  <Grid item key='right' xs={6}>
                    <TextField
                      name='description'
                      id='description'
                      label='Description'
                      className={classNames(classes.textField, classes.spaced)}
                      multiline
                      rowsMax='15'
                      InputProps={{
                        className: classes.input
                      }}
                      onChange={this.handleChange}
                      margin='normal'
                      value={this.state.resource.description}
                    />
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
            <Grid
              container
              alignContent='flex-end'
              justify='flex-end'
              spacing={24}
            >
              <Fab
                color='primary'
                type='submit'
                aria-label='Add'
                className={classes.fab}
              >
                <AddIcon />
              </Fab>
            </Grid>
          </ValidatorForm>
        </Grid>
      </LoadingOverlay>
    );
  }
}

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
  },
  spaced: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: '#8dc147',
    marginTop: '-30px'
  }
});

EditForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = store => {
  return {
    items: store.itemReducer,
    logs: store.logReducer
  };
};

const styledComponent = withStyles(styles)(EditForm);
const routedComponent = withRouter(styledComponent);
export default connect(mapStateToProps)(routedComponent);
