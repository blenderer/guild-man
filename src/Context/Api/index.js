import React, { Component } from 'react';
import Api from './service';
const api = new Api();

const { Provider, Consumer } = React.createContext(api);
export { Consumer };

export class ApiProvider extends Component {

  render() {
    return (
      <Provider value={api}>
        {this.props.children}
      </Provider>
    );
  }
}

export const withApi = Component => props => (
  <Consumer>
    {api => {
      if (!api) {
        return null;
      }

      return <Component {...props} api={api} />;
    }}
  </Consumer>
);

export default ApiProvider;



