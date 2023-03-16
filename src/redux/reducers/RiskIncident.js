import { RISK_INCIDENT } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  incidents: [],
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case RISK_INCIDENT.GET_ALL: {
      return {
        ...state,
        incidents: action.payload,
      };
    }
    default:
      return state;
  }
};
