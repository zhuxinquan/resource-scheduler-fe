import React from 'react';
import { Route, Router } from 'dva/router';
import BasicLayout from './components/layout/BasicLayout'

// const { ConnectedRouter } = routerRedux;

function RouterConfig({ history }) {
  return (
    <Router history={history}>
        <Route path="/" component={BasicLayout} />
    </Router>
  );
}

export default RouterConfig;
