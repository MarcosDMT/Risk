import { DEPARTMENTS } from '../../@jumbo/constants/ActionTypes';
import { fetchError, fetchSuccess } from './Common';
import { API_URL, REQUEST_STATUS } from '../../@jumbo/utils/apis';
import useAxios from '../../services/Requests/useAxios';

export const fetchDepartments = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_DEPARTMENTS}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: DEPARTMENTS.GET_ALL,
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
    //   type: DEPARTMENTS.GET_ALL,
    //   payload: List,
    // });
  };
};

export const addDepartment = (data, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.CREATE_DEPARTMENT}`, data)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Department Created Successfully!'));
          data.id = res.data?.id;
          dispatch({
            type: DEPARTMENTS.ADD_ONE,
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
  // return dispatch => {
  //   dispatch({
  //     type: DEPARTMENTS.ADD_ONE,
  //     payload: data,
  //   });
  //   dispatch(fetchSuccess('Department Created Successfully!'));
  // };
};
export const updateDepartment = (updatedData, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.UPDATE_DEPARTMENT}`, updatedData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Department Updated Successfully!'));
          dispatch({
            type: DEPARTMENTS.UPDATE_ONE,
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
  //     type: DEPARTMENTS.UPDATE_ONE,
  //     payload: updatedData,
  //   });
  //   dispatch(fetchSuccess('Department Updated Successfully!'));
  // };
};
export const fetchDepartmentsByCompany = companyId => {
  return dispatch => {
    dispatch({
      type: DEPARTMENTS.GET_BY_SUBSIDIARY,
      payload: companyId,
    });
  };
};

export const deleteDepartment = data => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.DELETE_DEPARTMENT}`,data)
      .then(res => {
        dispatch(fetchSuccess(res.data.message));
      })
      .catch(err => {
        dispatch(fetchError(err.message));
      });
  };
};
