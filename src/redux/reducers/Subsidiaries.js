import { SUBSIDIARIES } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  subsidiaries: [],
  filteredSubsidiaries: [],
  currentSubsidiary: 'All',
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SUBSIDIARIES.SET_CURRENT: {
      return {
        ...state,
        currentSubsidiary: action.payload,
      };
    }
    case SUBSIDIARIES.GET_ALL: {
      return {
        ...state,
        subsidiaries: action.payload,
      };
    }
    case SUBSIDIARIES.ADD_ONE: {
      return {
        ...state,
        subsidiaries: state.subsidiaries.concat(action.payload),
      };
    }
    case SUBSIDIARIES.UPDATE_ONE: {
      return {
        ...state,
        subsidiaries: state.subsidiaries.map(subsidiary =>
          subsidiary.id === action.payload.id ? action.payload : subsidiary,
        ),
      };
    }
    case SUBSIDIARIES.DELETE_ONE: {
      return {
        ...state,
        subsidiaries: state.subsidiaries.filter(subsidiary => subsidiary.id !== action.payload),
      };
    }
    default:
      return state;
  }
};
