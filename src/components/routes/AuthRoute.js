import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({component: Component, authed, ...rest}) =>
  (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/signin', state: {from: props.location}}} />}
    />
  )
export default AuthRoute;
