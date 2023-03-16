import { RISK_OWNERS } from '../../@jumbo/constants/ActionTypes';
import { fetchError, fetchSuccess } from './Common';
import { API_URL, REQUEST_STATUS } from '../../@jumbo/utils/apis';
import useAxios from '../../services/Requests/useAxios';

export const fetchRiskOwners = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_RISK_OWNERS}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: RISK_OWNERS.GET_ALL,
            payload: res.data,
          });
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const fetchRiskOwnerTypes = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_RISK_OWNERS_TYPES}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: RISK_OWNERS.GET_ALL_TYPES,
            payload: res.data,
          });
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const addRiskOwner = (data,callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.CREATE_RISK_OWNER}`, data)
      .then(res => {
        console.log("OWNER RESPONSE ",res);
        if (res.data.success === true) {
          dispatch(fetchSuccess(res.data.message));
          callBackFunc();
          data.id = res.data?.id;
          dispatch({
            type: RISK_OWNERS.ADD_ONE,
            payload: data,
          });
        }
      })
      .catch(err => {
        console.log("RISK RESPONSE ",err);
        let error = JSON.parse(err.response.data)
        let convertedObject = Object.entries(error.errors)
        if (err.response.status === 400) {
          dispatch(fetchError(convertedObject[0][1][0]));
        }
      });
  };
  // return dispatch => {
  //   dispatch({
  //     type: DEPARTMENTS.ADD_ONE,
  //     payload: data,
  //   });
  //   dispatch(fetchSuccess('Department Created Successfully!'));
  // };
};
export const updateRiskOwner = (updatedData, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.UPDATE_RISK_OWNER}`, updatedData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess());
          dispatch({
            type: RISK_OWNERS.UPDATE_ONE,
            payload: updatedData,
          });
          callBackFunc();
        }
      })
      .catch(err => {
        if (err.response?.status !== undefined) {
          if (err.response.status === REQUEST_STATUS.BAD_REQUEST) {
            dispatch(fetchError(err.response.data.errors?.Name[0]));
          }
        } else {
          dispatch(fetchError(err.message));
        }
      });
  };
};
export const deleteRiskOwner = id => {
  return dispatch => {
    dispatch({
      type: RISK_OWNERS.DELETE_ONE,
      payload: id,
    });
    dispatch(fetchSuccess());
  };
};
