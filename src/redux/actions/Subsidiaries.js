import { SUBSIDIARIES } from '../../@jumbo/constants/ActionTypes';
import { fetchError, fetchSuccess } from './Common';
import axios from 'axios';
import { API_BASE_URL, API_URL, currentUser, REQUEST_STATUS } from '../../@jumbo/utils/apis';
import useAxios from '../../services/Requests/useAxios';

export const fetchSubsidiaries = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_SUBSIDIARIES}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: SUBSIDIARIES.GET_ALL,
            payload: res.data,
          });
        }
      })
      .catch(err => {
        // if (err.response.status !== undefined) {
        //   if (err.response.status === REQUEST_STATUS.BAD_REQUEST) {
        //     dispatch(fetchError(err.response.data.errors.Name[0]));
        //   }
        // } else {
        //   dispatch(fetchError(err.message));
        // }
      });
    // dispatch({
    //   type: SUBSIDIARIES.GET_ALL,
    //   payload: subsidiariesList,
    // });
  };
};
export const addSubsidiary = (data, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.CREATE_SUBSIDIARY}`, data)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Subsidiary Created Successfully!'));
          //dispatch(fetchSubsidiaries());
          data.id = res.data?.id;
          dispatch({
            type: SUBSIDIARIES.ADD_ONE,
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
export const updateSubsidiary = (updatedData, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.UPDATE_SUBSIDIARY}`, updatedData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Subsidiary Updated Successfully!'));
          //dispatch(fetchSubsidiaries());
          dispatch({
            type: SUBSIDIARIES.UPDATE_ONE,
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
  // return dispatch => {
  //   dispatch({
  //     type: SUBSIDIARIES.UPDATE_ONE,
  //     payload: updatedData,
  //   });
  //   dispatch(fetchSuccess('Subsidiary Updated Successfully!'));
  // };
};

export const deleteSubsidiary = data => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.DELETE_SUBSIDIARY}`, data)
      .then(res => {
        dispatch(fetchSuccess('Subsidiary Deleted Successfully!'));
      })
      .catch(err => {
        dispatch(fetchError(err.message));
      });
  };
};
