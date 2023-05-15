import { COMPLIANCE, DEPARTMENTS } from '../../@jumbo/constants/ActionTypes';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import { API_URL, REQUEST_STATUS } from '../../@jumbo/utils/apis';
import useAxios from '../../services/Requests/useAxios';

const formatToastMessage = err => {
  let error = JSON.parse(err.response.data);
  let convertedObject = Object.entries(error.errors);
  let result = convertedObject?.map(item => item[1][0]);

  return result;
};

//------------------ Legal Compliance -----------------------//
export const fetchLegalCompliance = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_LEGAL}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: COMPLIANCE.LEGAL.GET_ALL,
            payload: res.data,
          });
        }
      })
      .catch(err => {
        if (err.response.status === 400) {
          dispatch(fetchError(formatToastMessage(err)));
        }
      });
  };
};
export const addLegalCompliance = (data, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.CREATE_LEGAL}`, data)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Legal Compliance Created Successfully!'));
          data.id = res.data?.id;
          dispatch({
            type: COMPLIANCE.LEGAL.ADD_ONE,
            payload: data,
          });
          callBackFunc();
        }
        console.log(res);
      })
      .catch(err => {
        if (err.response.status === 400) {
          if (err.response.status === REQUEST_STATUS.BAD_REQUEST) {
            dispatch(fetchError(formatToastMessage(err)));
          }
        }
      });
  };
};
export const updateLegalCompliance = (updatedData, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.UPDATE_LEGAL}`, updatedData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Compliance Updated Successfully!'));
          dispatch({
            type: COMPLIANCE.LEGAL.UPDATE_ONE,
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
  //     type: DEPARTMENTS.UPDATE_ONE,
  //     payload: updatedData,
  //   });
  //   dispatch(fetchSuccess('Department Updated Successfully!'));
  // };
};
export const deleteLegalCompliance = id => {
  return dispatch => {
    dispatch({
      type: COMPLIANCE.LEGAL.DELETE_ONE,
      payload: id,
    });
    dispatch(fetchSuccess('Compliance Removed Successfully!'));
  };
};

// ------------------ Enterprise Compliance -----------------------//
export const fetchEnterpriseCompliance = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_ENTERPRISE}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: COMPLIANCE.ENTERPRISE.GET_ALL,
            payload: res.data,
          });
        }
      })
      .catch(err => {
        dispatch(fetchError(err.message));
      });
  };
};

export const fetchEnterpriseComplianceMain = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    dispatch(fetchStart());
    await axiosInstance
      .get(`${API_URL.FETCH_ENTERPRISE_MAIN}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: COMPLIANCE.ENTERPRISE.GET_MAIN,
            payload: res.data,
          });
          dispatch(fetchSuccess());
        }
      })
      .catch(err => {
        dispatch(fetchError(err.message));
      });
  };
};

export const fetchEnterpriseComplianceSub = data => {
  console.log('ENTERPRISE DATA ', data);
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    dispatch(fetchStart());
    await axiosInstance
      .post(`${API_URL.FETCH_ENTERPRISE_SUB}`, data)
      .then(res => {
        dispatch({
          type: COMPLIANCE.ENTERPRISE.GET_SUB,
          payload: res.data,
        });
        dispatch(fetchSuccess());
      })
      .catch(err => {
        dispatch(fetchError());
        //dispatch(err.message)
      });
  };
};

export const fetchEnterpriseComplianceApproved = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    dispatch(fetchStart());
    await axiosInstance
      .get(`${API_URL.FETCH_ENTERPRISE_APPROVED}`)
      .then(res => {
        const formattedData = [];
        res.data.map(datum => formattedData.push(datum.compliance));

        dispatch({
          type: COMPLIANCE.ENTERPRISE.GET_APPROVAL,
          payload: formattedData,
        });
        dispatch(fetchSuccess());
      })
      .catch(err => {
        dispatch(fetchError());
        //dispatch(err.message)
      });
  };
};

export const fetchEnterpriseComplianceComplied = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    dispatch(fetchStart());
    await axiosInstance
      .get(`${API_URL.FETCH_ENTERPRISE_COMPLIED}`)
      .then(res => {
        const formattedData = [];
        res.data.map(datum => formattedData.push(datum.compliance));
        dispatch({
          type: COMPLIANCE.ENTERPRISE.GET_COMPLIANT,
          payload: formattedData,
        });
        dispatch(fetchSuccess());
      })
      .catch(err => {
        dispatch(fetchError());
      });
  };
};

export const complyEnterpriseCompliance = (data, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.COMPLY_ENTERPRISE}`, data)
      .then(res => {
        if (res?.data?.success) {
          dispatch(fetchSuccess('Operation successful!'));
          callBackFunc();
        } else {
          dispatch(fetchError(res.data?.message));
        }
      })
      .catch(err => {
        dispatch(fetchError(err.message));
      });
  };
};

