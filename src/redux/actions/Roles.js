import useAxios from '../../services/Requests/useAxios';
import { API_URL, REQUEST_STATUS } from '../../@jumbo/utils/apis';
import { ROLES } from '../../@jumbo/constants/ActionTypes';
import { fetchError, fetchStart, fetchSuccess } from './Common';

export const fetchPermissions = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_PERMISSIONS}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: ROLES.GET_PERMISSIONS,
            payload: res.data,
          });
        }
        console.log(res)
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
};
export const fetchRoles = companyId => {
  return async dispatch => {
    dispatch(fetchStart());
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_ROLES}`, { headers: { Company: companyId } })
      .then(res => {
        dispatch(fetchSuccess());
        const data = [];
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          if (res.data.length !== 0) {
            res.data.map(datum =>
              data.push({
                id: datum.id,
                name: datum.name,
                description: datum.description,
              }),
            );
          }
          dispatch({
            type: ROLES.GET_ROLES,
            payload: res.data,
          });
          dispatch({
            type: ROLES.GET_ROLES_LIST,
            payload: data,
          });
        }
      })
      .catch(err => {
        dispatch(fetchError());
        // if (err.response.status !== undefined) {
        //   if (err.response.status === REQUEST_STATUS.BAD_REQUEST) {
        //     dispatch(fetchError(err.response.data.errors.Name[0]));
        //   }
        // } else {
        //   dispatch(fetchError(err.message));
        // }
      });
  };
};
export const addRole = (data, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.CREATE_ROLES}`, data, { headers: { Company: data.companyId } })
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Role Created Successfully!'));
          data.id = res.data?.id;
          dispatch({
            type: ROLES.ADD_ONE,
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
};
export const updateRole = (updatedData, callBackFunc) => {
  const data = {
    roleId: updatedData.id,
    permissions: updatedData.permissions,
  };
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.UPDATE_ROLES}`, data, { headers: { Company: updatedData.companyId } })
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Role Updated Successfully!'));
          dispatch({
            type: ROLES.UPDATE_ONE,
            payload: updatedData,
          });
          callBackFunc();
        }
      })
      .catch(err => {
        if (err.response?.status !== undefined) {
          if (err.response.status === REQUEST_STATUS.BAD_REQUEST) {
            dispatch(fetchError(err.response.data.errors?.Name[0]));
          } else if (err.response.status === REQUEST_STATUS.CONFLICT) {
            dispatch(fetchError(err.response.data?.messages[0]));
          } else {
            dispatch(fetchError(err.message));
          }
        }
      });
  };
};

export const filterRoles = filter => {
  return dispatch => {
    dispatch({
      type: ROLES.FILTER_ROLES,
      payload: filter,
    });
  };
};
