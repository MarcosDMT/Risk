import { RISK_UNIVERSE } from '../../@jumbo/constants/ActionTypes';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import { API_URL, REQUEST_STATUS } from '../../@jumbo/utils/apis';
import useAxios from '../../services/Requests/useAxios';
import { ActionSheet } from 'devextreme-react';
import download from 'downloadjs';
import { disableBodyScroll } from 'body-scroll-lock';

// export const fetchRisks = () => {
//   return async dispatch => {
//     let axiosInstance = useAxios(dispatch);
//     await axiosInstance
//       .get(`${API_URL.FETCH_RISKS}`)
//       .then(res => {
//         const {data} = res;
//         const formattedData = [...data];

//         formattedData.map((datum) =>{
//           const controlActions = [];
//           datum.controlActions.map((action) =>(
//             controlActions.push({
//               id: action.id,
//               name: action.action
//             })
//           ))
//           dispatch({
//             type: RISK_UNIVERSE.GET_ALL,
//             payload: res.data,
//           })
//       })
//       .catch(err => {
//         console.log(err.message);
//       });
//   }
// }

export const fetchRisks = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_RISKS}`)
      .then(res => {
        const { data } = res;
        let formattedData = [...data];
        // controlactions
        formattedData = formattedData.map(datum => {
          let controlActions = [],
            riskImpact = [],
            rootCauses = [];
          datum.controlActions.map(action =>
            controlActions.push({
              id: action.id,
              name: action.action,
            }),
          );
          datum.riskImpact.map(risk =>
            riskImpact.push({
              id: risk.id,
              name: risk.riskImpact,
            }),
          );
          datum.rootCauses.map(root =>
            rootCauses.push({
              id: root.id,
              name: root.rootCause,
            }),
          );
          return { ...datum, controlActions: controlActions, riskImpact: riskImpact, rootCauses: rootCauses };
        });
        dispatch({
          type: RISK_UNIVERSE.GET_ALL,
          payload: formattedData,
        });
        dispatch(fetchSuccess());
      })
      .catch(err => {
        console.log(err.message);
        dispatch(fetchError());
      });
  };
};

// create Bulk Risk
export const createBulkRisk = data => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.CREATE_BULK_RISK}`, data)
      .then(res => {
        if (res.data.success) {
          dispatch(fetchSuccess('Selected Risks Created Successfully!'));
        } else {
          dispatch(fetchError(res.data.message ?? 'Ann error occured try again later!'));
        }
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const downloadTemplate = () => dispatch => {
  return new Promise(async (resolve, reject) => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.DOWNLOAD_TEMPLATE}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => reject(new Error(error.message)));
  });
};

// FETCH RISK APPROVALS
export const fetchRiskApprovals = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_RISK_APPROVALS}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: RISK_UNIVERSE.GET_ALL,
            payload: res.data,
          });
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const fetchUploadedDocs = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_UPLOADEDDOCS}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: RISK_UNIVERSE.GET_UPLOADEDDOCNAMES,
            payload: res.data,
          });
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const approveRiskCompliance = data => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.APPROVE_RISK}`, data)
      .then(res => {
        if (res.data.success) {
          dispatch(fetchSuccess('Risk Approved Successfully!'));
        } else {
          dispatch(fetchError(res.data.message ?? 'Ann error occured try again later!'));
        }
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const postUncreatedDocuments = (data, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.UNCREATED_DOCS}`, data)
      .then(res => {
        const { data } = res;
        let formattedData = [];
        if (data.length > 0) {
          data.map(datum => formattedData.push({ ...datum.riskUniverse, errorMessages: datum.errorMessages }));
          dispatch({
            type: RISK_UNIVERSE.GET_UPLOADED_RISKS,
            payload: formattedData,
          });
          dispatch(fetchSuccess('Document data fetched successfully!'));
          callBackFunc();
        } else {
          dispatch(fetchError('No records found!'));
        }
      })
      .catch(err => {
        dispatch(fetchError('An Error Occured!'));
        console.log(err);
      });
  };
};

export const updateUploads = updatedData => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .put(`${API_URL.UPDATE_UPLOADED_RISKS}`, updatedData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Risk Updated Successfully!'));
          dispatch({
            type: RISK_UNIVERSE.UPDATE_UPLOADED_RISKS,
            payload: updatedData,
          });
          // callBackFunc();
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
};