export const addEnterpriseCompliance = (data, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    dispatch(fetchStart());
    await axiosInstance
      .post(`${API_URL.CREATE_ENTERPRISE}`, data)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Enterprise Compliance Created Successfully!'));
          data.id = res.data?.id;
          dispatch({
            type: COMPLIANCE.ENTERPRISE.ADD_ONE,
            payload: data,
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
export const updateEnterpriseCompliance = (updatedData, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    const formData = {
      id: updatedData.id,
      title: updatedData.title,
      description: updatedData.description,
      authority: updatedData.authority,
      companyId: updatedData.companyId,
      organization: updatedData.organization,
      penaltyTypeName: updatedData.penaltyTypeName,
      penalty: updatedData.penalty,
      penaltyNarrative: updatedData.penaltyNarrative,
      penaltyCurrency: updatedData.penaltyCurrency,
      primaryOwnerId: updatedData.primaryOwnerId,
      secondaryOwnerId: updatedData.secondaryOwnerId,
      escalationOwnerId: updatedData.escalationOwnerId,
      priority: updatedData.priority,
      frequencyId: updatedData.frequencyId,
      active: updatedData.active,
      submissionDeadline: updatedData.submissionDeadline,
      nextDeadline: updatedData.nextDeadline,
      sourceDoc: updatedData.sourceDoc,
      isSubCompliance: updatedData.isSubCompliance,
      hasSubCompliance: updatedData.hasSubCompliance,
      subId: updatedData.subId,
      hasAttachment: updatedData.hasAttachment,
    };
    await axiosInstance
      .post(`${API_URL.UPDATE_ENTERPRISE}`, formData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Compliance Updated Successfully!'));
          dispatch({
            type: COMPLIANCE.ENTERPRISE.UPDATE_ONE,
            payload: formData,
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
  // return dispatch => {
  //   dispatch({
  //     type: DEPARTMENTS.UPDATE_ONE,
  //     payload: updatedData,
  //   });
  //   dispatch(fetchSuccess('Department Updated Successfully!'));
  // };
};

export const deleteEnterpriseCompliance = data => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.DELETE_ENTERPRISE}`, data)
      .then(res => {
        dispatch(fetchSuccess('Compliance Deleted Successfully!'));
      })
      .catch(err => {
        dispatch(fetchError(err.message));
      });
  };
};

// get enterprise history
export const getEnterpriseComplianceHistory = data => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.GET_HISTORY}`, data)
      .then(res => {
        dispatch(fetchSuccess('Compliance History Retrieved successfully!'));
      })
      .catch(err => {
        dispatch(fetchError(err.message));
      });
  };
};

//------------------ Statutory Compliance -----------------------//
export const fetchStatutoryComplianceMain = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    dispatch(fetchStart());
    await axiosInstance
      .get(`${API_URL.FETCH_STATUTORY_MAIN}`)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: COMPLIANCE.STATUTORY.GET_MAIN,
            payload: res.data,
          });
          dispatch(fetchSuccess());
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
export const fetchStatutoryCompliance = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance.get(`${API_URL.FETCH_STATUTORY_MAIN}`).then(res => {
      if (res.status === REQUEST_STATUS.STATUS_OK) {
        dispatch({
          type: COMPLIANCE.STATUTORY.GET_ALL,
          payload: res.data,
        });
      }
    });
  };
};

