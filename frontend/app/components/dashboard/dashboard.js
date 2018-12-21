import React from 'react';
//import PropTypes from 'prop-types';
import style from './dashboard.scss';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ItemForm from '../item-form/item-form';
import SideBar from '../sidebar/sidebar';

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='BodyContainer'>
        <div className='SideBarContainer'>
          <SideBar />
        </div>
        <div className='DashboardContainer'>
          <ItemForm />
        </div>
      </div>
    );
  }
}

/*Home.propTypes = {
  title: PropTypes.string
};*/

export default Dashboard;
