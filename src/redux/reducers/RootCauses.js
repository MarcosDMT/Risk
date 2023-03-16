import { ROOT_CAUSES } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  rootCauses: [],
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ROOT_CAUSES.GET_ALL: {
      return {
        ...state,
        rootCauses: action.payload,
      };
    }
    case ROOT_CAUSES.ADD_ONE: {
      return {
        ...state,
        rootCauses: state.rootCauses.concat(action.payload),
      };
    }
    case ROOT_CAUSES.UPDATE_ONE: {
      return {
        ...state,
        rootCauses: state.rootCauses.map(rootCause => (rootCause.id === action.payload.id ? action.payload : rootCause)),
      };
    }
    case ROOT_CAUSES.DELETE_ONE: {
      return {
        ...state,
        rootCauses: state.rootCauses.filter(rootCause => rootCause.id !== action.payload),
      };
    }
    default:
      return state;
  }
};
