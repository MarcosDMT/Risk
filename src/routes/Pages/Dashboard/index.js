import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';

const Dashboards = ({ match }) => {
  const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/dashboard-report`} />
        <Route path={`${requestedUrl}/dashboard-report`} component={lazy(() => import('./DashboardReports/Risk'))} />
        <Route path={`${requestedUrl}/risk-universe`} component={lazy(() => import('./GeneralDashboard'))} />
        {/*<Route path={`${requestedUrl}/risk-assessment`} component={lazy(() => import('./AssessmentDashboard'))} />*/}
        {/*<Route path={`${requestedUrl}/risk-incidents`} component={lazy(() => import('./IncidentsDashboard'))} />*/}
        {/*<Route path={`${requestedUrl}/compliance`} component={lazy(() => import('./ComplianceDashboard'))} /> *!/*/}
      </Switch>
    </Suspense>
  );
};

export default Dashboards;
