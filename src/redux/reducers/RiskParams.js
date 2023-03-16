import { RISK_PARAMS } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  currentMatrix: null,
  matrixData: [],
  probabilities: [],
  severities: [],
  riskControls: [],
  lossTypes: [],
  riskCategories: [],
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    //------------RISK_CATEGORIES REDUCERS ------------------//
    case RISK_PARAMS.RISK_CATEGORIES.GET_ALL: {
      return {
        ...state,
        riskCategories: action.payload,
      };
    }
    case RISK_PARAMS.RISK_CATEGORIES.ADD_ONE: {
      return {
        ...state,
        riskCategories: state.riskCategories.concat(action.payload),
      };
    }
    case RISK_PARAMS.RISK_CATEGORIES.UPDATE_ONE: {
      return {
        ...state,
        riskCategories: state.riskCategories.map(riskCategory =>
          riskCategory.id === action.payload.id ? action.payload : riskCategory,
        ),
      };
    }
    case RISK_PARAMS.RISK_CATEGORIES.DELETE_ONE: {
      return {
        ...state,
        riskCategories: state.riskCategories.filter(riskCategory => riskCategory.id !== action.payload),
      };
    }
    //------------RISK_CONTROLS REDUCERS ------------------//
    case RISK_PARAMS.RISK_CONTROLS.GET_ALL: {
      return {
        ...state,
        riskControls: action.payload,
      };
    }
    case RISK_PARAMS.RISK_CONTROLS.ADD_ONE: {
      return {
        ...state,
        riskControls: state.riskControls.concat(action.payload),
      };
    }
    case RISK_PARAMS.RISK_CONTROLS.UPDATE_ONE: {
      return {
        ...state,
        riskControls: state.riskControls.map(riskControl =>
          riskControl.id === action.payload.id ? action.payload : riskControl,
        ),
      };
    }
    case RISK_PARAMS.RISK_CONTROLS.DELETE_ONE: {
      return {
        ...state,
        riskControls: state.riskControls.filter(riskControl => riskControl.id !== action.payload),
      };
    }
    //------------RISK_PROBABILITY REDUCERS ------------------//
    case RISK_PARAMS.RISK_PROBABILITY.GET_ALL: {
      return {
        ...state,
        probabilities: action.payload,
      };
    }
    case RISK_PARAMS.RISK_PROBABILITY.ADD_ONE: {
      return {
        ...state,
        probabilities: state.probabilities.concat(action.payload),
      };
    }
    case RISK_PARAMS.RISK_PROBABILITY.UPDATE_ONE: {
      return {
        ...state,
        probabilities: state.probabilities.map(probability =>
          probability.id === action.payload.id ? action.payload : probability,
        ),
      };
    }
    case RISK_PARAMS.RISK_PROBABILITY.DELETE_ONE: {
      return {
        ...state,
        probabilities: state.probabilities.filter(probability => probability.id !== action.payload),
      };
    }
    //------------RISK_SEVERITY REDUCERS ------------------//
    case RISK_PARAMS.RISK_SEVERITY.GET_ALL: {
      return {
        ...state,
        severities: action.payload,
      };
    }
    case RISK_PARAMS.RISK_SEVERITY.ADD_ONE: {
      return {
        ...state,
        severities: state.severities.concat(action.payload),
      };
    }
    case RISK_PARAMS.RISK_SEVERITY.UPDATE_ONE: {
      return {
        ...state,
        severities: state.severities.map(severity => (severity.id === action.payload.id ? action.payload : severity)),
      };
    }
    case RISK_PARAMS.RISK_SEVERITY.DELETE_ONE: {
      return {
        ...state,
        severities: state.severities.filter(severity => severity.id !== action.payload),
      };
    }
    //------------LOSS_TYPES REDUCERS ------------------//
    case RISK_PARAMS.LOSS_TYPES.GET_ALL: {
      return {
        ...state,
        lossTypes: action.payload,
      };
    }
    case RISK_PARAMS.LOSS_TYPES.ADD_ONE: {
      return {
        ...state,
        lossTypes: state.lossTypes.concat(action.payload),
      };
    }
    case RISK_PARAMS.LOSS_TYPES.UPDATE_ONE: {
      return {
        ...state,
        lossTypes: state.lossTypes.map(lossType => (lossType.id === action.payload.id ? action.payload : lossType)),
      };
    }
    case RISK_PARAMS.LOSS_TYPES.DELETE_ONE: {
      return {
        ...state,
        lossTypes: state.lossTypes.filter(lossType => lossType.id !== action.payload),
      };
    }
    //--------------PROBABILITY-SEVERITY-MATRIX------------//
    case RISK_PARAMS.MATRIX.GET_ALL: {
      return {
        ...state,
        matrixData: action.payload,
      };
    }
    case RISK_PARAMS.MATRIX.GET_ONE: {
      return {
        ...state,
        currentMatrix: action.payload,
      };
    }
    default:
      return state;
  }
};
