import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/User/Login';
import OTP from './screens/User/OTP';

const Main = () => {
  return (
    <main style={{ marginTop: '50px' }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/otp" component={OTP} />
      </Switch>
    </main>
  );
};

export default Main;
