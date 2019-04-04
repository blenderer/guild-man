import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import statOrder from '../../../data/statOrder';
import getStatModifier from '../../../helpers/getStatModifier';
import getCharacterSubtext from '../../../helpers/getCharacterSubtext';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
// import red from '@material-ui/core/colors/red';
import PersonAdd from '@material-ui/icons/PersonAdd';

const styles = theme => ({
  cardHeader: {
    // paddingBottom: 0
  },
  cardContent: {
    paddingTop: 0
  },
  stats: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'wrap'
  },
  stat: {
    fontSize: 13,
    flex: '1 1 33%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 4
  },
  statName: {
    textTransform: 'uppercase'
  },
  traits: {
    paddingLeft: 21,
    marginBottom: 16
  }
});

class RecruitCard extends Component {
  static propTypes = {
    character: PropTypes.object.isRequired,
    onHire: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  render() {
    const { classes, className, character, onHire } = this.props;

    const traitList = character.traits ? Object.keys(character.traits) : [];

    return (
      <Card className={className || undefined}>
        <CardHeader
          className={classes.cardHeader}
          avatar={<Avatar aria-label="Recipe">{character.name[0]}</Avatar>}
          action={
            <IconButton onClick={onHire}>
              <PersonAdd />
            </IconButton>
          }
          title={character.name}
          subheader={getCharacterSubtext(character)}
        />
        {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Contemplative Reptile"
        /> */}
        <CardContent className={classes.cardContent}>
          <p>Cost: {character.cost}g</p>
          <ul className={classes.traits}>
            {traitList.map(trait => (
              <li key={trait}>
                {trait}
              </li>
            ))}
          </ul>
          <ul className={classes.stats}>
            {statOrder.map(stat => (
              <li className={classes.stat} key={stat}>
                <span className={classes.statName}>{stat}</span>
                {character.stats[stat]} ({getStatModifier(
                  character.stats[stat]
                )})
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(RecruitCard);



