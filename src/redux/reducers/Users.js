import { USERS } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  users: [],
  filteredUsers: [],
  importedUsers: [],
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case USERS.GET_ALL: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case USERS.ADD_ONE: {
      return {
        ...state,
        users: state.users.concat(action.payload),
      };
    }
    case USERS.UPDATE_ONE: {
      return {
        ...state,
        users: state.users.map(user => (user.id === action.payload.id ? action.payload : user)),
      };
    }
    case USERS.UPDATE_STATUS: {
      return {
        ...state,
        users: state.users.map(user => (user.id === action.payload.id ? action.payload : user)),
      };
    }
    case USERS.DELETE_ONE: {
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    }
    case USERS.GET_IMPORTED: {
      return {
        ...state,
        importedUsers: action.payload,
      };
    }
    default:
      return state;
  }
};
