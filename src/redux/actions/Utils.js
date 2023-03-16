import { UTILS } from '../../@jumbo/constants/ActionTypes';
import { API_URL, REQUEST_STATUS } from '../../@jumbo/utils/apis';
import useAxios from '../../services/Requests/useAxios';

// get Frequencies
export const fetchRisksFrequencies = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_RISK_FREQUENCIES}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: UTILS.GET_RISK_FREQUENCIES,
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
export const fetchComplianceFrequencies = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_COMPLIANCE_FREQUENCIES}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: UTILS.GET_COMPLIANCE_FREQUENCIES,
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
export const fetchCurrencies = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_CURRENCIES}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: UTILS.GET_CURRENCIES,
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
export const fetchPriorities = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_COMPLIANCE_PRIORITIES}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: UTILS.GET_COMPLIANCE_PRIORITIES,
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
export const fetchCaseTypes = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_CASE_TYPES}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: UTILS.GET_CASE_TYPES,
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
export const fetchAppetiteTypes = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_APPETITE_TYPES}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: UTILS.GET_APPETITE_TYPES,
            payload: res.data,
          });
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
