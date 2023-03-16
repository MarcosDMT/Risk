import { DEPARTMENTS } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  departments: [],
  filteredDepartments: [],
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case DEPARTMENTS.GET_ALL: {
      return {
        ...state,
        departments: action.payload,
        filteredDepartments: action.payload,
      };
    }
    case DEPARTMENTS.ADD_ONE: {
      return {
        ...state,
        departments: state.departments.concat(action.payload),
      };
    }
    case DEPARTMENTS.UPDATE_ONE: {
      return {
        ...state,
        departments: state.departments.map(department =>
          department.id === action.payload.id ? action.payload : department,
        ),
      };
    }
    case DEPARTMENTS.DELETE_ONE: {
      return {
        ...state,
        departments: state.departments.filter(department => department.id !== action.payload),
      };
    }
    case DEPARTMENTS.GET_BY_SUBSIDIARY:
      return {
        ...state,
        filteredDepartments: state.departments.filter(department => department.companyId === action.payload),
      };
    default:
      return state;
  }
};