export const uploadRiskDocument = (data, callBackFunc) => async dispatch => {
  // return async dispatch => {
  let axiosInstance = useAxios(dispatch);
  await axiosInstance
    .post(`${API_URL.UPLOAD_TEMPLATE}`, data)
    .then(res => {
      //format data
      const { data } = res;
      let formattedData = [];

      if (data && data.length > 0) {
        data.map(datum => formattedData.push({ ...datum.riskUniverse, errorMessages: datum.errorMessages }));
        dispatch({
          type: RISK_UNIVERSE.GET_UPLOADED_RISKS,
          payload: formattedData,
        });
        callBackFunc();
      }
      console.log(res);
      dispatch(fetchSuccess('Document Uploaded Successfully!'));
    })
    .catch(err => {
      console.log(err.messages);
      dispatch(fetchError(err.messages[0] ?? 'An error occured.'));
      // console.log(err)
      // dispatch(fetchError('Document Upload Error'));
    });
  // };
};

export const updateRiskDetail = data => {
  return dispatch => {
    dispatch({
      type: RISK_UNIVERSE.UPDATE_UPLOADED_RISKS,
      payload: data,
    });
  };
};

// export const uploadRiskDocument = data => async dispatch =>{
//   let axiosInstance = useAxios(dispatch);
//   const res = await axiosInstance.post(`${API_URL.UPLOAD_TEMPLATE}`, data)
//   if(res.status === 200){
//     dispatch(fetchSuccess('Document Uploaded Successfully'))
//     // dispatch({
//     //   type: RISK_UNIVERSE.UPLOAD_TEMPLATE,
//     //   payload: res.data
//     // })
//     console.log(res.data);
//     return res.data
//   }
//   return null;
// }

// export const getGlobalRisk = () =>{
//   return async dispatch =>{
//     let axiosInstance = useAxios(dispatch);
//   }
// }

export const assessRiskUniverse = data => async dispatch => {
  let axiosInstance = useAxios(dispatch);
  const res = await axiosInstance.post(`${API_URL.ASSESS_RISK}`, data);
  if (res.status === 200) {
    return res.data;
  }
  return null;
};


export const calculateResidualRisk = data => async dispatch => {
  let axiosInstance = useAxios(dispatch);
  const res = await axiosInstance.post(`${API_URL.CALCULATE_RESIDUAL}`, data);
  if (res.status === 200) {
    return res.data;
  }
  return null;
};

const formatToastMessage = (err) =>{
  let error = JSON.parse(err.response.data);
  let convertedObject = Object.entries(error.errors);
  let result = convertedObject?.map(item => item[1][0])

  return result;
}

export const addRisk = (data, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    dispatch(fetchStart());
    const formData = { ...data };
    const riskImpact = [];
    data.riskImpact.map(datum =>
      riskImpact.push({
        id: datum.id,
        riskImpact: datum.name,
      }),
    );
    const rootCauses = [];
    data.rootCauses.map(datum =>
      rootCauses.push({
        id: datum.id,
        rootCause: datum.name,
      }),
    );
    const controlActions = [];
    data.controlActions.map(datum =>
      controlActions.push({
        id: datum.id,
        action: datum.name,
      }),
    );
    formData.controlActions = controlActions;
    formData.rootCauses = rootCauses;
    formData.riskImpact = riskImpact;

    await axiosInstance
      .post(`${API_URL.CREATE_RISK}`, formData)
      .then(res => {
        console.log('RISK SUCCESS ', res);
        if (res.data.success === true) {
          dispatch(fetchSuccess('Risk Created Successfully!'));
          callBackFunc();
          data.id = res.data?.id;
          dispatch({
            type: RISK_UNIVERSE.ADD_ONE,
            payload: data,
          });
        } else if (res.data.success === false) {
          dispatch(fetchError(res.data.message));
        }
      })
       .catch(err => {
        
        if (err.response.status === 400) {
          dispatch(fetchError(formatToastMessage(err)));
        }
      });
  };
  // return dispatch => {
  //   dispatch({
  //     type: DEPARTMENTS.ADD_ONE,
  //     payload: data,
  //   });
  //   dispatch(fetchSuccess('Department Created Successfully!'));
  // };
};
export const updateRisk = (updatedData, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    dispatch(fetchStart());
    await axiosInstance
      .post(`${API_URL.UPDATE_RISK}`, updatedData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Risk Updated Successfully!'));
          dispatch({
            type: RISK_UNIVERSE.UPDATE_ONE,
            payload: updatedData,
          });
          callBackFunc();
        }
      })
      .catch(err => {
        if (err.response.status === 400) {
          dispatch(fetchError(formatToastMessage(err)));
        }
      });
  };
};

export const deleteRisk = data => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    dispatch(fetchStart());
    await axiosInstance
      .post(`${API_URL.DELETE_RISK}`, data)
      .then(res => {
        if (res.status === 200) {
          dispatch(fetchSuccess('Risk Deleted Successfully!'));
        }
      })
      .catch(err => {
        dispatch(fetchError(err.message));
      });
  };
};

// export const deleteRisk = id => {
//   return dispatch => {
//     dispatch({
//       type: RISK_UNIVERSE.DELETE_ONE,
//       payload: id,
//     });
//     dispatch(fetchSuccess('Risk Removed Successfully!'));
//   };
// };
