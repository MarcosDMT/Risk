import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const Organization = ({ match }) => {
  const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/*<Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/`} />*/}
        <Route path={`${requestedUrl}/`} component={lazy(() => import('./Departments'))} />
        <Route path={`${requestedUrl}/`} component={lazy(() => import('./Subsidiaries'))} />
      </Switch>
    </Suspense>
  );
};

export default Organization;
