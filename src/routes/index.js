import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Error404 from './Pages/404';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ForgotPasswordPage from './Auth/ForgotPassword';
import Dashboards from './Pages/Dashboard';
import Departments from './Pages/Organization/Departments';
import Subsidiaries from './Pages/Organization/Subsidiaries';
import Sections from './Pages/Organization/Sections';
import SubSections from './Pages/Organization/SubSections';
import UsersPage from './Pages/Users';
import Roles from './Pages/Roles';
import RiskParams from './Pages/RiskManagement/RiskParams';
import RiskUniverse from './Pages/RiskManagement/RiskUniverse';
import CreateRisk from './Pages/RiskManagement/RiskUniverse/CreateRisk';
import RiskIncident from './Pages/RiskManagement/RiskIncident';
import CreateIncident from './Pages/RiskManagement/RiskIncident/CreateIncident';
import KeyRiskIndicators from './Pages/RiskManagement/KeyRiskIndicators';
import RiskAssessment from './Pages/RiskManagement/RiskAssessment';
import ComplianceModule from './Pages/ComplianceModule';
import { PERMISSIONS } from '../@jumbo/constants/RolesConstants';
import Error403 from './Pages/403';
import RoleBasedGuard from '../@jumbo/hocs/RoleAuth';
import RiskApprovals from './Pages/RiskManagement/RiskUniverse/RiskApprovals';
import AssessRiskUniverse from './Pages/RiskManagement/RiskUniverse/AssessRiskUniverse';
import DashboardReport from './Pages/Dashboard/DashboardReports/Risk';
import Risks from './Pages/Dashboard/DashboardReports/Risk/Risks';
import UpcomingActions from './Pages/Dashboard/DashboardReports/Risk/UpcomingActions';
import ComplianceDashboard from './Pages/Dashboard/DashboardReports/Compliance';
import RiskIndicators from './Pages/Dashboard/DashboardReports/Risk/RiskIndicators';
import EnterpriseHistory from './Pages/ComplianceModule/EnterpriseCompliance/EnterpriseHistory';
import RiskIndicatorHistory from './Pages/RiskManagement/KeyRiskIndicators/RiskIndicatorHistory';

const RestrictedRoute = ({ component: Component, permission, ...rest }) => {
  const { authUser } = useSelector(({ auth }) => auth);
  const onRender = props => {
    if (authUser !== null) {
      return (
        <RoleBasedGuard permission={permission} page={true}>
          <Component {...props} />
        </RoleBasedGuard>
      );
    }
    return (
      <Redirect
        to={{
          pathname: '/signin',
          state: { from: props.location },
        }}
      />
    );
  };

  return <Route {...rest} render={onRender} />;
};

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();

  if (location.pathname === '' || location.pathname === '/') {
    return <Redirect to={'/dashboard'} />;
  } else if (
    authUser &&
    (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forgot-password')
  ) {
    return <Redirect to={'/dashboard'} />;
  }

  return (
    <React.Fragment>
      <Switch>
        <RestrictedRoute path="/dashboard" component={Dashboards} permission={PERMISSIONS.DASHBOARD.ACCESS} />
        <RestrictedRoute path="/departments" component={Departments} permission={PERMISSIONS.DEPARTMENT.ACCESS} />
        <RestrictedRoute path="/subsidiaries" component={Subsidiaries} permission={PERMISSIONS.SUBSIDIARY.ACCESS} />
        <RestrictedRoute path="/sections" component={Sections} permission={PERMISSIONS.SECTION.ACCESS} />
        <RestrictedRoute path="/sub-sections" component={SubSections} permission={PERMISSIONS.SUB_SECTION.ACCESS} />
        <RestrictedRoute path="/users" component={UsersPage} permission={PERMISSIONS.USER.ACCESS} />
        <RestrictedRoute path="/roles" component={Roles} permission={PERMISSIONS.ROLE.ACCESS} />
        <RestrictedRoute path="/risk-params" component={RiskParams} permission={PERMISSIONS.RISK_PARAM.ACCESS} />
        {/* <RestrictedRoute path="/dashboard-report" component={DashboardReport} permission={PERMISSIONS.RISK_PARAM.ACCESS} />
        <RestrictedRoute path="/dashboard-report-risks" component={Risks} permission={PERMISSIONS.RISK_PARAM.ACCESS} />
        <RestrictedRoute path="/dashboard-report-compliance" component={ComplianceDashboard} permission={PERMISSIONS.RISK_PARAM.ACCESS} />
        <RestrictedRoute path="/dashboard-report-risk-indicators" component={RiskIndicators} permission={PERMISSIONS.RISK_PARAM.ACCESS} /> */}
        {/* <RestrictedRoute
          path="/dashboard-report-actions"
          component={UpcomingActions}
          permission={PERMISSIONS.RISK_PARAM.ACCESS}
        /> */}
        <RestrictedRoute
          path="/risk-universe"
          exact
          component={RiskUniverse}
          permission={PERMISSIONS.RISK_UNIVERSE.ACCESS}
        />
        <RestrictedRoute
          path="/enterprise-compliance/history"
          exact
          component={EnterpriseHistory}
          permission={PERMISSIONS.ENTERPRISE_COMPLIANCE.ACCESS}
        />
        <RestrictedRoute
          path="/risk-universe/create-risk"
          component={CreateRisk}
          permission={PERMISSIONS.RISK_UNIVERSE.ACCESS}
        />
        <RestrictedRoute
          path="/risk-universe/update-risk"
          component={CreateRisk}
          permission={PERMISSIONS.RISK_UNIVERSE.ACCESS}
        />
        <RestrictedRoute
          path="/risk-universe/assess-risk"
          component={AssessRiskUniverse}
          permission={PERMISSIONS.RISK_UNIVERSE.ACCESS}
        />
        <RestrictedRoute
          path="/risk-assessment"
          exact
          component={RiskAssessment}
          permission={PERMISSIONS.RISK_ASSESSMENT.ACCESS}
        />
        <RestrictedRoute
          path="/risk-incident"
          exact
          component={RiskIncident}
          permission={PERMISSIONS.RISK_INCIDENT.ACCESS}
        />
        <RestrictedRoute
          path="/risk-incident/create-incident"
          exact
          component={CreateIncident}
          permission={PERMISSIONS.RISK_INCIDENT.ACCESS}
        />
        <RestrictedRoute
          path="/risk-incident/update-incident"
          exact
          component={CreateIncident}
          permission={PERMISSIONS.RISK_INCIDENT.ACCESS}
        />
        <RestrictedRoute path="/compliance" component={ComplianceModule} permission={PERMISSIONS.LEGAL_COMPLIANCE.ACCESS} />
        <RestrictedRoute
          path="/risk-indicators"
          exact
          component={KeyRiskIndicators}
          permission={PERMISSIONS.RISK_UNIVERSE.ACCESS}
        />
        <RestrictedRoute
          path="/risk-indicators/history"
          exact
          component={RiskIndicatorHistory}
          permission={PERMISSIONS.RISK_UNIVERSE.ACCESS}
        />
        {/*<Route path="/sample-page" component={SamplePage} />*/}
        <Route path="/signin" component={Login} />

        <Route path="/signup" component={Register} />
        <Route path="/risk-approvals" component={RiskApprovals} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/not-found" component={Error404} />
        <Route path="/forbidden" component={Error403} />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
