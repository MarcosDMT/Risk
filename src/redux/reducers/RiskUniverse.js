import { RISK_UNIVERSE } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  risks: [],
  uploadedRisks: [],
  uploadedDocsNames:[],
  };
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case RISK_UNIVERSE.GET_ALL: {
      return {
        ...state,
        risks: action.payload,
      };
    }
    case RISK_UNIVERSE.GET_APPROVALS: {
      return {
        ...state,
        risks: action.payload,
      };
    }
    case RISK_UNIVERSE.GET_UPLOADEDDOCNAMES: {
      return {
        ...state,
        uploadedDocsNames: action.payload,
      };
    }
    case RISK_UNIVERSE.GET_UPLOADED_RISKS: {
      return {
        ...state,
        uploadedRisks: action.payload,
      };
    }
    case RISK_UNIVERSE.ADD_ONE: {
      return {
        ...state,
        risks: state.risks.concat(action.payload),
      };
    }
    case RISK_UNIVERSE.UPDATE_UPLOADED_RISKS:{
      return {
        ...state,
        uploadedRisks: state.uploadedRisks.map((risk) => risk.id === action.payload.id ? action.payload : risk )
      }
    }
    case RISK_UNIVERSE.UPDATE_ONE: {
      return {
        ...state,
        risks: state.risks.map(risk => (risk.id === action.payload.id ? action.payload : risk)),
      };
    }
    case RISK_UNIVERSE.DELETE_ONE: {
      return {
        ...state,
        risks: state.risks.filter(risk => risk.id !== action.payload),
      };
    }
    default:
      return state;
  }
};
