import React, { Component } from 'react';
import StaticNavbar from '../common/StaticNavbar';
import LoginForm from '../forms/LoginForm';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkToken } from '../../actions/auth';

class LoginPage extends Component{
  state = {}

  onLogin = (data) => this.props.login(data).then(() => this.props.history.push('/dashboard/watch'));

  componentWillMount = () => {
    this.checkToken();
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

    redirectSignUp = () => {
      this.props.history.push('/signup');
    }


  render(){
    return (
      <div>
        <StaticNavbar title="Library Information System | Sign In Page" />

        <LoginForm submit={ this.onLogin } signup={ this.redirectSignUp } />
      </div>
    );
  }
}

LoginPage.propType = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
}

export default connect(null, { login, checkToken })(LoginPage);
