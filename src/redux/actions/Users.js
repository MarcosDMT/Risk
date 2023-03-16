import React from 'react';
import { DEPARTMENTS, USERS } from '../../@jumbo/constants/ActionTypes';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import { employeesList } from '../../routes/Pages/Users/dummyData';
import { API_BASE_URL, API_URL, currentUser, REQUEST_STATUS } from '../../@jumbo/utils/apis';
import useAxios from '../../services/Requests/useAxios';

export const fetchUsers = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_BASE_URL}${API_URL.FETCH_USERS}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: USERS.GET_ALL,
            payload: res.data,
          });
        }
      })
      .catch(err => {
        if (err.response?.status !== undefined) {
          if (err.response?.status === REQUEST_STATUS.UNAUTHORIZED) {
            console.log(err.response.data.messages[0]);
          }
        } else {
          console.log(err.message);
        }
      });
    // dispatch({
    //   type: USERS.GET_ALL,
    //   payload: employeesList,
    // });
  };
};
export const fetchImportedUsers = () => {
  return dispatch => {
    dispatch({
      type: USERS.GET_IMPORTED,
      payload: employeesList,
    });
  };
};


export const addUser = (data, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    dispatch(fetchStart());
    await axiosInstance
      .post(`${API_URL.CREATE_USER}`, data)
      .then(res => {
          dispatch(fetchSuccess(res.data));
          data.id = res.data?.id;
          dispatch({
            type: USERS.ADD_ONE,
            payload: data,
          });
          callBackFunc();
      })
      .catch(err => {
        let error = JSON.parse(err.response.data)
        let convertedObject = Object.entries(error.errors)
        console.log("CONVERTED USER ",convertedObject)
        if (err.response.status === 400) {
            dispatch(fetchError(convertedObject[0][1][0]));
        }
      });
  };
  // return dispatch => {
  //   // dispatch(fetchSuccess('Department Created Successfully!'));
  //   dispatch({
  //     type: USERS.ADD_ONE,
  //     payload: data,
  //   });
  // };
};
export const updateUser = (updatedData, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    dispatch(fetchStart());
    await axiosInstance
      .post(`${API_URL.UPDATE_USER}`, updatedData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess());
          dispatch({
            type: DEPARTMENTS.UPDATE_ONE,
            payload: updatedData,
          });
          callBackFunc();
        }
      })
      .catch(err => {
        if (err.response?.status !== undefined) {
          dispatch(fetchError(err.message));
          // if (err.response.status === REQUEST_STATUS.BAD_REQUEST) {
          //   dispatch(fetchError(err.response.data.errors?.Name[0]));
          // }
        }
      });
  };
  // return dispatch => {
  //   // dispatch(fetchSuccess('Department Updated Successfully!'));
  //   dispatch({
  //     type: USERS.UPDATE_ONE,
  //     payload: updatedData,
  //   });
  // };
};

export const resetUserPassword = data => {
  return dispatch => {
    dispatch(fetchSuccess('Password Reset Successfully!'));
  };
};

export const updateUserStatus = data => {
  const user = data;
  user.isActive = !data.isActive;
  return dispatch => {
    dispatch({
      type: USERS.UPDATE_STATUS,
      payload: user,
    });
    dispatch(fetchSuccess('Status Updated Successfully!'));
  };
};

export const deactivateUser = data => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.DEACTIVATE_USER}`, data)
      .then(res => {
        dispatch(fetchSuccess('User deactivated Successfully!'));
      })
      .catch(err => {
        dispatch(fetchError(err.message));
      });
  };
};
// export const deleteUser = id => {
//   return dispatch => {
//     dispatch({
//       type: USERS.DELETE_ONE,
//       payload: id,
//     });
//     dispatch(fetchSuccess('User Removed Successfully!'));
//   };
// };
