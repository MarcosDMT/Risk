import React from 'react';
import {Box, IconButton, makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {ArrowBack} from "@material-ui/icons";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  pageHeaderRoot: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
      flexDirection: 'row',
    },
  },
  titleRoot: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10,
    },
  },
}));

const PageHeader = ({ heading, hasBack, breadcrumbComponent, children, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const onHandleBack = () => {
    history.goBack()
  }

  return (
    <Box className={clsx(classes.pageHeaderRoot, 'page-header')} mb={{ xs: 2, md: 3, lg: 4 }} {...rest}>
      <Typography component="div" variant="h1" className={clsx(classes.titleRoot, 'title')}>
        {hasBack && <IconButton onClick={onHandleBack}><ArrowBack/></IconButton>} {heading}
      </Typography>
      <Box ml={{ sm: 'auto' }}>{breadcrumbComponent}</Box>

      {children}
    </Box>
  );
};

export default PageHeader;
