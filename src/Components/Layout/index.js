import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withOptionalUser } from '../../Context/User';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';

import Drawer from './Drawer';

const drawerWidth = 250;

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  flex: {
    flexGrow: 1
  },
  page: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  list: {
    width: drawerWidth
  },
  fullList: {
    width: 'auto'
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  lowerHalf: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  pageContent: {
    overflow: 'hidden',
    display: 'flex',
    flex: '1 1 auto'
  },
  toolbar: {
    display: 'flex'
  }
});

class Layout extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
  };

  state = {
    drawerOpen: false
  };

  toggleDrawer = () => {
    this.setState(prevState => ({
      drawerOpen: !prevState.drawerOpen
    }));
  };

  render() {
    const { classes, children, user } = this.props;
    const { drawerOpen } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar classes={{ root: classes.toolbar }}>
            <Hidden mdUp>
              <IconButton
                onClick={this.toggleDrawer}
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography variant="title" color="inherit">
              Guild Man
            </Typography>
            <div className={classes.flex} />
            {user && (
              <Typography variant="title" color="inherit">
                Gold: {user.gold}
              </Typography>
            )}
          </Toolbar>
        </AppBar>
        <div className={classes.lowerHalf}>
          <Drawer onToggle={this.toggleDrawer} open={drawerOpen} />
          <div className={classes.page}>
            <div className={classes.pageContent}>{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withOptionalUser(withStyles(styles)(Layout));



