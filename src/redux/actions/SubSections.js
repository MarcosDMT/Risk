import { SUB_SECTIONS } from '../../@jumbo/constants/ActionTypes';
import { fetchError, fetchSuccess } from './Common';
import { subSectionList } from '../../routes/Pages/Organization/dummyData';
import useAxios from '../../services/Requests/useAxios';
import { API_URL, REQUEST_STATUS } from '../../@jumbo/utils/apis';

export const fetchSubSections = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_SUB_SECTIONS}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: SUB_SECTIONS.GET_ALL,
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
  //     type: SUB_SECTIONS.GET_ALL,
  //     payload: subSectionList,
  //   });
  // };
};
export const addSubSection = (data, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.CREATE_SUB_SECTION}`, data)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Sub-Section Created Successfully!'));
          data.id = res.data?.id;
          dispatch({
            type: SUB_SECTIONS.ADD_ONE,
            payload: data,
          });
          callBackFunc();
        }
      })
      .catch(err => {
        if (err.response?.status !== undefined) {
          if (err.response?.status === REQUEST_STATUS.BAD_REQUEST) {
            dispatch(fetchError(err.response.data.errors?.Name[0]));
          }
        } else {
          dispatch(fetchError(err.message));
        }
      });
  };
  // return dispatch => {
  //   dispatch({
  //     type: SUB_SECTIONS.ADD_ONE,
  //     payload: data,
  //   });
  //   dispatch(fetchSuccess('Sub-Section Created Successfully!'));
  // };
};
export const updateSubSection = (updatedData, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.UPDATE_SUB_SECTIONS}`, updatedData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('SUB-Section Updated Successfully!'));
          dispatch({
            type: SUB_SECTIONS.UPDATE_ONE,
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
  //     type: SUB_SECTIONS.UPDATE_ONE,
  //     payload: updatedData,
  //   });
  //   dispatch(fetchSuccess('Sub-Section Updated Successfully!'));
  // };
};
export const fetchSubSectionsBySection = sectionId => {
  return dispatch => {
    dispatch({
      type: SUB_SECTIONS.GET_BY_SECTION,
      payload: sectionId,
    });
  };
};

export const deleteSubSection = data => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.DELETE_SUB_SECTIONS}`, data)
      .then(res => {
        dispatch(fetchSuccess('Subsection Deleted Successfully!'));
      })
      .catch(err => {
        dispatch(fetchError(err.message));
      });
  };
};
