import React, { Component } from 'react';
import { withUser } from '../Context/User';
import Page from '../Components/Layout/Page';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Heroes from './Heroes';

class Guild extends Component {

  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { user } = this.props;
    const { value } = this.state;

    return (
      <Page title="Guild">
        <ul>
          <li>Gold: {user.gold}</li>
          <li>
            Items:
            <ul>
              {user.items &&
                Object.keys(user.items).map(item => (
                  <li key={item}>
                    {item} x{user.items[item]}
                  </li>
                ))}
            </ul>
          </li>
        </ul>
        <Tabs value={value} onChange={this.handleChange}>
          <Tab label="Quests" />
          <Tab label="Heroes" />
        </Tabs>
        {value === 0 && (
          <span>Quests</span>
        )}
        {value === 1 && (
          <Heroes/>
        )}
      </Page>
    );
  }
}

export default withUser(Guild);



