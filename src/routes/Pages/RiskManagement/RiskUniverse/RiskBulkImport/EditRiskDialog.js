import React from 'react';
import {Box, Dialog, DialogContent, DialogTitle, TextField} from "@mui/material";
import {AppBar, Toolbar} from "@material-ui/core";
import BulkDetailView from "../CreateRisk/BulkDetailView";
import {Close} from "@mui/icons-material";

const EditRiskDialog = props => {
    const {open, onClose, data} = props;
    if (!data){
        return null;
    }
    return(
        <Dialog
            open={open}
            fullWidth={true}
            fullScreen={true}
            //onClose={onClose}
        >
            <AppBar>
                <Toolbar>
                    <DialogTitle onClick={onClose}>
                        {`Edit :  ${data.riskTitle}`}
                    </DialogTitle>
                    <Box>
                        <Close/>
                    </Box>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <Box sx={{
                    mt: 8,
                }}>
                    <BulkDetailView data={data}/>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default EditRiskDialog;