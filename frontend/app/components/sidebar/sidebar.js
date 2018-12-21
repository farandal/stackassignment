import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo_square.png';
import { withStyles } from '@material-ui/core/styles';
import style from './sidebar.scss';

const styles = theme => ({
  root: {
    color: theme.palette.text.primary
  },
  icon: {
    margin: 0,
    fontSize: 16,
    color: '#ffffff'
  }
});

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className='side-bar'>
        <div className='sidebar-logo-container floating'>
          <img src={logo} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);
