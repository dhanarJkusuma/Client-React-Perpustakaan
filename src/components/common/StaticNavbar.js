import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';

const styles = {
  root: {
    width: '100%',
  },
};
const StaticNavbar  = (props) => (
  <div className={ props.classes.root }>
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography type="title" color="inherit">
          { props.title }
        </Typography>
        <Typography type="caption" color="inherit">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "V0.0.1 Alfa" }
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

StaticNavbar.protoType = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticNavbar);
