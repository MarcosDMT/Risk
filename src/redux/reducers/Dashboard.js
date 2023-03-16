import { UNIVERSEDASHBOARD } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  dashboardData: [],
  complianceSummary: null,
  riskSummary: null,
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UNIVERSEDASHBOARD.GET_UNIVERSE_DATA: {
      return {
        ...state,
        dashboardData: action.payload,
      };
    }
    case UNIVERSEDASHBOARD.GET_RISK_SUMMARY: {
      return {
        ...state,
        riskSummary: action.payload,
      };
    }
    case UNIVERSEDASHBOARD.GET_COMPLIANCE_SUMMARY: {
      return {
        ...state,
        complianceSummary: action.payload,
      };
    }
    default:
      return state;
  }
};
