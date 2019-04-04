import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import withApiAndUser from '../../Context/withApiAndUser';

import RecruitCard from './Recruit/Card';

import _get from 'lodash/get';

const styles = theme => ({
  recruitList: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    flexFlow: 'wrap'
  },
  recruitCard: {
    width: 300,
    marginBottom: 16,
    marginRight: 16
  }
});

class Recruits extends Component {

  recruit = character => {
    const { api } = this.props;

    api.fetch(
      'recruit',
      { method: 'POST' },
      {
        id: character
      }
    );
  };

  render() {
    const { user, classes } = this.props;
    const availableCharacters = _get(user, 'characters.available');

    return (
      <React.Fragment>
        <h4>Available Recruits</h4>
        <ul className={classes.recruitList}>
          {availableCharacters &&
            Object.keys(availableCharacters).map(character => {
              const characterData = availableCharacters[character];
              return (
                <li className={classes.recruitCard} key={character}>
                  <RecruitCard
                    character={characterData}
                    onHire={() => {
                      this.recruit(character);
                    }}
                  />
                </li>
              );
            })}
        </ul>
      </React.Fragment>
    );
  }
}

const StyledRecruits = withStyles(styles)(Recruits);

export default withApiAndUser(StyledRecruits);



