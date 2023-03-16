import axios from 'axios';
import { API_BASE_URL, API_URL, currentUser, REQUEST_STATUS } from '../../@jumbo/utils/apis';
import jwt from 'jwt-decode';
import SimpleCrypto from 'simple-crypto-js';

export const AxiosRequestInterceptors = () => {
  const user = currentUser();
  if (user !== null || user !== '') {
    axios.interceptors.request.use(
      request => {
        if (!request.url.includes('auth')) {
          request.headers['Authorization'] = `bearer ${user.token}`;
        }
        return request;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }
};
export const AxiosResponseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      return response;
    },
    async err => {
      const originalConfig = err.config;
      if (err.response) {
        // Access Token was expired
        if (err.response.status === REQUEST_STATUS.UNAUTHORIZED && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            await refreshToken()
              .then(response => {
                const { token, refreshToken } = response.data;
                const userDetails = jwt(token);
                const secretKey = new SimpleCrypto(userDetails.userId);
                const user = {
                  ...userDetails,
                  refreshToken: refreshToken,
                  token: token,
                };
                axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
                localStorage.setItem('user', JSON.stringify(secretKey.encrypt(user)));
                localStorage.setItem('id', JSON.stringify(userDetails.userId));
              })
              .catch(error => {
                console.log(error);
              });

            // const { token } = rs.data;
            // console.log(rs.data);
            // window.localStorage.setItem('accessToken', accessToken);
            // axios.defaults.headers.common['Authorization'] = accessToken;
            return axios(originalConfig);
          } catch (_error) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }
            return Promise.reject(_error);
          }
        }
        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }
      return Promise.reject(err);
    },
  );
};
const refreshToken = () => {
  const user = currentUser();
  return axios.post(`${API_BASE_URL}${API_URL.REFRESH_TOKEN}`, {
    token: `${user.token}`,
    refreshToken: `${user.refreshToken}`,
  });
  // .then(res => {
  //     if (res.data.token !== undefined || res.data.token !== '') {
  //       const userDetails = jwt(res.data.token);
  //       const refreshToken = res.data.refreshToken;
  //       const token = res.data.token;
  //       const secretKey = new SimpleCrypto(userDetails.userId);
  //       const user = {
  //         ...userDetails,
  //         refreshToken: refreshToken,
  //         token: token,
  //       };
  //       console.log(token);
  //       axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`;
  //       setTimeout(() => {
  //         //dispatch(fetchSuccess());
  //         localStorage.setItem('user', JSON.stringify(secretKey.encrypt(user)));
  //         localStorage.setItem('id', JSON.stringify(userDetails.userId));
  //         // dispatch(setAuthUser(user));
  //       }, 300);
  //     }
  //   })
  //       .catch(error => {
  //         // dispatch(fetchError(error.message));
  //       });
};
