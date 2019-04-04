import React, { Component } from 'react';
import _get from 'lodash/get';
import { withUser } from '../../Context/User';
import getCharacterSubtext from '../../helpers/getCharacterSubtext';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

class Heroes extends Component {

  sortCharacters = (a, b) => {
    const aChar = a[1];
    const bChar = b[1];

    if (aChar.level === bChar.level) {
      // console.log(aChar, bChar);
    }

    return bChar.level > aChar.level;
  }

  render() {
    const { user } = this.props;

    const characters = Object.entries({
      ..._get(user, 'characters.active', {}),
      ..._get(user, 'characters.standBy', {})
    }).sort(this.sortCharacters);

    return (
      <List>
        {characters.map(([name, character]) => (
          <ListItem key={name}>
            <Avatar>
              <ImageIcon />
            </Avatar>
            <ListItemText primary={name} secondary={getCharacterSubtext(character)} />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default withUser(Heroes);



