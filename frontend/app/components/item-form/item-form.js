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
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import style from './item-form.scss';
/*

id
summary
location
description
start
end

*/

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

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: '',
      location: '',
      description: '',
      start: '',
      end: ''
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);

    this.props.dispatch({
      type: 'ADD_POST',
      state
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
              color='textSecondary'
              gutterBottom
            >
              Item Form
            </Typography>
          </CardContent>
          <CardActions>
            <TextField
              id='summary'
              label='Summary'
              className={classes.textField}
              InputProps={{
                className: classes.input
              }}
              onChange={this.handleChange('summary')}
              margin='normal'
            />

            <TextField
              id='location'
              label='Location'
              className={classes.textField}
              InputProps={{
                className: classes.input
              }}
              onChange={this.handleChange('location')}
              margin='normal'
            />

            <TextField
              id='description'
              label='Description'
              className={classes.textField}
              InputProps={{
                className: classes.input
              }}
              onChange={this.handleChange('description')}
              margin='normal'
            />

            <TextField
              id='start'
              label='Start Date Time'
              type='datetime-local'
              className={classes.textField}
              onChange={this.handleChange('start')}
              InputLabelProps={{
                shrink: true
              }}
            />

            <TextField
              id='end'
              label='End Date Time'
              type='datetime-local'
              className={classes.textField}
              onChange={this.handleChange('end')}
              InputLabelProps={{
                shrink: true
              }}
            />
          </CardActions>
        </Card>
      </form>
    );
  }
}

ItemForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemForm);
