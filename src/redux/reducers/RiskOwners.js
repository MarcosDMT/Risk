import { RISK_OWNERS } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  riskOwners: [],
  riskOwnersOptions:[],
  riskOwnerTypes: [],
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case RISK_OWNERS.GET_ALL: {
      return {
        ...state,
        riskOwners: action.payload,
      };
    }
    case RISK_OWNERS.GET_ALL_TYPES: {
      return {
        ...state,
        riskOwnerTypes: action.payload,
      };
    }
    case RISK_OWNERS.ADD_ONE: {
      return {
        ...state,
        riskOwners: state.riskOwners.concat(action.payload),
      };
    }
    case RISK_OWNERS.UPDATE_ONE: {
      return {
        ...state,
        riskOwners: state.riskOwners.map(riskOwner => (riskOwner.id === action.payload.id ? action.payload : riskOwner)),
      };
    }
    case RISK_OWNERS.DELETE_ONE: {
      return {
        ...state,
        riskOwners: state.riskOwners.filter(riskOwner => riskOwner.id !== action.payload),
      };
    }
    default:
      return state;
  }
};
