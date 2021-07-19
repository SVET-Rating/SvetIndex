import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import appRoutes from './routes';
import paths from './paths';
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
      <Redirect to={paths.INVESTMENTS} />
      {/* <Route component={NotFoundPage} /> */}
    </Switch>
  );
}

export default TheRouter;
