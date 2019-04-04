import React, { Component } from 'react';
import firebase from 'firebase/app';
import { withApi } from './Api';

const { Provider, Consumer } = React.createContext(null);
export { Consumer };

class UserProvider extends Component {

  state = {
    user: null
  };

  componentDidMount () {
    const { api } = this.props;

    firebase.auth().onAuthStateChanged(async (authUser) => {
      if (authUser && authUser.uid) {

        const idToken = await firebase.auth().currentUser.getIdToken(true);

        api.setAuthToken(idToken);

        firebase.database().ref(`/users/${authUser.uid}`).on('value', async snapshot => {
          let user = snapshot.val();

          if (!user) {
            user = await api.fetch('createUser', {method: 'POST'});
            api.fetch('refreshTavernQuests', {method: 'POST'});
            api.fetch('refreshTavernRecruits', {method: 'POST'});
          }

          this.setState(prevState => ({
            ...prevState,
            user: { ...user }
          }));

        });
      } else {
        this.setState(prevState => ({
          ...prevState,
          user: null
        }));
      }
    });
  }

  render() {
    return (
      <Provider value={this.state.user}>
        {this.props.children}
      </Provider>
    );
  }
}

export const withUser = Component => props => (
  <Consumer>
    {user => {
      if (!user) {
        return null;
      }

      return <Component {...props} user={user} />;
    }}
  </Consumer>
);

export const withOptionalUser = Component => props => (
  <Consumer>
    {user => {
      return <Component {...props} user={user} />;
    }}
  </Consumer>
);

export const UserProviderWithApi = withApi(UserProvider);



