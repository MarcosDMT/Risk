import {
  SEND_FORGET_PASSWORD_EMAIL,
  UPDATE_AUTH_USER,
  UPDATE_LOAD_USER,
  UPDATE_USER_ROLES,
} from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  authUser: null,
  userRole: {},
  loadUser: false,
  send_forget_password_email: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_AUTH_USER: {
      return {
        ...state,
        authUser: action.payload,
        loadUser: true,
      };
    }
    case UPDATE_USER_ROLES: {
      return {
        ...state,
        userRole: action.payload,
        loadUser: true,
      };
    }
    case UPDATE_LOAD_USER: {
      return {
        ...state,
        loadUser: action.payload,
      };
    }
    case SEND_FORGET_PASSWORD_EMAIL: {
      return {
        ...state,
        send_forget_password_email: action.payload,
      };
    }
    default:
      return state;
  }
};
