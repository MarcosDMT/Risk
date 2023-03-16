import { RISK_INDICATOR } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  indicators: [],
  indicatorHistory:[]
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case RISK_INDICATOR.GET_ALL: {
      return {
        ...state,
        indicators: action.payload,
      };
    }
    case RISK_INDICATOR.GET_HISTORY: {
      return {
        ...state,
        indicatorHistory: action.payload,
      };
    }
    default:
      return state;
  }
};
