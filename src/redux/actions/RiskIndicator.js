import { fetchError, fetchStart, fetchSuccess } from './Common';
import { API_URL, REQUEST_STATUS } from '../../@jumbo/utils/apis';
import useAxios from '../../services/Requests/useAxios';
import { RISK_INDICATOR } from '../../@jumbo/constants/ActionTypes';


// FETCH INDICATORS
export const fetchIndicator = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    fetchStart();
    await axiosInstance
      .get(`${API_URL.FETCH_INDICATOR}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: RISK_INDICATOR.GET_ALL,
            payload: res.data,
          });
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};


// FETCH INDICATOR HISTORY
export const fetchIndicatorHistory = (data) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.INDICATOR_HISTORY}`, data)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: RISK_INDICATOR.GET_HISTORY,
            payload: res.data,
          });
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
