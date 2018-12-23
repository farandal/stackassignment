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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import timezone from 'moment-timezone';
import { connect } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withRouter } from 'react-router-dom';
import { itemActions } from '../../actions';
import style from './item-list.scss';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [] //events array to store the events coming from the api call
    };
  }

  componentWillMount() {
    console.log('ItemList WillMount');
    //TODO
    //Make a call to the api, and set the results in the state
    //make sure the state holds the elements in a events array
    //consider to have a service to deal with the api requests, or use Redux Actions to achieve this
    const { dispatch } = this.props;
    this.props.dispatch(itemActions.getItems());
  }

  componentDidMount() {
    console.log('ItemList Mounted');
  }

  editItem = (e, id) => {
    e.preventDefault();
    console.log('Edit', id);
  };

  deleteItem = (e, delete_id) => {
    e.preventDefault();
    console.log('Delete', delete_id);
    this.props.dispatch(itemActions.deleteItem(delete_id));
    //this.props.dispatch(itemActions.getItems());
    //console.log(this.props.items);
  };

  render() {
    const { classes, items } = this.props;
    this.state.events = items;
    const { events } = this.state;

    return (
      <Grid container spacing={16}>
        {events &&
          events.map((item, i) => (
            <Grid key={i} item xs={3}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.title}>
                    {item.summary}
                  </Typography>
                  <Typography className={classes.content}>
                    <p>summary: {item.summary}</p>
                    <p>
                      created:
                      {moment(item.created).format('DD/MM/YYYY HH:mm')}
                    </p>
                    <p>
                      start:
                      {moment(item.start.dateTime).format('DD/MM/YYYY HH:mm')}
                    </p>
                    <p>
                      end:
                      {moment(item.end.dateTime).format('DD/MM/YYYY HH:mm')}
                    </p>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={e => this.editItem(e, item.id)}
                    color='primary'
                    type='submit'
                    aria-label='Edit'
                    className={classes.fab}
                  >
                    <EditIcon />
                  </Button>

                  <Button
                    onClick={e => this.deleteItem(e, item.id)}
                    color='primary'
                    type='submit'
                    aria-label='Delete'
                    className={classes.fab}
                  >
                    <DeleteIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  card: {
    width: '100%',
    height: '300px'
  },
  title: {
    fontSize: 16,
    color: 'balck'
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

ItemList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = store => {
  console.log('mapStateToProps', store);
  return {
    items: store.itemReducer,
    appReducer: store.appReducer
  };
};

const styledComponent = withStyles(styles)(ItemList);
const routedComponent = withRouter(styledComponent);
export default connect(mapStateToProps)(routedComponent);
