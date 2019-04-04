import React from 'react';
import firebase from 'firebase/app';
import { withOptionalUser } from '../../Context/User';

import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

class Navigation extends React.Component {
  login = () => {
    firebase.auth().signInWithPopup(twitterAuthProvider);
  };
  logout = () => {
    firebase.auth().signOut();
  };

  renderAuthButtons = () => {
    const { user } = this.props;

    if (user) {
      return (
        <ListItem button onClick={this.logout}>
          <ListItemText primary="Logout" />
        </ListItem>
      );
    } else {
      return (
        <ListItem button onClick={this.login}>
          <ListItemText primary="Login" />
        </ListItem>
      );
    }
  };

  renderNavigation = () => {
    const { user } = this.props;

    return user ? (
      <React.Fragment>
        <List component="nav">
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Guild" />
          </ListItem>
          <ListItem button component={Link} to="/tavern">
            <ListItemIcon>
              <LocalDrinkIcon />
            </ListItemIcon>
            <ListItemText primary="Tavern" />
          </ListItem>
        </List>
        <Divider />
      </React.Fragment>
    ) : null;
  };

  render() {
    const { user } = this.props;

    return (
      <React.Fragment>
        {this.renderNavigation()}
        {user &&
          user.superAdmin && (
            <React.Fragment>
              <List component="nav">
                <ListItem button component={Link} to="/admin">
                  <ListItemIcon>
                    <VpnKeyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admin" />
                </ListItem>
              </List>
              <Divider />
            </React.Fragment>
          )}
        <List component="nav">
          <ListItem button component="a" href="https://twitter.com/Blenderer">
            <ListItemText primary="@Blenderer" secondary="Twitter" />
          </ListItem>
          {this.renderAuthButtons()}
        </List>
      </React.Fragment>
    );
  }
}

export default withOptionalUser(Navigation);



