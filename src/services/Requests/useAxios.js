import axios from 'axios';
import { API_BASE_URL, API_URL, currentUser, REQUEST_STATUS } from '../../@jumbo/utils/apis';
import jwt_decode from 'jwt-decode';
import dayjs from 'moment';
import BasicAuth from '../auth/Basic';
import SimpleCrypto from 'simple-crypto-js';
import { setAuthUser } from '../../redux/actions/Auth';

const useAxios = dispatch => {
  // const { authUser } = useSelector(({ auth }) => auth);
  const authUser = currentUser();
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `bearer ${authUser?.token}` },
  });

  axiosInstance.interceptors.request.use(async req => {
    const userDetails = jwt_decode(authUser?.token);
    const isExpired = dayjs.unix(userDetails.exp).diff(dayjs()) < 1;

    if (!isExpired) {
      return req;
    }
    //refresh auth token
    const response = await axios.post(`${API_BASE_URL}${API_URL.REFRESH_TOKEN}`, {
      token: authUser.token,
      tenant: authUser.tenant,
      refreshToken: authUser.refreshToken,
    });

    if (response.status === REQUEST_STATUS.STATUS_OK) {
      const updatedDetails = jwt_decode(response.data.token);
      const secretKey = new SimpleCrypto(updatedDetails.userId);
      const user = {
        ...updatedDetails,
        refreshToken: response.data.refreshToken,
        token: response.data.token,
      };
      dispatch(setAuthUser(user));
      localStorage.setItem('user', JSON.stringify(secretKey.encrypt(user)));
      localStorage.setItem('id', JSON.stringify(updatedDetails.userId));
      req.headers.Authorization = `Bearer ${response.data.token}`;
    }

    return req;
  });

  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    async err => {
      const originalConfig = err.config;
      if (err.response) {
        // Access Token was expired
        if (err.response?.status === REQUEST_STATUS.UNAUTHORIZED) {
          dispatch(BasicAuth.onLogout());
        }
        if (err.response?.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }
      return Promise.reject(err);
    },
  );

  return axiosInstance;
};

export default useAxios;
