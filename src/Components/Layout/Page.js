import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    padding: '0 16px',
    flex: '1 1 auto',
    overflow: 'scroll'
  }
};

class Page extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.node
  };

  render() {
    const { title, children, classes } = this.props;

    return (
      <div className={classes.root}>
        {title ? <h2>{title}</h2>: null}
        {children}
      </div>
    );
  }
}

export default withStyles(styles)(Page)



