import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import {PERMISSIONS} from "../../../@jumbo/constants/RolesConstants";

const ComplianceModule = ({ match }) => {
  const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/legal-compliance`} />
        {/*<Route path={`${requestedUrl}/:name`} exact component={lazy(() => import('./Compliance'))} />*/}

        {
          //-------------------------- Legal Compliance --------------------------------
        }
        <Route
          path={`${requestedUrl}/legal-compliance`}
          permission={PERMISSIONS.LEGAL_COMPLIANCE}
          exact
          component={lazy(() => import('./LegalCompliance'))}
        />
        <Route
          path={`${requestedUrl}/legal-compliance/create`}
          exact
          component={lazy(() => import('./LegalCompliance/AddEditLegalCompliance'))}
        />
        <Route
          path={`${requestedUrl}/legal-compliance/update`}
          exact
          component={lazy(() => import('./LegalCompliance/AddEditLegalCompliance'))}
        />
        {
          //-------------------------- Enterprise Compliance --------------------------------
        }
        <Route
          path={`${requestedUrl}/enterprise-compliance`}
          exact
          component={lazy(() => import('./EnterpriseCompliance'))}
        />
        <Route
          path={`${requestedUrl}/enterprise-compliance/history`}
          exact
          component={lazy(() => import('./EnterpriseCompliance/EnterpriseHistory'))}
        />
        <Route
          path={`${requestedUrl}/enterprise-compliance/create`}
          exact
          component={lazy(() => import('./EnterpriseCompliance/AddEditEnterpriseCompliance'))}
        />
        <Route
          path={`${requestedUrl}/enterprise-compliance/update`}
          exact
          component={lazy(() => import('./EnterpriseCompliance/AddEditEnterpriseCompliance'))}
        />
        {
          //-------------------------- Statutory Compliance --------------------------------
        }
        <Route path={`${requestedUrl}/statutory-compliance`} exact component={lazy(() => import('./StatutoryCompliance'))} />
        <Route
          path={`${requestedUrl}/statutory-compliance/create`}
          exact
          component={lazy(() => import('./StatutoryCompliance/AddEditStatutoryCompliance'))}
        />
        <Route
          path={`${requestedUrl}/statutory-compliance/update`}
          exact
          component={lazy(() => import('./StatutoryCompliance/AddEditStatutoryCompliance'))}
        />
         <Route
          path={`${requestedUrl}/statutory-compliance/approvals`}
          exact
          component={lazy(() => import('./StatutoryCompliance/Approvals'))}
        />

        {/*<Route*/}
        {/*  path={`${requestedUrl}/:name/create`}*/}
        {/*  exact*/}
        {/*  component={lazy(() => import('./Compliance/AddEditCompliance'))}*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path={`${requestedUrl}/:name/update`}*/}
        {/*  exact*/}
        {/*  component={lazy(() => import('./Compliance/AddEditCompliance'))}*/}
        {/*/>*/}
      </Switch>
    </Suspense>
  );
};

export default ComplianceModule;
