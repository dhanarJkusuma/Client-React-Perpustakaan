import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';


import SnackBarMessage from '../common/SnackBarMessage';
import ErrorHandlerForm from '../../helpers/ErrorHandlerForm';

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
    showErrors: false,
    errorMessage: ""
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
    }, (err) => {
      let errorColl = {
        ...err.response.data.errors,
        global: err.response.data.message
      }
      this.setState({ errors: errorColl })
      this.setState({ showErrors: true });
    });
  }

  handleDismissMessage = () => {
    this.setState({ showErrors: false });
  }

  render(){
    const { classes } = this.props;
    const { errors } = this.state;
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
               error={ errors && typeof errors.username !== 'undefined' }
               helperText={ errors && typeof errors.username !== 'undefined' ? ErrorHandlerForm.collectErrorAttributeMessage(errors.username) : "" }
               
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
                error={ errors && typeof errors.password !== 'undefined' }
                helperText={ errors && typeof errors.password !== 'undefined' ? ErrorHandlerForm.collectErrorAttributeMessage(errors.password) : "" }
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
  classes: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired
};
export default withStyles(styles)(LoginForm);
