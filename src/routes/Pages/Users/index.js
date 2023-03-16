import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';

const UsersPage = ({ match }) => {
  const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route exact path={`${requestedUrl}/`} component={lazy(() => import('./ViewUsers'))} />
        <Route path={`${requestedUrl}/create-user`} component={lazy(() => import('./AddEditUser'))} />
        <Route path={`${requestedUrl}/update-user`} component={lazy(() => import('./AddEditUser'))} />
      </Switch>
    </Suspense>
  );
};

export default UsersPage;


        {/*<Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/view-users`} />*/}

