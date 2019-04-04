import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import withApiAndUser from '../Context/withApiAndUser';
import StartQuestDialog from '../Components/Quest/StartQuestDialog';

import _get from 'lodash/get';

const styles = theme => ({

});

class Quests extends Component {

  startQuest = quest => {
    const { api, user } = this.props;
    const availableCharacters = _get(user, 'characters.available');

    api.fetch(
      'startQuest',
      { method: 'POST' },
      {
        id: quest,
        characters: availableCharacters
      }
    );
  };

  render() {
    const { user } = this.props;

    const availableQuests = _get(user, 'quests.available');
    const activeQuests = _get(user, 'quests.active');
    // const availableCharacters = _get(user, 'characters.available');

    return (
      <React.Fragment>
        <h4>Available Quests</h4>
        <ul>
          {availableQuests &&
            Object.keys(availableQuests).map(quest => (
              <li key={quest}>
                {quest}&nbsp;
                <StartQuestDialog quest={availableQuests[quest]} />
                {/* <button onClick={e => this.startQuest(quest)}>
                  Accept + Start
                </button> */}
              </li>
            ))}
        </ul>
        <h4>Active Quests</h4>
        <ul>
          {activeQuests &&
            Object.keys(activeQuests).map(quest => (
              <li key={quest}>
                {quest}&nbsp;
                <button onClick={e => {}}>Call Back</button>
              </li>
            ))}
        </ul>
      </React.Fragment>
    );
  }
}

const StyledQuests = withStyles(styles)(Quests);

export default withApiAndUser(StyledQuests);



