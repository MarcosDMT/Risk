import { DEPARTMENTS, RISK_PARAMS } from '../../@jumbo/constants/ActionTypes';
import { fetchError, fetchSuccess } from './Common';
import { API_URL, REQUEST_STATUS } from '../../@jumbo/utils/apis';
import useAxios from '../../services/Requests/useAxios';

//-----------------------Risk Categories Actions ---------------------------//

export const fetchRiskCategories = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_RISK_CATEGORIES}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          const data = [];
          if (res.data.length !== 0) {
            res.data.map(datum =>
              data.push({
                id: datum.id,
                name: datum.categoryName,
                description: datum.categoryDescription,
                companyId: datum.companyId,
                //color: res.data.colorCode,
              }),
            );
          }
          dispatch({
            type: RISK_PARAMS.RISK_CATEGORIES.GET_ALL,
            payload: data,
          });
        }
      })
      .catch(err => console.log(err));
    // dispatch({
    //   type: RISK_PARAMS.RISK_CATEGORIES.GET_ALL,
    //   payload: List,
    // });
  };
};
export const addRiskCategory = (data, callBackFunc) => {
  const formData = {
    categoryName: data.name,
    categoryDescription: data.description,
    companyId: data.companyId,
  };
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.CREATE_RISK_CATEGORY}`, formData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Record Created Successfully!'));
          data.id = res.data?.id;
          dispatch({
            type: RISK_PARAMS.RISK_CATEGORIES.ADD_ONE,
            payload: data,
          });
          callBackFunc();
        }
      })
      .catch(err => {
        if (err.response.status !== undefined) {
          if (err.response.status === REQUEST_STATUS.BAD_REQUEST) {
            dispatch(fetchError(err.response.data.errors?.categoryName[0]));
          } else {
            dispatch(fetchError(err.message));
          }
        }
      });
  };
  // return dispatch => {
  //   dispatch({
  //     type: RISK_PARAMS.RISK_CATEGORIES.ADD_ONE,
  //     payload: data,
  //   });
  //   dispatch(fetchSuccess('Item Created Successfully!'));
  // };
};
export const updateRiskCategory = (updatedData, callBackFunc) => {
  const formData = {
    id: updatedData.id,
    categoryName: updatedData.name,
    categoryDescription: updatedData.description,
    companyId: updatedData.companyId,
  };
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.UPDATE_RISK_CATEGORY}`, formData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Record Updated Successfully!'));
          dispatch({
            type: RISK_PARAMS.RISK_CATEGORIES.UPDATE_ONE,
            payload: updatedData,
          });
          callBackFunc();
        }
      })
      .catch(err => {
        if (err.response?.status !== undefined) {
          if (err.response.status === REQUEST_STATUS.BAD_REQUEST) {
            dispatch(fetchError(err.response.data.errors?.categoryName[0]));
          }
        } else {
          dispatch(fetchError(err.message));
        }
      });
  };
  // return dispatch => {
  //   dispatch({
  //     type: DEPARTMENTS.UPDATE_ONE,
  //     payload: updatedData,
  //   });
  //   dispatch(fetchSuccess('Department Updated Successfully!'));
  // };
};

