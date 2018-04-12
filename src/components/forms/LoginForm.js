import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';


import SnackBarMessage from '../common/SnackBarMessage';

const styles = theme => ({
  card: {
    width: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '150px'
  },
  textField: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%'
  }
});

class LoginForm extends Component{
  state = {
    data: {},
    loading: false,
    errors: {},
    showErrors: false
  }

  onChange = (e) => {
    this.setState({
        data: {
          ...this.state.data,
          [e.target.name]: e.target.value
        }
    })
  }


  onSubmit = (e) => {
    e.preventDefault();
    this.props.submit(this.state.data).then(() => {
      let error = {};
      this.setState({ errors: error });
    }).catch((err) => {
      let statusCode = err.response.status;
      switch (statusCode) {
        case 403:
          let error = { global: "Invalid username and password." };
          this.setState({ errors: error, showErrors: true });
          break;
        default:
          break;
      }
    });
  }

  handleDismissMessage = () => {
    this.setState({ showErrors: false });
  }

  render(){
    const { classes } = this.props;
    const { data, errors, loading } = this.state;
    return (
      <div>
        <SnackBarMessage
          open={ this.state.showErrors }
          handleClose={ this.handleDismissMessage }
          message={ this.state.errors.global }
          />
        <Card className={classes.card}>
          <CardContent>
            <TextField
               id="username_field"
               label="Username"
               name="username"
               placeholder="Username"
               className={classes.textField}
               margin="normal"
               onChange={ this.onChange }
             />

             <TextField
                id="password"
                label="Password"
                className={classes.textField}
                name="password"
                type="password"
                autoComplete="current-password"
                margin="normal"
                onChange={ this.onChange }
            />
          </CardContent>
          <CardActions>
            <Button raised color="primary" className={ classes.button } onClick={ this.onSubmit }>
              Sign In
            </Button>
            <Button raised color="secondary" className={ classes.button } onClick={ this.props.signup }>
              Sign Up
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}


LoginForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  classes: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired
};
export default withStyles(styles)(LoginForm);
