import React from 'react';
import {
    alpha,
    Avatar,
    Box, Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import {Add, Delete} from "@mui/icons-material";

const AdditionalControlItems = props => {
    const {handleOnClick, handleOnDelete, item, index } = props;
    return (
        <>
            <Box sx={{
                width: '100%',
                height: '50px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                {/*<Avatar sx={{*/}
                {/*    backgroundColor: theme => alpha(theme.palette.primary.main, 0.5)*/}
                {/*}}>*/}
                {/*    <Typography>{index+1}</Typography>*/}
                {/*</Avatar>*/}
                <Typography>
                    {item.action}
                </Typography>
                <IconButton onClick={handleOnClick}>
                    <Add/>
                </IconButton>
            </Box>
            <Divider/>
        </>
    )
}

export default AdditionalControlItems;