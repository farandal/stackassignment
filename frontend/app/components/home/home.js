import React from 'react';
import PropTypes from 'prop-types';
import style from './home.scss';

import { withStyles } from '@material-ui/core/styles';
import RegistrationForm from '../registration-form/registration-form';
import HomeBanner from '../home-banner/home-banner';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

//import Background from '../images/home_bg.jpg';

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='BodyContainer'>
        <div className='LeftContainer'>
          <HomeBanner />
        </div>
        <div className='RightContainer'>
          <RegistrationForm />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  title: PropTypes.string
};

export default Home;
