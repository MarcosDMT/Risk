import { SECTIONS } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  sections: [],
  filteredSections: [],
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SECTIONS.GET_ALL: {
      return {
        ...state,
        sections: action.payload,
        filteredSections: action.payload,
      };
    }
    case SECTIONS.ADD_ONE: {
      return {
        ...state,
        sections: state.sections.concat(action.payload),
      };
    }
    case SECTIONS.UPDATE_ONE: {
      return {
        ...state,
        sections: state.sections.map(section => (section.id === action.payload.id ? action.payload : section)),
      };
    }
    case SECTIONS.DELETE_ONE: {
      return {
        ...state,
        sections: state.sections.filter(section => section.id !== action.payload),
      };
    }
    case SECTIONS.GET_BY_DEPARTMENT:
      return {
        ...state,
        filteredSections: state.sections.filter(section => section.departmentId === action.payload),
      };
    default:
      return state;
  }
};
