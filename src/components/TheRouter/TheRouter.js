import React from 'react';
import { Switch, Route } from 'react-router-dom';
import appRoutes from './routes';
// import NotFoundPage from '../../pages/not-found-page';

const TheRouter = () => {
  const routes = appRoutes.map(({ path, Component }) => (
    <Route
      key={path}
      path={path}
      component={Component}
      exact
    />
  ));

  return (
    <Switch>
      {routes}
      {/* <Route component={NotFoundPage} /> */}
    </Switch>
  );
}

export default TheRouter;
