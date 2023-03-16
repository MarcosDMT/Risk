import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Zoom,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';


export const DepartmentPreview = props => {
    const [expanded, setExpanded] = React.useState(false);
    const useStyles = makeStyles();
  
    const handleChange = panel => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    const { deptDetails, isView} = props;
    const classes = useStyles();
    return (
      <>
        <>
          <div className={classes.root}>
                <TableContainer className={classes.inBuildAppCard}>
                  <Table size={'small'} aria-label="preview table">
                    {!isView && (
                      <TableHead className={classes.tableHeader}>
                        <TableRow>
                          <TableCell className={classes.tableHeaderCell}>Field Name</TableCell>
                          <TableCell className={classes.tableHeaderCell}>Input Value</TableCell>
                        </TableRow>
                      </TableHead>
                    )}
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <b>Department Name</b>
                        </TableCell>
                        <TableCell>{deptDetails?.name !== '' ? deptDetails?.name : 'Not Set'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Department Description</b>
                        </TableCell>
                        <TableCell>{deptDetails?.description !== '' ? deptDetails?.description : 'Not Set'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Department Head</b>
                        </TableCell>
                        <TableCell>{deptDetails?.departmentHead !== '' ? deptDetails?.departmentHead : 'Not Set'}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
          </div>
        </>
      </>
    );
  };