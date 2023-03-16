import { COMPLIANCE } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  legalComplianceData: [],

  //Statutory Compliance
  selectedStatutory: null,
  statutoryComplianceData: [],
  statutoryComplianceSub: [],
  subStatutoryComplianceData: [],
  mainStatutoryComplianceData: [],
  approvedStatutoryCompliance: [],
  compliedStatutoryCompliance: [],

  //Enterprise Compliance
  selectedEnterprise:null,
  enterpriseComplianceData: [],
  subEnterpriseComplianceData: [],
  mainEnterpriseComplianceData: [],
  approvedEnterpriseCompliance: [],
  compliedEnterpriseCompliance: [],

};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    //------------------LEGAL COMPLIANCE --------------------//
    case COMPLIANCE.LEGAL.GET_ALL: {
      return {
        ...state,
        legalComplianceData: action.payload,
      };
    }
    case COMPLIANCE.LEGAL.ADD_ONE: {
      return {
        ...state,
        legalComplianceData: state.legalComplianceData.concat(action.payload),
      };
    }
    case COMPLIANCE.LEGAL.UPDATE_ONE: {
      return {
        ...state,
        legalComplianceData: state.legalComplianceData.map(legal =>
          legal.id === action.payload.id ? action.payload : legal,
        ),
      };
    }
    case COMPLIANCE.LEGAL.DELETE_ONE: {
      return {
        ...state,
        legalComplianceData: state.legalComplianceData.filter(legal => legal.id !== action.payload),
      };
    }
    case COMPLIANCE.LEGAL.APPROVE_ONE: {
      return {
        ...state,
        legalComplianceData: state.statutoryComplianceData.filter(legal => legal.id !== action.payload),
      };
    }

    //------------------ENTERPRISE COMPLIANCE --------------------//
    case COMPLIANCE.ENTERPRISE.GET_ALL: {
      return {
        ...state,
        enterpriseComplianceData: action.payload,
      };
    }
    case COMPLIANCE.ENTERPRISE.GET_SELECTED: {
      return {
        ...state,
        selectedEnterprise: action.payload,
      };
    }
    case COMPLIANCE.ENTERPRISE.GET_MAIN: {
      return {
        ...state,
        mainEnterpriseComplianceData: action.payload,
      };
    }
    case COMPLIANCE.ENTERPRISE.GET_APPROVAL: {
      return {
        ...state,
        approvedEnterpriseCompliance: action.payload,
      };
    }
    case COMPLIANCE.ENTERPRISE.GET_COMPLIANT: {
      return {
        ...state,
        compliedEnterpriseCompliance: action.payload,
      };
    }
    case COMPLIANCE.ENTERPRISE.GET_SUB: {
      return {
        ...state,
        subEnterpriseComplianceData: action.payload,
      };
    }
    case COMPLIANCE.ENTERPRISE.ADD_ONE: {
      return {
        ...state,
        enterpriseComplianceData: state.enterpriseComplianceData.concat(action.payload),
      };
    }
    case COMPLIANCE.ENTERPRISE.UPDATE_ONE: {
      return {
        ...state,
        enterpriseComplianceData: state.enterpriseComplianceData.map(enterprise =>
          enterprise.id === action.payload.id ? action.payload : enterprise,
        ),
      };
    }
    case COMPLIANCE.ENTERPRISE.DELETE_ONE: {
      return {
        ...state,
        enterpriseComplianceData: state.enterpriseComplianceData.filter(enterprise => enterprise.id !== action.payload),
      };
    }

    //------------------STATUTORY COMPLIANCE --------------------//
    case COMPLIANCE.STATUTORY.GET_ALL: {
      return {
        ...state,
        statutoryComplianceData: action.payload,
      };
    }
    case COMPLIANCE.STATUTORY.GET_SELECTED: {
      return {
        ...state,
        selectedStatutory: action.payload,
      };
    }
    case COMPLIANCE.STATUTORY.GET_MAIN: {
      return {
        ...state,
        mainStatutoryComplianceData: action.payload,
      };
    }
    case COMPLIANCE.STATUTORY.GET_APPROVAL: {
      return {
        ...state,
        approvedStatutoryCompliance: action.payload,
      };
    }
    case COMPLIANCE.STATUTORY.GET_COMPLIANT: {
      return {
        ...state,
        compliedStatutoryCompliance: action.payload,
      };
    }
    case COMPLIANCE.STATUTORY.GET_SUB: {
      return {
        ...state,
        subStatutoryComplianceData: action.payload,
      };
    }
    case COMPLIANCE.STATUTORY.GET_COMPLIANCES: {
      return {
        ...state,
        statutoryCompliances: action.payload,
      };
    }
    
    case COMPLIANCE.STATUTORY.ADD_ONE: {
      return {
        ...state,
        statutoryComplianceData: state.statutoryComplianceData.concat(action.payload),
      };
    }
    case COMPLIANCE.STATUTORY.UPDATE_ONE: {
      return {
        ...state,
        statutoryComplianceData: state.statutoryComplianceData.map(statutory =>
          statutory.id === action.payload.id ? action.payload : statutory,
        ),
      };
    }
    case COMPLIANCE.STATUTORY.DELETE_ONE: {
      return {
        ...state,
        statutoryComplianceData: state.statutoryComplianceData.filter(statutory => statutory.id !== action.payload),
      };
    }

    default:
      return state;
  }
};
