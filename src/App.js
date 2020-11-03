import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import brown from '@material-ui/core/colors/brown';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import React, { Component } from 'react';
import Layout from './Components/Layout';
import ErrorToaster from './Components/ErrorToaster';

import Guild from './Guild';
import Tavern from './Tavern';
import Admin from './Admin';

import { ApiProvider } from './Context/Api';
import {
  UserProviderWithApi as UserProvider
} from './Context/User';

const theme = createMuiTheme({
  palette: {
    primary: brown
  }
});

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'guild-man.firebaseapp.com',
  databaseURL: 'https://guild-man.firebaseio.com',
  storageBucket: 'guild-man.appspot.com',
  messagingSenderId: '134513670784'
});

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <ApiProvider>
            <UserProvider>
              <Layout>

                  <Route exact path="/" component={Guild}/>
                  <Route exact path="/tavern/:tab?" component={Tavern}/>
                  <Route exact path="/admin" component={Admin}/>

                <ErrorToaster />
              </Layout>
            </UserProvider>
          </ApiProvider>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;



