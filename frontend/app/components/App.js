import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import windowSize from 'react-window-size';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, lightGreen, green } from '@material-ui/core/colors';
import Home from './home/home';
import NavigationBar from './navigation-bar/navigation-bar';
import style from './App.scss';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: blue,
    secondary: lightGreen
  },
  status: {
    danger: 'orange'
  },
  root: {
    flexGrow: 1
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <div className='AppHeader'>
            <NavigationBar />
          </div>
          <div className='AppBody'>
            <Switch>
              <Route path='/' component={Home} exact />
            </Switch>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
