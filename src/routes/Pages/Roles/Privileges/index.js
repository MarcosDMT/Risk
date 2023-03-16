import React, { useEffect, useState } from 'react';
import useStyles from '../index.style';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
    AccordionDetails, Accordion, AccordionSummary, List, ListItem, ListItemText, ListItemIcon,
  TableRow,
  Typography,
} from '@material-ui/core';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import AppTextInput from '../../../../@jumbo/components/Common/formElements/AppTextInput';
import CmtImage from "../../../../@coremat/CmtImage";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Privileges = props => {
  const { selectedRole, handleOnSelectAll, setSelectedRole, permissions, onPermissionSelection, showForm, isEditable } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    let data = [...expanded];
    if (!isExpanded){
      data.splice(data.indexOf(panel),1);
    }
    else{
      data.push(panel);
    }
    setExpanded(data);
  };
  const handleOnChange = event => {
    onPermissionSelection(event);
  };
  const handleCheckAll = event =>{
    let checkboxes = document.getElementsByName('permissions-checkboxes');
    let data = [];
    for (let i=0; i< checkboxes.length; i++){
       data.push(checkboxes[i].value);
    }
    handleOnSelectAll(data);
  }
  const handleUnCheckAll = event =>{
    handleOnSelectAll([]);
  }
  const checkPermission = permission => {
    const { permissions } = selectedRole;
    const value = permissions.find(element => element === permission);
    return value !== undefined;
  };


  useEffect(() => {
    const perms = [];
    permissions.map(permission => perms.push(permission.name));
    setExpanded(perms);
  }, [permissions])

  return (
    <Box className={classes.inBuildAppMainContent}>
      <PerfectScrollbar className={classes.perfectScrollbarContactCon}>
        <Box m={5} height={'auto'}>
          {showForm ? (
              <Box mb={2}>
                <GridContainer>
              <Grid item md={12}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label="Role Name"
                  required
                  disabled={!isEditable}
                  value={selectedRole.name}
                  onChange={e => setSelectedRole({ ...selectedRole, name: e.target.value })}
                />
              </Grid>
              <Grid item md={12}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label="Role Description"
                  disabled={!isEditable}
                  value={selectedRole.description}
                  onChange={e => setSelectedRole({ ...selectedRole, description: e.target.value })}
                />
              </Grid>
              <Grid item md={12}>
                {/*<Typography variant={'h4'} component={'h3'}>*/}
                {/*  Permissions*/}
                {/*</Typography>*/}
                {/*<PerfectScrollbar className={classes.perfectScrollbarContactCon}>*/}
                {/*  <Table size="small" aria-label="a dense table">*/}
                {/*      <TableHead>*/}
                {/*        <TableRow>*/}
                {/*          <TableCell>Permissions</TableCell>*/}
                {/*          {*/}
                {/*              permissions.length !== 0 &&*/}
                {/*              permissions[0]?.actions.map(header => (*/}
                {/*                  <TableCell key={header.action}>{header.action}</TableCell>*/}
                {/*              ))*/}
                {/*          }*/}
                {/*        </TableRow>*/}
                {/*      </TableHead>*/}
                {/*      <TableBody>*/}
                {/*        {permissions.length !== 0 &&*/}
                {/*            permissions.map(permission => (*/}
                {/*                <TableRow key={permission.id}>*/}
                {/*                  <TableCell>*/}
                {/*                    <b>{permission.name}</b>*/}
                {/*                  </TableCell>*/}
                {/*                  {*/}
                {/*                    permission.actions.map((action, index) =>(*/}
                {/*                        <TableCell key={permission.name+'_'+index}>*/}
                {/*                          {*/}
                {/*                              action.status && (*/}
                {/*                                  <Checkbox*/}
                {/*                                      //defaultChecked={permission.view}*/}
                {/*                                      disabled={!isEditable}*/}
                {/*                                      onChange={handleOnChange}*/}
                {/*                                      checked={checkPermission('Permissions.' + permission.name + '.' + action.action)}*/}
                {/*                                      value={'Permissions.' + permission.name + '.' + action.action}*/}
                {/*                                      color="primary"*/}
                {/*                                      size={'small'}*/}
                {/*                                      inputProps={{ 'aria-label': `${action.action} Checkbox` }}*/}
                {/*                                  />*/}
                {/*                              )*/}
                {/*                          }*/}
                {/*                        </TableCell>*/}
                {/*                    ))*/}
                {/*                  }*/}

                {/*                </TableRow>*/}
                {/*            ))}*/}
                {/*      </TableBody>*/}
                {/*    </Table>*/}
                {/*</PerfectScrollbar>*/}
              </Grid>
            </GridContainer>
                <Box  m={2} display={'flex'} width={'100%'} >
                  <Typography variant={'h6'} gutterBottom>Permissions</Typography>
                  <Box flex={'1 0 auto'}/>
                  <Button size={'small'} disabled={!isEditable}  color={'primary'} onClick={handleCheckAll}>Check All</Button>
                  <Box mr={2} ml={2}></Box>
                  <Button size={'small'} disabled={!isEditable}  color={'secondary'} onClick={handleUnCheckAll}>UnCheck All</Button>
                </Box>

                {
                  permissions.length !== 0 && permissions.map ( (permission, index) => (
                            <Box m={2} key={index}>
                              <Accordion expanded={expanded.includes(permission.name)} onChange={handleChange(permission.name)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`${permission.name}-content `}
                                    id={`${permission.name}-header `}
                                >
                                  <Typography variant={'h6'} sx={{ width: '33%', flexShrink: 0 }}>
                                    {permission.name}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    {
                                      permission.actions !== null  && permission.actions.map((action, index) =>(
                                          <React.Fragment key={permission.name+'_'+index}>
                                            {
                                                action.status && (
                                                    <ListItem>
                                                    <ListItemIcon>
                                                      <Checkbox
                                                          edge="start"
                                                          name={'permissions-checkboxes'}
                                                          //defaultChecked={permission.view}
                                                          disabled={!isEditable}
                                                          onChange={handleOnChange}
                                                          checked={checkPermission('Permissions.' + permission.name + '.' + action.action)}
                                                          value={'Permissions.' + permission.name + '.' + action.action}
                                                          color="primary"
                                                          size={'small'}
                                                          inputProps={{ 'aria-label': `${action.action} Checkbox` }}
                                                      />
                                                    </ListItemIcon>
                                              <ListItemText id={permission.name+'-'+index} primary={`${action.action} ${permission.name}`} />
                                                    </ListItem>
                                                )
                                            }
                                          </React.Fragment>
                                      ))
                                    }
                                  </List>

                                </AccordionDetails>
                              </Accordion>
                            </Box>
                        )
                    )
                }

              </Box>
          ) : (
              <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                  <CmtImage src={'/images/no-results-found.png'} style={{ width: '300px' }} />
                  <p className={classes.instructions}>
                      <b>No Role Selected!</b>
                  </p>
                  <p>
                    Please select role to view.
                  </p>
              </Box>
          )}
        </Box>
      </PerfectScrollbar>
    </Box>
  );
};

export default Privileges;