export const fetchStatutoryComplianceApproved = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    dispatch(fetchStart());
    await axiosInstance
      .get(`${API_URL.FETCH_STATUTORY_APPROVED}`)
      .then(res => {
        const formattedData = [];
        res.data.map(datum => formattedData.push(datum.compliance));

        dispatch({
          type: COMPLIANCE.ENTERPRISE.GET_APPROVAL,
          payload: formattedData,
        });
        dispatch(fetchSuccess());
      })
      .catch(err => {
        dispatch(fetchError());
        //dispatch(err.message)
      });
  };
};

export const fetchStatutoryComplianceComplied = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    dispatch(fetchStart());
    await axiosInstance
      .get(`${API_URL.FETCH_ENTERPRISE_COMPLIED}`)
      .then(res => {
        const formattedData = [];
        res.data.map(datum => formattedData.push(datum.compliance));
        dispatch({
          type: COMPLIANCE.ENTERPRISE.GET_COMPLIANT,
          payload: formattedData,
        });
        dispatch(fetchSuccess());
      })
      .catch(err => {
        dispatch(fetchError());
      });
  };
};

export const complyStatutoryCompliance = (data, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.COMPLY_STATUTORY}`, data)
      .then(res => {
        if (res?.data?.success) {
          dispatch(fetchSuccess('Operation successful!'));
          callBackFunc();
        } else {
          dispatch(fetchError(res.data?.message));
        }
      })
      .catch(err => {
        dispatch(fetchError(err.message));
      });
  };
};

export const fetchCompliances = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .get(`${API_URL.FETCH_COMPLIANCES}`)
      .then(res => {
        const { data } = res;
        const formattedData = [];
        if (data.length > 0) {
          data.map(datum => formattedData.push({ ...datum.compliance }));
        }

        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch({
            type: COMPLIANCE.STATUTORY.GET_COMPLIANCES,
            payload: formattedData,
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
};

// FETCH APPROVALS
export const fetchApprovals = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance.get(`${API_URL.FETCH_APPROVALS}`).then(res => {
      const { data } = res;
      const formattedData = [];
      if (data.length > 0) {
        data.map(datum => formattedData.push({ ...datum.compliance }));
      }

      if (res.status === REQUEST_STATUS.STATUS_OK) {
        dispatch({
          type: COMPLIANCE.STATUTORY.GET_APPROVALS,
          payload: formattedData,
        });
      }
    });
  };
};

// export const fetchHistory = () => {
//   return async dispatch => {
//     let axiosInstance = useAxios(dispatch);
//     await axiosInstance
//       .get(`${API_URL.FETCH_HISTORY}`)
//       .then(res => {
//         console.log(res.data);
//         if (res.status === REQUEST_STATUS.STATUS_OK) {
//           dispatch({
//             type: COMPLIANCE.STATUTORY.GET_HISTORY,
//             payload: res.data,
//           });
//         }
//       })
//   };
// };

// FETCH HISTORY
export const fetchHistory = () => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance.get(`${API_URL.FETCH_HISTORY}`).then(res => {
      const { data } = res;
      let formattedData = [];
      if (data.length > 0) {
        data.map(datum => formattedData.push({ ...datum.complianceHistory }));
      }
      // formattedData.complianceHistory

      if (res.status === REQUEST_STATUS.STATUS_OK) {
        dispatch({
          type: COMPLIANCE.STATUTORY.GET_HISTORY,
          payload: formattedData,
        });
      }
    });
  };
};

export const fetchStatutoryComplianceSub = data => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    dispatch(fetchStart());
    await axiosInstance
      .post(`${API_URL.FETCH_STATUTORY_SUB}`, data)
      .then(res => {
        dispatch({
          type: COMPLIANCE.STATUTORY.GET_SUB,
          payload: res.data,
        });
        dispatch(fetchSuccess());
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

export const addStatutoryCompliance = (data, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    dispatch(fetchStart());
    await axiosInstance
      .post(`${API_URL.CREATE_STATUTORY}`, data)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Statutory Compliance Created Successfully!'));
          data.id = res.data?.id;
          dispatch({
            type: COMPLIANCE.STATUTORY.ADD_ONE,
            payload: data,
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
export const updateStatutoryCompliance = (updatedData, callBackFunc) => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    const formData = {
      id: updatedData.id,
      title: updatedData.title,
      description: updatedData.description,
      authority: updatedData.authority,
      companyId: updatedData.companyId,
      organization: updatedData.organization,
      penaltyTypeName: updatedData.penaltyTypeName,
      penalty: updatedData.penalty,
      penaltyNarrative: updatedData.penaltyNarrative,
      penaltyCurrency: updatedData.penaltyCurrency,
      primaryOwnerId: updatedData.primaryOwnerId,
      secondaryOwnerId: updatedData.secondaryOwnerId,
      escalationOwnerId: updatedData.escalationOwnerId,
      priority: updatedData.priority,
      frequencyId: updatedData.frequencyId,
      active: updatedData.active,
      submissionDeadline: updatedData.submissionDeadline,
      nextDeadline: updatedData.nextDeadline,
      sourceDoc: updatedData.sourceDoc,
      isSubCompliance: updatedData.isSubCompliance,
      hasSubCompliance: updatedData.hasSubCompliance,
      subId: updatedData.subId,
      hasAttachment: updatedData.hasAttachment,
    };
    await axiosInstance
      .post(`${API_URL.UPDATE_STATUTORY}`, formData)
      .then(res => {
        if (res.status === REQUEST_STATUS.STATUS_OK) {
          dispatch(fetchSuccess('Compliance Updated Successfully!'));
          dispatch({
            type: COMPLIANCE.STATUTORY.UPDATE_ONE,
            payload: formData,
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
  // return dispatch => {
  //   dispatch({
  //     type: DEPARTMENTS.UPDATE_ONE,
  //     payload: updatedData,
  //   });
  //   dispatch(fetchSuccess('Department Updated Successfully!'));
  // };
};

export const deleteStatutoryCompliance = data => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.DELETE_STATUTORY}`, data)
      .then(res => {
        dispatch(fetchSuccess('Compliance Deleted Successfully!'));
      })
      .catch(err => {
        dispatch(fetchError(err.message));
      });
  };
};

// APPROVE COMPLIANCE
export const approveCompliance = data => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.APPROVE_ENTERPRISE}`, data)
      .then(res => {
        if (res.data.success) {
          dispatch(fetchSuccess('Compliance Approved Successfully!'));
        } else {
          dispatch(fetchError(res.data.message ?? 'An error occurred try again later!'));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const approveStatutoryCompliance = data => {
  return async dispatch => {
    let axiosInstance = useAxios(dispatch);
    await axiosInstance
      .post(`${API_URL.APPROVE_STATUTORY}`, data)
      .then(res => {
        if (res.data.success) {
          dispatch(fetchSuccess('Compliance Approved Successfully!'));
        } else {
          dispatch(fetchError(res.data.message ?? 'An error occurred try again later!'));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// COMPLY COMPLIANCE
// export const complyCompliance = data => {
//   return async dispatch => {
//     let axiosInstance = useAxios(dispatch);
//     await axiosInstance
//       .post(`${API_URL.COMPLY_COMPLIANCE}`, data)
//       .then(res => {
//         if (res.data.success) {
//           dispatch(fetchSuccess('Complied Successfully!'));
//         } else {
//           dispatch(fetchError(res.data.message ?? 'Ann error occured try again later!'));
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
// };
