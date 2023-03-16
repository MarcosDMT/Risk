import React, { useEffect, useRef, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import clsx from 'clsx';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import PerfectScrollbar from 'react-perfect-scrollbar';
import List from '@material-ui/core/List';
import CmtList from '../../../../@coremat/CmtList';
import useStyles from '../../Roles/index.style';
import {
  controlCategory,
  lossTypeList,
  probabilityList,
  probabilityList3,
  probabilityList5,
  probabilityMatrixList,
  riskCategoryList,
  severityList,
  severityList3,
  severityList5,
} from '../dummyData';
import { Divider, IconButton, ListItemIcon, Typography } from '@material-ui/core';
import { Container, Draggable } from 'react-smooth-dnd';
import { arrayMove } from 'react-sortable-hoc';
import { DragHandle } from '@mui/icons-material';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { AddCircle } from '@material-ui/icons';
import AddEditParam from './AddEditParam';
import { idGenerator } from '../../../../@jumbo/utils/commonHelper';
import { NotificationManager } from 'react-notifications';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import { Grid } from '@mui/material';
import AppSelectBox from '../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { useDispatch, useSelector } from 'react-redux';
import {
  addRiskCategory,
  addRiskControls,
  addRiskLossTypes,
  addRiskProbabilities,
  addRiskSeverities,
  deleteRiskCategory,
  fetchRiskCategories,
  fetchRiskControls,
  fetchRiskLossTypes,
  fetchRiskProbabilities,
  fetchRiskSeverities,
  updateRiskCategory,
  updateRiskControls,
  updateRiskLossTypes,
  updateRiskProbabilities,
  updateRiskSeverities,
} from '../../../../redux/actions/RiskParams';

const RiskParamsTitles = ['Risk Categories', 'Probability & Severity ', 'Loss Type', 'Risk Control Categories'];
const Params = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { riskCategories, probabilities, riskControls, lossTypes, severities } = useSelector(({ riskParams }) => riskParams);
  const { handleOnChange, selectedItem } = props;
  const [probabilityMatrix, setProbabilityMatrix] = useState([]);
  const [selectedMatrix, setSelectedMatrix] = useState(2);

  // add functions
  const addCategory = (data, callBackFunc) => {
    dispatch(addRiskCategory(data, callBackFunc));
  };
  const addLossType = (data, callBackFunc) => {
    dispatch(addRiskLossTypes(data, callBackFunc));
  };
  const addControl = (data, callBackFunc) => {
    dispatch(addRiskControls(data, callBackFunc));
  };
  const addProbability = (data, callBackFunc) => {
    dispatch(addRiskProbabilities(data, callBackFunc));
  };
  const addSeverity = (data, callBackFunc) => {
    dispatch(addRiskSeverities(data, callBackFunc));
  };

  //update functions
  const updateCategory = (data, callBackFunc) => {
    dispatch(updateRiskCategory(data, callBackFunc));
  };
  const updateLossType = (data, callBackFunc) => {
    dispatch(updateRiskLossTypes(data, callBackFunc));
  };
  const updateControl = (data, callBackFunc) => {
    dispatch(updateRiskControls(data, callBackFunc));
  };
  const updateProbability = (data, callBackFunc) => {
    dispatch(updateRiskProbabilities(data, callBackFunc));
  };
  const updateSeverity = (data, callBackFunc) => {
    dispatch(updateRiskSeverities(data, callBackFunc));
  };

  //delete functions
  const handleOnDeleteRiskCategory = async data => {
    await dispatch(deleteRiskCategory({ id: data }));
  };

  useEffect(() => {
    //do something
  }, [selectedMatrix]);
  useEffect(() => {
    dispatch(fetchRiskCategories());
    dispatch(fetchRiskProbabilities());
    dispatch(fetchRiskSeverities());
    dispatch(fetchRiskControls());
    dispatch(fetchRiskLossTypes());
    setProbabilityMatrix(probabilityMatrixList);
  }, [selectedItem]);
  return (
    <React.Fragment>
      <ParamsSideBar {...{ selectedItem, handleOnChange, classes }} />
      {/*Risk Categories*/}
      {selectedItem === 0 && (
        <ParamsContent
          {...{
            classes,
            selectedItem,
            itemName: 'Risk Categories',
            data: riskCategories,
            handleAddItem: addCategory,
            handleUpdateItem: updateCategory,
            handleRemoveItem: handleOnDeleteRiskCategory,
          }}
        />
      )}
      {/* Probability & Severity */}
      {selectedItem === 1 && (
        <Box className={classes.inBuildAppMainContent} height={500}>
          <PerfectScrollbar className={classes.perfectScrollbarContactSidebar}>
            <Box margin={5}>
              {/*<AppSelectBox*/}
              {/*  data={probabilityMatrix}*/}
              {/*  fullWidth*/}
              {/*  label="Probability/Severity Matrix"*/}
              {/*  valueKey="id"*/}
              {/*  variant="outlined"*/}
              {/*  labelKey="name"*/}
              {/*  value={selectedMatrix}*/}
              {/*  onChange={e => setSelectedMatrix(e.target.value)}*/}
              {/*/>*/}
              <Typography></Typography>
            </Box>
            <GridContainer>
              <Grid item md={6} xs={12}>
                <ParamsContent
                  {...{
                    classes,
                    selectedItem,
                    hideAdd: true,
                    itemName: 'Probability',
                    data: probabilities,
                    handleAddItem: addProbability,
                    handleUpdateItem: updateProbability,
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <ParamsContent
                  {...{
                    classes,
                    selectedItem,
                    hideAdd: true,
                    itemName: 'Severity',
                    data: severities,
                    handleAddItem: addSeverity,
                    handleUpdateItem: updateSeverity,
                  }}
                />
              </Grid>
            </GridContainer>
          </PerfectScrollbar>
        </Box>
      )}
      {/*Loss Type*/}
      {selectedItem === 2 && (
        <ParamsContent
          {...{
            classes,
            hideAdd: true,
            selectedItem,
            itemName: 'Loss Type',
            data: lossTypes,
            handleAddItem: addLossType,
            handleUpdateItem: updateLossType,
          }}
        />
      )}
      {/*Risk Control Category*/}
      {selectedItem === 3 && (
        <ParamsContent
          {...{
            classes,
            selectedItem,
            hideAdd: true,
            itemName: 'Risk Control Category',
            data: riskControls,
            handleAddItem: addControl,
            handleUpdateItem: updateControl,
          }}
        />
      )}
    </React.Fragment>
  );
};

const ParamsSideBar = props => {
  const { classes, handleOnChange, selectedItem } = props;
  return (
    <Box className={classes.inBuildAppSidebar}>
      <PerfectScrollbar className={classes.perfectScrollbarContactSidebar}>
        <Box mt={5}>
          <List component="nav" className={classes.appNav}>
            <CmtList
              data={RiskParamsTitles}
              renderRow={(item, index) => (
                <SideBarItem {...{ key: index, index, selectedItem, item, classes, onChange: handleOnChange }} />
              )}
            />
          </List>
        </Box>
      </PerfectScrollbar>
    </Box>
  );
};
const SideBarItem = props => {
  const { index, item, onChange, classes, selectedItem } = props;
  const labelRef = useRef(null);

  return (
    <React.Fragment>
      <ListItem
        ref={labelRef}
        button
        title={item}
        className={clsx(classes.appNavItem, classes.appTaskNavItem, {
          active: index === selectedItem,
        })}
        onClick={() => onChange(index)}>
        {/*<ListItemIcon className="Cmt-icon-root">*/}
        {/*  /!*{item.icon ? item.icon : <LabelIcon style={{ color: 'blue' }} />}*!/*/}
        {/*  {item.icon ? item.icon : <Person style={{ color: 'blue' }} />}*/}
        {/*</ListItemIcon>*/}
        <ListItemText primary={item} className="Cmt-nav-text" />
      </ListItem>
    </React.Fragment>
  );
};

const ParamsContent = props => {
  const { classes, itemName, data, handleAddItem, handleUpdateItem, handleRemoveItem, hideAdd, height = 500 } = props;
  const initialState = { name: '', description: '', companyId: '' };

  const labelRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(initialState);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(false);

  const onCreateItem = e => {
    setOpenDialog(true);
  };
  const handleOnDelete = itemId => {
    handleRemoveItem(itemId);
  };

  const handleOnSave = e => {
    e.preventDefault();
    if (currentItem) {
      handleUpdateItem(selectedItem, () => onCloseDialog());
    } else {
      handleAddItem(selectedItem, () => onCloseDialog());
    }
  };

  const onClickEdit = (event, item) => {
    setOpenDialog(true);
    setCurrentItem(true);
    setSelectedItem(item);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
    setCurrentItem(false);
    setSelectedItem(initialState);
  };
  return (
    <Box className={classes.inBuildAppMainContent}>
      <PerfectScrollbar className={classes.perfectScrollbarContactCon}>
        <Box m={5} height={height}>
          <Box display={'flex'} alignItems={'center'}>
            <Typography variant={'h4'} component={'h3'} color={'primary'}>
              {itemName}
            </Typography>
            <Box flex={'1 0 auto'} />
            {!hideAdd && (
              <IconButton color={'primary'} onClick={onCreateItem}>
                <AddCircle />
              </IconButton>
            )}
          </Box>
          {/*<List component="nav">*/}
          {/*  <Container*/}
          {/*    dragHandleSelector=".drag-handle"*/}
          {/*    lockAxis="y"*/}
          {/*    onDrop={e => handleOnDrop(e)}>*/}
          {/*    {data.map(datum => (*/}
          {/*      <Draggable key={datum.id}>*/}
          {/*        <ListItem ref={labelRef} style={{ backgroundColor: datum.color + '10', color: datum.color }}>*/}
          {/*          <ListItemIcon className="drag-handle" style={{ cursor: 'pointer', color: 'blue' }}>*/}
          {/*            <DragHandle />*/}
          {/*          </ListItemIcon>*/}
          {/*          <ListItemText primary={datum.name} />*/}
          {/*          <MenuItems {...{ datum, onClickEdit, handleOnDelete }} />*/}
          {/*        </ListItem>*/}
          {/*        <Divider />*/}
          {/*        /!*<Chip label={datum.name} onClick={e => handleOnClick(datum.id)} onDelete={e => handleOnDelete(datum.id)} />*!/*/}
          {/*      </Draggable>*/}
          {/*    ))}*/}
          {/*  </Container>*/}
          {/*</List>*/}
          <List component="nav">
            {data.length !== 0 ? (
              data.map(datum => (
                <div key={datum.id}>
                  <ListItem ref={labelRef} style={{ backgroundColor: datum.color + '10', color: datum.color }}>
                    <ListItemIcon className="drag-handle" style={{ cursor: 'pointer', color: 'blue' }}>
                      <DragHandle />
                    </ListItemIcon>
                    <ListItemText primary={datum.name} />
                    <MenuItems {...{ datum, onClickEdit, handleOnDelete }} />
                  </ListItem>
                  <Divider />
                  {/*<Chip label={datum.name} onClick={e => handleOnClick(datum.id)} onDelete={e => handleOnDelete(datum.id)} />*/}
                </div>
              ))
            ) : (
              <ListItem>
                <ListItemText>No records Found!</ListItemText>
              </ListItem>
            )}
          </List>
        </Box>
      </PerfectScrollbar>
      <AddEditParam {...{ openDialog, handleOnSave, onCloseDialog, itemName, currentItem, selectedItem, setSelectedItem }} />
    </Box>
  );
};
const MenuItems = props => {
  const { handleOnDelete, onClickEdit, datum } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = event => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = e => {
    e.stopPropagation();
    setAnchorEl(null);
  };
  return (
    <>
      <Box className="Cmt-more-vert-icon">
        <MoreVertIcon onClick={e => handleMenuClick(e)} style={{ cursor: 'pointer' }} />
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem
          onClick={e => {
            setAnchorEl(null);
            onClickEdit(e, datum);
          }}>
          Edit
        </MenuItem>
        <MenuItem
          onClick={e => {
            setAnchorEl(null);
            handleOnDelete(datum.id);
          }}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default Params;
