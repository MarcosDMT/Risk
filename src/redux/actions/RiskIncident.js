import { fetchError, fetchStart, fetchSuccess } from './Common';
import { API_URL, REQUEST_STATUS } from '../../@jumbo/utils/apis';
import useAxios from '../../services/Requests/useAxios';
import { RISK_INCIDENT } from '../../@jumbo/constants/ActionTypes';

export const addRiskIncident = (data, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    dispatch(fetchStart());
    await axiosInstance
      .post(`${API_URL.CREATE_INCIDENT}`, data)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Risk Incident Created Successfully!'));
          data.id = res.data?.id;
          dispatch({
            type: RISK_INCIDENT.ADD_ONE,
            payload: data,
          });
          callBackFunc();
        }
      })
      .catch(err => {
        if (err.response.status !== undefined) {
          if (err.response.status === REQUEST_STATUS.BAD_REQUEST) {
            dispatch(fetchError(err.response.data.errors?.Name[0]));
          }
        } else {
          dispatch(fetchError(err.message));
        }
      });
  };
};

// FETCH INCIDENTS
export const fetchIncidents = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_INCIDENT}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: RISK_INCIDENT.GET_ALL,
            payload: res.data,
          });
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

// Updte Incident
export const updateIncident = (updatedData, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    dispatch(fetchStart());
    await axiosInstance
      .post(`${API_URL.UPDATE_INCIDENT}`, updatedData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Incident Updated Successfully!'));
          dispatch({
            type: RISK_INCIDENT.UPDATE_ONE,
            payload: updatedData,
          });
          callBackFunc();
        }
      })
      .catch(err => {
        let error = JSON.parse(err.response.data);
        let convertedObject = Object.entries(error.errors);
        console.log('CONVERTED ', convertedObject);
        if (err.response.status === 400) {
          dispatch(fetchError(convertedObject[0][1][0]));
        }
      });
  };
};


export const deleteIncident = data => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    dispatch(fetchStart());
    await axiosInstance
      .post(`${API_URL.DELETE_INCIDENT}`, data)
      .then(res => {
        dispatch(fetchSuccess('Incident Deleted Successfully!'));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchError(err.message));
      });
  };
};
