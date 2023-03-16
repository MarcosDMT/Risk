import { ROLES } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  permissions: [],
  roles: [],
  filteredRoles: [],
  rolesList: [],
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ROLES.GET_ROLES: {
      return {
        ...state,
        roles: action.payload,
        filteredRoles: action.payload,
      };
    }
    case ROLES.GET_ROLES_LIST: {
      return {
        ...state,
        rolesList: action.payload,
      };
    }
    case ROLES.GET_PERMISSIONS: {
      return {
        ...state,
        permissions: action.payload,
      };
    }
    case ROLES.ADD_ONE: {
      return {
        ...state,
        roles: state.roles.concat(action.payload),
      };
    }
    case ROLES.UPDATE_ONE: {
      return {
        ...state,
        roles: state.roles.map(role => (role.id === action.payload.id ? action.payload : role)),
      };
    }
    case ROLES.FILTER_ROLES: {
      return {
        ...state,
        filteredRoles: state.roles.filter(({ name }) => name.toLowerCase().includes(action.payload.toLowerCase())),
      };
    }
    case ROLES.DELETE_ONE: {
      return {
        ...state,
        roles: state.roles.filter(role => role.id !== action.payload),
      };
    }
    default:
      return state;
  }
};
