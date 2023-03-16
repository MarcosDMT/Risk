import {
  SEND_FORGET_PASSWORD_EMAIL,
  UPDATE_AUTH_USER,
  UPDATE_LOAD_USER,
  UPDATE_USER_ROLES,
} from '../../@jumbo/constants/ActionTypes';
import useAxios from '../../services/Requests/useAxios';
import { API_BASE_URL, API_URL, REQUEST_STATUS } from '../../@jumbo/utils/apis';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'axios';
import BasicAuth from '../../services/auth/Basic';

export const setAuthUser = user => {
  return dispatch => {
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: user,
    });
  };
};
export const setUserRole = data => {
  return async dispatch => {
    dispatch({
      type: UPDATE_USER_ROLES,
      payload: data,
    });
  };
};

export const fetchUserRole = (token, userId) => {
  return async dispatch => {
    dispatch(fetchStart());
    await axios
      .get(`${API_BASE_URL}${API_URL.FETCH_USER_ROLE}?id=${userId}`, { headers: { Authorization: 'Bearer ' + token } })
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          //console.log(res.data);
          dispatch({
            type: UPDATE_USER_ROLES,
            payload: res.data,
          });
          dispatch(fetchSuccess());
        }
      })
      .catch(err => {
        dispatch(fetchError());
        if (err.response?.status === REQUEST_STATUS.UNAUTHORIZED) {
          dispatch(BasicAuth.onLogout());
        }
      });
  };
};

export const updateLoadUser = loading => {
  return dispatch => {
    dispatch({
      type: UPDATE_LOAD_USER,
      payload: loading,
    });
  };
};

export const setForgetPassMailSent = status => {
  return dispatch => {
    dispatch({
      type: SEND_FORGET_PASSWORD_EMAIL,
      payload: status,
    });
  };
};
