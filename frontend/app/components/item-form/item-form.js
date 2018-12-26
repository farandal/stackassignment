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

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: '',
      location: '',
      description: '',
      start: moment()
        .add(2, 'hour')
        .format('YYYY-MM-DDTHH:mm'),
      end: moment()
        .add(4, 'hour')
        .format('YYYY-MM-DDTHH:mm')
    };

    console.log(props);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  submitItem = e => {
    e.preventDefault();
    const item = this.state;
    console.log('submit', item);
    this.props.dispatch(itemActions.createItem(item));
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.logs.type === 'LOG_SUCCESS' &&
      nextProps.logs.method === 'CREATE_ITEM'
    ) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillMount() {
    //GET THE CALENDAR ID
    console.log(
      'localStorage CalendarId',
      window.localStorage.getItem('calendarId')
    );

    if (window.localStorage.getItem('calendarId')) {
      return;
    }
    this.props.dispatch(itemActions.getCalendar());
  }

  componentDidMount() {
    console.log('Item Form Mounted');
    ValidatorForm.addValidationRule('notEmpty', value => {
      if (value !== '') {
        return true;
      }
      return false;
    });
  }

  render() {
    const { classes } = this.props;
    const { summary, location, description, start, end } = this.state;

    return (
      <Grid container spacing={16}>
        <ValidatorForm
          name='itemForm'
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
                Item Form
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
                    onChange={this.handleChange('summary')}
                    margin='normal'
                    value={summary}
                  />

                  <TextField
                    id='location'
                    name='location'
                    label='Location'
                    className={classNames(classes.textField, classes.spaced)}
                    InputProps={{
                      className: classes.input
                    }}
                    onChange={this.handleChange('location')}
                    margin='normal'
                    value={location}
                  />

                  <TextField
                    id='start'
                    name='start'
                    label='Start Date Time'
                    type='datetime-local'
                    className={classNames(classes.textField, classes.spaced)}
                    onChange={this.handleChange('start')}
                    InputLabelProps={{
                      shrink: true
                    }}
                    //defaultValue={start}
                    value={start}
                  />

                  <TextField
                    id='end'
                    name='end'
                    label='End Date Time'
                    type='datetime-local'
                    className={classNames(classes.textField, classes.spaced)}
                    onChange={this.handleChange('end')}
                    InputLabelProps={{
                      shrink: true
                    }}
                    //defaultValue={defaultEnd}
                    value={end}
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
                    onChange={this.handleChange('description')}
                    margin='normal'
                    value={description}
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

ItemForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = store => {
  return {
    items: store.itemReducer,
    completed: store.itemReducer.completed,
    logs: store.logReducer
  };
};

const styledComponent = withStyles(styles)(ItemForm);
const routedComponent = withRouter(styledComponent);
export default connect(mapStateToProps)(routedComponent);
