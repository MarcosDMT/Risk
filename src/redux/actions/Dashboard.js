import { fetchError, fetchStart, fetchSuccess } from './Common';
import { API_URL, REQUEST_STATUS } from '../../@jumbo/utils/apis';
import { UNIVERSEDASHBOARD } from '../../@jumbo/constants/ActionTypes';
import useAxios from '../../services/Requests/useAxios';

export const getUniverseDashboardData = data => {
  return async dispatch => {
    dispatch(fetchStart());
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.GET_UNIVERSE_STATISTICS}`, data)
      .then(res => {
        dispatch({
          type: UNIVERSEDASHBOARD.GET_UNIVERSE_DATA,
          payload: res.data,
        });
        dispatch(fetchSuccess('Dashboard Populated Successfully!'));
      })
      .catch(err => {
        dispatch(fetchError(err.message));
      });
  };
};
export const getRiskSummaryData = () => {
  return async dispatch => {
    dispatch(fetchStart());
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.GET_RISK_SUMMARY}`)
      .then(res => {
        dispatch({
          type: UNIVERSEDASHBOARD.GET_RISK_SUMMARY,
          payload: res.data,
        });
        dispatch(fetchSuccess());
      })
      .catch(err => {
        dispatch(fetchError());
      });
  };
};

export const getComplianceSummaryData = () => {
  return async dispatch => {
    dispatch(fetchStart());
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.GET_COMPLIANCE_SUMMARY}`)
      .then(res => {
        dispatch({
          type: UNIVERSEDASHBOARD.GET_COMPLIANCE_SUMMARY,
          payload: res.data,
        });
        dispatch(fetchSuccess());
      })
      .catch(err => {
        dispatch(fetchError());
      });
  };
};


export const fetchDashboardSummary = data => {
  console.log("DATA ",data);
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.GET_DASHBOARD_SUMMARY}`, data)
      .then(res => {
        dispatch(fetchSuccess('Data fetched successfully!'));
      })
      .catch(err => {
        dispatch(fetchError(err.message));
      });
  };
  // return dispatch => {
  //   dispatch({
  //     type: SUBSIDIARIES.SET_CURRENT,
  //     payload: data,
  //   });
  // };
};
