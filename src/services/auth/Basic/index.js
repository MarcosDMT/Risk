import { fetchError, fetchStart, fetchSuccess } from '../../../redux/actions';
import {
  fetchUserRole,
  setAuthUser,
  setForgetPassMailSent,
  setUserRole,
  updateLoadUser
} from '../../../redux/actions/Auth';
import React from 'react';
import axios from 'axios';
import { API_BASE_URL, API_URL, currentUser, REQUEST_STATUS } from '../../../@jumbo/utils/apis';
import jwt from 'jwt-decode';
import SimpleCrypto from 'simple-crypto-js';
import { fetchSubsidiaries } from '../../../redux/actions/Subsidiaries';

const BasicAuth = {
  onRegister: ({ name, email, password }) => {
    return dispatch => {
      dispatch(fetchStart());
      setTimeout(() => {
        dispatch(fetchSuccess());
        const user = { name: name, email: email, password: password };
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setAuthUser(user));
      }, 300);
    };
  },
  onLogin: ({ email, password }) => {
    const secretKey = new SimpleCrypto(email);
    const encodedPassword = secretKey.encrypt(password);
    return dispatch => {
      dispatch(fetchStart());
      //set the login Api here
      axios
        .post(`${API_BASE_URL}${API_URL.LOGIN}`, {
          email: email,
          password: encodedPassword,
        })
        .then(res => {
          if (res.data.token !== undefined || res.data.token !== '') {
            const userDetails = jwt(res.data.token);
            const refreshToken = res.data.refreshToken;
            const token = res.data.token;
            const secretKey = new SimpleCrypto(userDetails.userId);
            const user = {
              ...userDetails,
              refreshToken: refreshToken,
              token: token,
            };
            setTimeout(() => {
              dispatch(fetchSuccess());
              dispatch(setAuthUser(user));
              dispatch(fetchUserRole(token, userDetails.userId));
              //dispatch(fetchSubsidiaries());
              localStorage.setItem('user', JSON.stringify(secretKey.encrypt(user)));
              localStorage.setItem('id', JSON.stringify(userDetails.userId));
            }, 300);
          }
        })
        .catch(error => {
          if (error.response?.status === REQUEST_STATUS.UNAUTHORIZED) {
            dispatch(fetchError(error.response?.data.messages[0]));
          } else {
            dispatch(fetchError(error.message));
          }
        });
      //   try {
      //     if (email == 'testadmin@gmail.com' && password == '12345678') {
      //       setTimeout(() => {
      //         const user = { name: 'Admin', email: email, password: password, token: '#kdjvuiar9jka093klakljar0' };
      //         dispatch(fetchSuccess());
      //         localStorage.setItem('user', JSON.stringify(user));
      //         dispatch(setAuthUser(user));
      //       }, 300);
      //     } else {
      //       dispatch(fetchError('Wrong email/password combination'));
      //     }
      //   } catch (error) {
      //     dispatch(fetchError(error.message));
      //   }
    };
  },
  onLogout: () => {
    return dispatch => {
      dispatch(fetchStart());

      setTimeout(() => {
        dispatch(fetchSuccess());
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        dispatch(setAuthUser(null));
        dispatch(setUserRole({}));
      }, 300);
    };
  },

  getAuthUser: (loaded = false) => {
    const user = currentUser();
    return dispatch => {
      dispatch(fetchStart());
      dispatch(updateLoadUser(loaded));
      setTimeout(() => {
        dispatch(fetchSuccess());
        dispatch(setAuthUser(user));
        dispatch(fetchUserRole(user?.token, user?.userId));
      }, 300);
    };
  },

  onForgotPassword: () => {
    return dispatch => {
      dispatch(fetchStart());

      setTimeout(() => {
        dispatch(setForgetPassMailSent(true));
        dispatch(fetchSuccess());
      }, 300);
    };
  },
  getSocialMediaIcons: () => {
    return <React.Fragment> </React.Fragment>;
  },
};

export default BasicAuth;
