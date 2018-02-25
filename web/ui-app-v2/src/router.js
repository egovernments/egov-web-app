import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './screens/Login';
import OTP from './screens/OTP';

const Main = () => {
  return (
    <main style={{ marginTop: '50px' }}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/otp" component={OTP} />
      </Switch>
    </main>
  );
};

export default Main;
