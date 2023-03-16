import { SUB_SECTIONS } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  subSections: [],
  filteredSubSections: [],
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SUB_SECTIONS.GET_ALL: {
      return {
        ...state,
        subSections: action.payload,
        filteredSubSections: action.payload,
      };
    }
    case SUB_SECTIONS.ADD_ONE: {
      return {
        ...state,
        subSections: state.subSections.concat(action.payload),
      };
    }
    case SUB_SECTIONS.UPDATE_ONE: {
      return {
        ...state,
        subSections: state.subSections.map(subSection =>
          subSection.id === action.payload.id ? action.payload : subSection,
        ),
      };
    }
    case SUB_SECTIONS.DELETE_ONE: {
      return {
        ...state,
        subSections: state.subSections.filter(subSection => subSection.id !== action.payload),
      };
    }
    case SUB_SECTIONS.GET_BY_SECTION:
      return {
        ...state,
        filteredSubSections: state.subSections.filter(subsection => subsection.sectionsId === action.payload),
      };
    default:
      return state;
  }
};
