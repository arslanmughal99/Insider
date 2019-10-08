import { Switch, Route } from 'react-router';
import React from 'react';
import Home from './components/Home';
import Settings from './components/settings/Settings';
import App from './containers/App';

export default () => (
  <App>
    <Switch>
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/" component={Home} />
    </Switch>
  </App>
);
