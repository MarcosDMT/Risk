import React, { useEffect } from 'react';
import { Slide, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import PageLoader from '../PageComponents/PageLoader';
import { fetchError } from '../../../redux/actions';

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const ContentLoader = () => {
  const { error, loading, message } = useSelector(({ common }) => common);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(fetchError(''));
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchError(''));
    }, 4000);

    return () => {
      clearTimeout(setTimeout);
    }
  }, [dispatch, message]);

  return (
    <React.Fragment>
      {loading && <PageLoader />}
      {
        <Snackbar
          open={Boolean(error)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={SlideTransition}>
          <Alert variant="filled" severity="error" onClose={onClose}>
            {Array.isArray(error) ? error?.map((err) => <li>{err}</li>) : error}
            {/* {error} */}
          </Alert>
        </Snackbar>
      }
      {
        <Snackbar
          open={Boolean(message)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={SlideTransition}>
          <Alert variant="filled" severity="success">
            {message}
          </Alert>
        </Snackbar>
      }
    </React.Fragment>
  );
};

export default ContentLoader;
