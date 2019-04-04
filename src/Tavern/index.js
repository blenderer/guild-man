import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Page from '../Components/Layout/Page';
import Quests from './Quests';
import Recruits from './Recruits';

const styles = theme => ({
  root: {
    // flexGrow: 1
  }
});

class Tavern extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <Page title="Tavern">
        <Tabs value={value} onChange={this.handleChange}>
          <Tab label="Quest Board" />
          <Tab label="Recruits" />
        </Tabs>
        {value === 0 && (
          <Quests />
        )}
        {value === 1 && (
          <Recruits />
        )}
      </Page>
    );
  }
}

export default withStyles(styles)(Tavern);



