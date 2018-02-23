import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';

const Main = () => {
  return (
    <main style={{ marginTop: '50px' }}>
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </main>
  );
};

export default Main;
