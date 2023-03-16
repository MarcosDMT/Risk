import { ROOT_CAUSES} from '../../@jumbo/constants/ActionTypes';
import { fetchError, fetchSuccess } from './Common';
import { API_URL, REQUEST_STATUS } from '../../@jumbo/utils/apis';
import useAxios from '../../services/Requests/useAxios';

export const fetchRootCauses = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_ROOT_CAUSES}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: ROOT_CAUSES.GET_ALL,
            payload: res.data,
          });
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const addRootCause = (data) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.CREATE_ROOT_CAUSE}`, data)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess());
          data.id = res.data?.id;
          dispatch({
            type: ROOT_CAUSES.ADD_ONE,
            payload: data,
          });
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
export const updateRootCause = (updatedData, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.UPDATE_ROOT_CAUSE}`, updatedData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess());
          dispatch({
            type: ROOT_CAUSES.UPDATE_ONE,
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
export const deleteRootCause = id => {
  return dispatch => {
    dispatch({
      type: ROOT_CAUSES.DELETE_ONE,
      payload: id,
    });
    dispatch(fetchSuccess());
  };
};
