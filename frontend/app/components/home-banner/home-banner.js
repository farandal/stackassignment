import React from 'react';
import style from './home-banner.scss';
import reactToggleStyles from 'react-toggle/style.css';
import PropTypes from 'prop-types';

import logo from '../../assets/images/logo_square.png';

import { withStyles } from '@material-ui/core/styles';

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

class HomeBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className='home-banner'>
        <div className='home-logo-container floating'>
          <img src={logo} />
        </div>
      </div>
    );
  }
}

HomeBanner.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeBanner);
