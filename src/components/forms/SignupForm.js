import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import SnackBarMessage from '../common/SnackBarMessage';

const styles = theme => ({
  card: {
    width: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '150px',
    marginBottom: '60px',
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

class SignupForm extends Component{
  state = {
    data: {
      gender: "MALE"
    },
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
      console.log(err);
      let statusCode = err.response.status;
      let errorMessage = {
        global: err.response.message
      }
      this.setState({ errors: errorMessage });

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

            <TextField
               id="name_field"
               label="Nama"
               name="name"
               placeholder="Nama"
               className={classes.textField}
               margin="normal"
               onChange={ this.onChange }
             />

            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="controlled-open-select">gender</InputLabel>
                <Select
                  open={this.state.open}
                  onClose={this.handleClose}
                  onOpen={this.handleOpen}
                  value={this.state.data.gender}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'gender',
                    id: 'controlled-open-select',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="MALE">Laki-Laki</MenuItem>
                  <MenuItem value="FEMALE">Perempuan</MenuItem>
                </Select>
             </FormControl>

             <TextField
                id="phone_field"
                label="No. Telp"
                name="phone"
                placeholder="No. Telp"
                type="number"
                className={classes.textField}
                margin="normal"
                onChange={ this.onChange }
              />

              <TextField
                 id="address_field"
                 label="Alamat"
                 name="address"
                 placeholder="Alamat"
                 type="text"
                 className={classes.textField}
                 margin="normal"
                 onChange={ this.onChange }
               />

               <TextField
                  id="email_field"
                  label="Email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  className={classes.textField}
                  margin="normal"
                  onChange={ this.onChange }
                />

                <TextField
                   id="company_field"
                   label="Perusahaan"
                   name="company"
                   placeholder="Perusahaan"
                   type="text"
                   className={classes.textField}
                   margin="normal"
                   onChange={ this.onChange }
                 />

                 <TextField
                    id="employee_no_field"
                    label="No. Karyawan"
                    name="employeeNo"
                    placeholder="No. Karyawan"
                    type="text"
                    className={classes.textField}
                    margin="normal"
                    onChange={ this.onChange }
                  />

                  <TextField
                     id="work_unit_field"
                     label="Unit Pekerjaan"
                     name="workUnit"
                     placeholder="Unit Pekerjaan"
                     type="text"
                     className={classes.textField}
                     margin="normal"
                     onChange={ this.onChange }
                   />
          </CardContent>
          <CardActions>
            <Button raised color="primary" className={ classes.button } onClick={ this.onSubmit }>
              Sign Up
            </Button>
            <Button raised color="secondary" className={ classes.button } onClick={ this.props.signin }>
              Sign In
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}


SignupForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  classes: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  signin: PropTypes.func.isRequired
};
export default withStyles(styles)(SignupForm);
