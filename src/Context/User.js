import React, { Component } from 'react';
import firebase from 'firebase/app';
import { withApi } from './Api';

const { Provider, Consumer } = React.createContext(null);
export { Consumer };

class UserProvider extends Component {

  state = {
    user: null,
    characters: {},
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

          if (user.characters.available) {
            const charNames = Object.keys(user.characters.available)
            charNames.map(name => {
              firebase.database().ref(`/characters/${authUser.uid}~${name}`).on('value', async charSnap => {
                let char = charSnap.val();

                this.setState(prevState => ({
                  ...prevState,
                  characters: {
                    ...prevState.characters,
                    [char.name]: char,
                  }
                }));
              });
            });

            
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
    console.log(this.state.characters)
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



