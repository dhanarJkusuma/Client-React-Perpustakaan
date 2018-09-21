import React, { Component } from 'react';
import StaticNavbar from '../common/StaticNavbar';
import SignupForm from '../forms/SignupForm';
import { signup } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkToken } from '../../actions/auth';

class SignupPage extends Component{
  state = {}

  onSignup = (data) => this.props.signup(data).then(() => this.props.history.push('/dashboard/watch'));

  componentWillMount = () => {
    //this.checkToken();
  }


  redirectToSignIn = () => {
    this.props.history.push('/signin');
  }

  checkToken = () => {
      var token = localStorage.getItem('eLibraToken');
      if(typeof token !== 'undefined' && token !== null){
        // checkToken
        this.props.checkToken(token).then(res => {
          // success
          this.props.history.push('/dashboard/watch');
        }).catch(err => {
          // forbidden
          // do nothing
        })
      }
    }


  render(){
    return (
      <div>
        <StaticNavbar title="E-Libra | Sign Up Page" />

        <SignupForm submit={ this.onSignup } signin={ this.redirectToSignIn } />
      </div>
    );
  }
}

SignupPage.propType = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
}

export default connect(null, { signup, checkToken })(SignupPage);
