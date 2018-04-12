import React, { Component } from 'react';
import StaticNavbar from './components/common/StaticNavbar';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import UserDashboard from './components/pages/UserDashboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" render={() => <Redirect to="/signin"/>}/>
          <Route path="/signin" component={ LoginPage }/>
          <Route path="/signup" component={ SignupPage } />
          <Route path="/dashboard" component={ UserDashboard }/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