export const deleteRiskCategory = data => {
  console.log(data);
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.DELETE_RISK_CATEGORY}`, data)
      .then(res => {
        dispatch(fetchSuccess('Risk Category Deleted Successfully!'));
      })
      .catch(err => {
        dispatch(fetchError(err.message));
      });
  };
};

// export const deleteRiskCategory = id => {
//   return dispatch => {
//     dispatch({
//       type: RISK_PARAMS.RISK_CATEGORIES.DELETE_ONE,
//       payload: id,
//     });
//     dispatch(fetchSuccess('Record Removed Successfully!'));
//   };
// };

//-----------------------Risk Controls Actions ---------------------------//

export const fetchRiskControls = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_RISK_CONTROLS}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          const data = [];
          if (res.data.length !== 0) {
            res.data.map(datum =>
              data.push({
                id: datum.id,
                name: datum.actualCategoryControlName,
                description: datum.actualCategoryControlDescription,
                color: datum.actualColorCode,
                companyId: datum.companyId,
              }),
            );
          }
          dispatch({
            type: RISK_PARAMS.RISK_CONTROLS.GET_ALL,
            payload: data,
          });
        }
      })
      .catch(err => console.log(err));
    // dispatch({
    //   type: RISK_PARAMS.RISK_CONTROLS.GET_ALL,
    //   payload: List,
    // });
  };
};
export const addRiskControls = (data, callBackFunc) => {
  const formData = {
    categoryControlName: data.name,
    categoryControlDescription: data.description,
    colorCode: data.color,
  };
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.CREATE_RISK_CONTROLS}`, formData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Record Created Successfully!'));
          data.id = res.data?.id;
          dispatch({
            type: RISK_PARAMS.RISK_CONTROLS.ADD_ONE,
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
  //     type: RISK_PARAMS.RISK_CONTROLS.ADD_ONE,
  //     payload: data,
  //   });
  //   dispatch(fetchSuccess('Item Created Successfully!'));
  // };
};
export const updateRiskControls = (updatedData, callBackFunc) => {
  const formData = {
    id: updatedData.id,
    categoryControlName: updatedData.name,
    categoryControlDescription: updatedData.description,
    colorCode: updatedData.color,
  };
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.UPDATE_RISK_CONTROLS}`, formData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Record Updated Successfully!'));
          dispatch({
            type: RISK_PARAMS.RISK_CONTROLS.UPDATE_ONE,
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
  //     type: RISK_PARAMS.RISK_CONTROLS.UPDATE_ONE,
  //     payload: updatedData,
  //   });
  //   dispatch(fetchSuccess('Record Updated Successfully!'));
  // };
};
export const deleteRiskControls = id => {
  return dispatch => {
    dispatch({
      type: RISK_PARAMS.RISK_CONTROLS.DELETE_ONE,
      payload: id,
    });
    dispatch(fetchSuccess('Record Removed Successfully!'));
  };
};

//-----------------------Risk Probabilities Actions ---------------------------//

export const fetchRiskProbabilities = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_PROBABILITY}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          const data = [];
          if (res.data.length !== 0) {
            res.data.map(datum =>
              data.push({
                id: datum.id,
                name: datum.actualName,
                color: datum.actualColor,
              }),
            );
          }
          dispatch({
            type: RISK_PARAMS.RISK_PROBABILITY.GET_ALL,
            payload: data,
          });
        }
      })
      .catch(err => console.log(err));
    // dispatch({
    //   type: RISK_PARAMS.RISK_PROBABILITY.GET_ALL,
    //   payload: List,
    // });
  };
};
export const addRiskProbabilities = (data, callBackFunc) => {
  const formData = {
    name: data.name,
    color: data.color,
  };
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.CREATE_PROBABILITY}`, formData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Record Created Successfully!'));
          data.id = res.data?.id;
          dispatch({
            type: RISK_PARAMS.RISK_PROBABILITY.ADD_ONE,
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
  //     type: RISK_PARAMS.RISK_PROBABILITY.ADD_ONE,
  //     payload: data,
  //   });
  //   dispatch(fetchSuccess('Item Created Successfully!'));
  // };
};
export const updateRiskProbabilities = (updatedData, callBackFunc) => {
  const formData = {
    id: updatedData.id,
    name: updatedData.name,
    color: updatedData.color,
  };
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.UPDATE_PROBABILITY}`, formData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Record Updated Successfully!'));
          dispatch({
            type: RISK_PARAMS.RISK_PROBABILITY.UPDATE_ONE,
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
  //     type: RISK_PARAMS.RISK_PROBABILITY.UPDATE_ONE,
  //     payload: updatedData,
  //   });
  //   dispatch(fetchSuccess('Record Updated Successfully!'));
  // };
};
export const deleteRiskProbabilities = id => {
  return dispatch => {
    dispatch({
      type: RISK_PARAMS.RISK_PROBABILITY.DELETE_ONE,
      payload: id,
    });
    dispatch(fetchSuccess('Record Removed Successfully!'));
  };
};

//-----------------------Risk Severity Actions ---------------------------//

export const fetchRiskSeverities = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_SEVERITY}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          const data = [];
          if (res.data.length !== 0) {
            res.data.map(datum =>
              data.push({
                id: datum.id,
                name: datum.actualName,
                color: datum.actualColor,
              }),
            );
          }
          dispatch({
            type: RISK_PARAMS.RISK_SEVERITY.GET_ALL,
            payload: data,
          });
        }
      })
      .catch(err => console.log(err));
    // dispatch({
    //   type: RISK_PARAMS.RISK_SEVERITY.GET_ALL,
    //   payload: List,
    // });
  };
};
export const addRiskSeverities = (data, callBackFunc) => {
  const formData = {
    name: data.name,
    color: data.color,
  };
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.CREATE_SEVERITY}`, formData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Record Created Successfully!'));
          data.id = res.data?.id;
          dispatch({
            type: RISK_PARAMS.RISK_SEVERITY.ADD_ONE,
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
  //     type: RISK_PARAMS.RISK_SEVERITY.ADD_ONE,
  //     payload: data,
  //   });
  //   dispatch(fetchSuccess('Item Created Successfully!'));
  // };
};
export const updateRiskSeverities = (updatedData, callBackFunc) => {
  const formData = {
    name: updatedData.name,
    color: updatedData.color,
  };
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.UPDATE_SEVERITY}`, formData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Record Updated Successfully!'));
          dispatch({
            type: RISK_PARAMS.RISK_SEVERITY.UPDATE_ONE,
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
  //     type: RISK_PARAMS.RISK_CONTROLS.UPDATE_ONE,
  //     payload: updatedData,
  //   });
  //   dispatch(fetchSuccess('Record Updated Successfully!'));
  // };
};
export const deleteRiskSeverities = id => {
  return dispatch => {
    dispatch({
      type: RISK_PARAMS.RISK_CONTROLS.DELETE_ONE,
      payload: id,
    });
    dispatch(fetchSuccess('Record Removed Successfully!'));
  };
};

//-----------------------Risk Loss Type Actions ---------------------------//

export const fetchRiskLossTypes = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_LOSS_TYPES}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          const data = [];
          if (res.data.length !== 0) {
            res.data.map(datum =>
              data.push({
                id: datum.id,
                name: datum.actualLossTypeName,
                description: datum.actualLossTypeNameDescription,
                companyId: datum.companyId,
              }),
            );
          }
          dispatch({
            type: RISK_PARAMS.LOSS_TYPES.GET_ALL,
            payload: data,
          });
        }
      })
      .catch(err => console.log(err));
    // dispatch({
    //   type: RISK_PARAMS.LOSS_TYPES.GET_ALL,
    //   payload: List,
    // });
  };
};
export const addRiskLossTypes = (data, callBackFunc) => {
  const formData = {
    lossTypeName: data.name,
    lossTypeNameDescription: data.description,
  };
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.CREATE_LOSS_TYPES}`, formData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Record Created Successfully!'));
          data.id = res.data?.id;
          dispatch({
            type: RISK_PARAMS.LOSS_TYPES.ADD_ONE,
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
  //     type: RISK_PARAMS.LOSS_TYPES.ADD_ONE,
  //     payload: data,
  //   });
  //   dispatch(fetchSuccess('Item Created Successfully!'));
  // };
};
export const updateRiskLossTypes = (updatedData, callBackFunc) => {
  const formData = {
    lossTypeName: updatedData.name,
    lossTypeNameDescription: updatedData.description,
  };
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.UPDATE_LOSS_TYPES}`, formData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Record Updated Successfully!'));
          dispatch({
            type: RISK_PARAMS.LOSS_TYPES.UPDATE_ONE,
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
  //     type: RISK_PARAMS.LOSS_TYPES.UPDATE_ONE,
  //     payload: updatedData,
  //   });
  //   dispatch(fetchSuccess('Record Updated Successfully!'));
  // };
};
export const deleteRiskLossTypes = id => {
  return dispatch => {
    dispatch({
      type: RISK_PARAMS.LOSS_TYPES.DELETE_ONE,
      payload: id,
    });
    dispatch(fetchSuccess('Record Removed Successfully!'));
  };
};

//------------------------ Matrix ------------------------------------------//
export const fetchAllMatrix = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_ALL_MATRIX}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: RISK_PARAMS.RISK_CONTROLS.GET_ALL,
            payload: res.data,
          });
        }
      })
      .catch(err => console.log(err));
    // dispatch({
    //   type: RISK_PARAMS.RISK_CONTROLS.GET_ALL,
    //   payload: List,
    // });
  };
};
export const fetchMatrix = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_MATRIX}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          if (res.data.success) {
            dispatch({
              type: RISK_PARAMS.MATRIX.GET_ONE,
              payload: res.data?.message,
            });
          }
        }
      })
      .catch(err => console.log(err));
    // dispatch({
    //   type: RISK_PARAMS.RISK_CONTROLS.GET_ALL,
    //   payload: List,
    // });
  };
};
export const updateMatrix = (updatedData, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.UPDATE_MATRIX}`, updatedData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Record Updated Successfully!'));
          dispatch(fetchMatrix());
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
  //     type: RISK_PARAMS.RISK_CONTROLS.UPDATE_ONE,
  //     payload: updatedData,
  //   });
  //   dispatch(fetchSuccess('Record Updated Successfully!'));
  // };
};
