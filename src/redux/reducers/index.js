import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import Common from './Common';
import Auth from './Auth';
import Departments from './Departments';
import Users from './Users';
import Subsidiaries from './Subsidiaries';
import Sections from './Sections';
import SubSections from './SubSections';
import RiskParams from './RiskParams';
import Roles from './Roles';
import Compliance from './Compliance';
import Utils from './Utils';
import RiskUniverse from './RiskUniverse';
import RiskOwners from './RiskOwners';
import RootCauses from './RootCauses';
import RiskIncident from './RiskIncident';
import RiskIndicator from './RiskIndicator';
import Dashboard from './Dashboard';

export default history =>
  combineReducers({
    router: connectRouter(history),
    common: Common,
    auth: Auth,
    subsidiaries: Subsidiaries,
    departments: Departments,
    sections: Sections,
    subSections: SubSections,
    users: Users,
    riskParams: RiskParams,
    roles: Roles,
    compliance: Compliance,
    incidents: RiskIncident,
    indicators: RiskIndicator,
    utils: Utils,
    riskUniverse: RiskUniverse,
    riskOwners: RiskOwners,
    rootCauses: RootCauses,
    universeDashboard: Dashboard,
  });
