import React, { Component } from 'react';
import { withApi } from './Context/Api';
import Page from './Components/Layout/Page';

class Admin extends Component {
  state = {
    path: '',
    value: ''
  };

  onChange = (e, field) => {
    e.persist();
    this.setState(prevState => ({
      ...prevState,
      [field]: e.target.value
    }));
  };

  handleSubmit = e => {
    const { path, value } = this.state;
    e.preventDefault();
    this.props.api.fetch(
      'quickUpdate',
      { method: 'POST' },
      { path, value: JSON.parse(value) }
    );
  };

  refreshRecruits = () => {
    this.props.api.fetch('refreshTavernRecruits', { method: 'POST' });
  };

  refresh = () => {
    this.props.api.fetch('refreshTavernQuests', { method: 'POST' });
  };

  resolve = () => {
    this.props.api.fetch('resolveQuests', {method: 'POST'});
  }

  render() {
    return (
      <Page title="Admin">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Submit a firebase data update</legend>
            <input
              value={this.state.path}
              onChange={e => {
                this.onChange(e, 'path');
              }}
              type="text"
              placeholder="path"
            />
            <br />
            <textarea
              value={this.state.value}
              onChange={e => {
                this.onChange(e, 'value');
              }}
              placeholder="value"
              name="value"
              cols="30"
              rows="10"
            />
            <br />
            <input value="Mash that Submit button" type="submit" />
          </fieldset>
        </form>
        <br/>
        <button onClick={this.resolve}>Resolve Quests</button>
        <br/>
        <button onClick={this.refresh}>Refresh Quests</button>
        <br/>
        <button onClick={this.refreshRecruits}>Refresh Recruits</button>
      </Page>
    );
  }
}

export default withApi(Admin);