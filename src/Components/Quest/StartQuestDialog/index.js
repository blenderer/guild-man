import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import withApiAndUser from '../../../Context/withApiAndUser';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// import _get from 'lodash/get';

const styles = theme => ({

});

const initialiState = {
  slide: 'characters',
  selectedCharacters: {},
  open: false
};

class StartQuestDialog extends Component {
  static propTypes = {
    quest: PropTypes.object.isRequired
  };

  state = {
    ...initialiState
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ ...initialiState });
  };

  render() {
    const {
      user,
      quest
    } = this.props;

    console.log(user)

    // const availableQuests = _get(user, 'quests.available');

    return (
      <React.Fragment>
        <Button onClick={this.handleClickOpen}>Go</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{quest.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please choose {quest.minHeroes}-{quest.maxHeroes} heroes to send
            </DialogContentText>
            <ul>
              <li>Ed</li>
              <li>Mike</li>
              <li>Sarah</li>
              <li>Timmy</li>
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Send off
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const StyledStartQuestDialog = withStyles(styles)(StartQuestDialog);

export default withApiAndUser(StyledStartQuestDialog);



