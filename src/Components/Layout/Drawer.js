import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import Navigation from './Navigation';

const drawerWidth = 250;

const styles = (theme) => ({
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  }
});

class AppDrawer extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
  };

  render() {
    const { classes, open, onToggle } = this.props;

    return (
      <React.Fragment>
        <Hidden smDown>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
            open
          >
            <Navigation />
          </Drawer>
        </Hidden>
        <Hidden mdUp>
          <SwipeableDrawer
            anchor="left"
            open={open}
            onClose={onToggle}
            onOpen={onToggle}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={onToggle}
              onKeyDown={onToggle}
            >
              <Toolbar>
                <Typography color="inherit" variant="title">
                  Guild Man
                </Typography>
              </Toolbar>
              <Navigation />
            </div>
          </SwipeableDrawer>
        </Hidden>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AppDrawer);



