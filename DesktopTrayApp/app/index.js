import React, { Fragment } from 'react';
import { render } from 'react-dom';
// import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { grey, red } from '@material-ui/core/colors';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

const store = configureStore();
const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;
const customTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      paper: '#212121',
      default: '#212121'
    },
    primary: {
      dark: grey[900],
      light: grey[900],
      main: grey[900]
    },
    secondary: {
      main: red[500],
      light: red[300],
      dark: red[500]
    },
    error: {
      main: red[500]
    }
  }
});

render(
  <MuiThemeProvider theme={customTheme}>
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>
  </MuiThemeProvider>,
  document.getElementById('root')
);
