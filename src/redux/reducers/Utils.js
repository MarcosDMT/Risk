import { UTILS } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  riskFrequencies: [],
  complianceFrequencies: [],
  countries: [],
  cities: [],
  currencies: [],
  priorities: [],
  appetiteTypes: [],
  caseTypes: [],
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UTILS.GET_APPETITE_TYPES: {
      return {
        ...state,
        appetiteTypes: action.payload,
      };
    }
    case UTILS.GET_RISK_FREQUENCIES: {
      return {
        ...state,
        riskFrequencies: action.payload,
      };
    }
    case UTILS.GET_CASE_TYPES: {
      return {
        ...state,
        caseTypes: action.payload,
      };
    }
    case UTILS.GET_COMPLIANCE_FREQUENCIES: {
      return {
        ...state,
        complianceFrequencies: action.payload,
      };
    }
    case UTILS.GET_CURRENCIES: {
      return {
        ...state,
        currencies: action.payload,
      };
    }
    case UTILS.GET_COUNTRIES: {
      return {
        ...state,
        countries: action.payload,
      };
    }
    case UTILS.GET_CITIES: {
      return {
        ...state,
        cities: action.payload,
      };
    }
    case UTILS.GET_COMPLIANCE_PRIORITIES: {
      return {
        ...state,
        priorities: action.payload,
      };
    }
    default:
      return state;
  }
};
