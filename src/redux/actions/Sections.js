import { SECTIONS } from '../../@jumbo/constants/ActionTypes';
import { fetchError, fetchSuccess } from './Common';
import { sectionsList } from '../../routes/Pages/Organization/dummyData';
import useAxios from '../../services/Requests/useAxios';
import { API_URL, REQUEST_STATUS } from '../../@jumbo/utils/apis';

export const fetchSections = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_SECTIONS}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: SECTIONS.GET_ALL,
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
  };
  // return dispatch => {
  //   dispatch({
  //     type: SECTIONS.GET_ALL,
  //     payload: sectionsList,
  //   });
  // };
};

export const addSection = (data, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.CREATE_SECTION}`, data)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Section Created Successfully!'));
          data.id = res.data?.id;
          dispatch({
            type: SECTIONS.ADD_ONE,
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
  //     type: SECTIONS.ADD_ONE,
  //     payload: data,
  //   });
  //   dispatch(fetchSuccess('Section Created Successfully!'));
  // };
};
export const updateSection = (updatedData, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.UPDATE_SECTIONS}`, updatedData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Section Updated Successfully!'));
          dispatch({
            type: SECTIONS.UPDATE_ONE,
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
  //     type: SECTIONS.UPDATE_ONE,
  //     payload: updatedData,
  //   });
  //   dispatch(fetchSuccess('Section Updated Successfully!'));
  // };
};
export const fetchSectionsByDepartment = departmentId => {
  return dispatch => {
    dispatch({
      type: SECTIONS.GET_BY_DEPARTMENT,
      payload: departmentId,
    });
  };
};

export const deleteSection = data => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    console.log("ENDPOINT ",API_URL.DELETE_SECTION)
    await axiosInstance
      .post(`${API_URL.DELETE_SECTION}`, data)
      .then(res => {
        dispatch(fetchSuccess('Section Deleted Successfully!'));
      })
      .catch(err => {
        dispatch(fetchError(err.message));
      });
  };
};
