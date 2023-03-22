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
    case RISK_INCIDENT.UPDATE_ONE: {
      return {
        ...state,
        incidents: state.incidents.map(incident => (incident.id === action.payload.id ? action.payload : incident)),
      };
    }
    default:
      return state;
  }
};
