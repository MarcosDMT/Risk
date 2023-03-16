import React, {useEffect, useState} from 'react';
import GridContainer from "../../../../../@jumbo/components/GridContainer";
import {Grid} from "@mui/material";
import {useSelector} from "react-redux";
import {CheckBoxOutlineBlank, CheckBoxOutlined} from "@mui/icons-material";
import {Autocomplete, createFilterOptions} from "@material-ui/lab";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {Checkbox, Chip, IconButton, MenuItem, TextField} from "@material-ui/core";
import RiskStatutory from "./RiskStatutory";
import RiskEnterprise from "./RiskEnterprise";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        //width: '100%',
        marginTop: '10px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));
const AdditionalControlsForm = props => {
    const classes = useStyles();
    const { riskOwners } = useSelector(({ riskOwners }) => riskOwners);
    const {  index, riskDetails, setRiskDetails } = props;
    const [riskEmails, setRiskEmails] = useState([]);

    const icon = <CheckBoxOutlineBlank fontSize="small" />;
    const checkedIcon = <CheckBoxOutlined fontSize="small" />;

    const complianceTypes = [
        { id: 1, name: 'Statutory Compliance' },
        { id: 2, name: 'Legal Compliance' },
        { id: 3, name: 'Enterprise Compliance' },
    ];

    const handleOnComplianceType = e => {
        const { name, value } = e.target;
        let data = riskDetails.additionalControlActions;
        data[index] = { ...data[index], [name]: value };
        setRiskDetails({ ...riskDetails, complianceType: data });
    };

    const handleOnChange = e => {
        const { name, value } = e.target;
        let data = riskDetails.additionalControlActions;
        data[index] = { ...data[index], [name]: value };
        setRiskDetails({ ...riskDetails, additionalControlActions: data });
    };

    const handleOnDateChange = e => {
        const { name, value } = e.target;
        let data = riskDetails.additionalControlActions;
        data[index] = { ...data[index], [name]: value };
        setRiskDetails({ ...riskDetails, additionalControlActions: data });
    };

    const handleRiskOwnersChange = (e, values) => {
        let data = riskDetails?.additionalControlActions;
        data[index] = { ...data[index], actionOwner: values };
        setRiskDetails({ ...riskDetails, additionalControlActions: data });
    };

    const handleRiskEmailsChange = (e, values) => {
        let data = riskDetails?.additionalControlActions;
        data[index] = { ...data[index], emails: values };
        setRiskDetails({ ...riskDetails, additionalControlActions: data });
    };

    const filter = createFilterOptions();

   useEffect(() => {
        let data = riskDetails?.additionalControlActions;
        data[index] = {
            ...data[index],
            complianceDetails: {
                ...data[index].complianceDetails,
                title: data[index].action,
            },
        };
        setRiskDetails({ ...riskDetails, additionalControlActions: data });
    }, [riskDetails.additionalControlActions[index]?.action]);

    useEffect(() => {
        let data = riskDetails?.additionalControlActions;
        data[index] = {
            ...data[index],
            complianceDetails: {
                ...data[index].complianceDetails,
                submissionDeadline: data[index].actionDate,
            },
        };
        setRiskDetails({ ...riskDetails, additionalControlActions: data });
    }, [riskDetails.additionalControlActions[index]?.actionDate]);

    let dbData = riskOwners;
    let uploadedData = riskDetails.additionalControlActions[index].actionOwner;
    const mergedData = dbData.concat(uploadedData);
    return (
        <>
            <GridContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item md={12} xs={12}>
                    <TextField
                        name="action"
                        fullWidth
                        label="Action"
                        type="text"
                        onChange={handleOnChange}
                        value={riskDetails?.additionalControlActions[index]?.action}
                        variant="outlined"
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <Autocomplete
                        multiple
                        fullWidth
                        value={riskDetails?.additionalControlActions[index]?.actionOwner ?? []}
                        options={mergedData}
                        autoHighlight
                        onChange={handleRiskOwnersChange}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                                <Chip title={option.name} color={'primary'} label={option.name} {...getTagProps({ index })} />
                            ))
                        }
                        freeSolo
                        selectOnFocus
                        disableCloseOnSelect
                        getOptionLabel={option => option.name}
                        renderOption={(option, state) => (
                            <span key={option.name}>
                              <Checkbox
                                  color={'primary'}
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  style={{ marginRight: 8 }}
                                  checked={state.selected}
                              />
                                {option.name}
                            </span>
                        )}
                        renderInput={params => (
                            <TextField fullWidth variant={'outlined'} {...params} label="Risk Owners" />
                        )}
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <TextField
                        name="actionDate"
                        onChange={handleOnDateChange}
                        fullWidth
                        type="date"
                        value={riskDetails?.additionalControlActions[index]?.actionDate}
                        variant="outlined"
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <Autocomplete
                        multiple
                        fullWidth
                        value={riskDetails?.additionalControlActions[index]?.emails ?? []}
                        options={riskEmails}
                        autoHighlight
                        onChange={handleRiskEmailsChange}
                        filterOptions={(option, params) => {
                            const filtered = filter(option, params);
                            if (params.inputValue !== '') {
                                filtered.push(params.inputValue);
                            }
                            return filtered;
                        }}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                                <Chip title={option} color={'primary'} label={option} {...getTagProps({ index })} />
                            ))
                        }
                        freeSolo
                        selectOnFocus
                        disableCloseOnSelect
                        getOptionLabel={option => option}
                        renderOption={(option, state) => (
                            <span key={option}>
                              <Checkbox
                                  color={'primary'}
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  style={{ marginRight: 8 }}
                                  checked={state.selected}
                              />
                                {option}
                            </span>
                        )}
                        renderInput={params => (
                            <TextField fullWidth variant={'outlined'} {...params} type="email" label="Email" />
                        )}
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <TextField
                        onChange={handleOnComplianceType}
                        label="Compliance"
                        name="complianceType"
                        fullWidth
                        select
                        value={riskDetails?.additionalControlActions[index]?.complianceType}
                        variant="outlined">
                        {complianceTypes?.map((option, index) => (
                            <MenuItem key={index} value={option.name}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                {/* COMPLIANCE TYPE */}
                {riskDetails?.additionalControlActions[index]?.complianceType === 'Statutory Compliance' ? (
                    <>
                        <Grid item md={12} xs={12}>
                            <Accordion>
                                <AccordionSummary
                                    aria-label="Expand"
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header">
                                    <Typography className={classes.heading}>Statutory Compliance</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <GridContainer>
                                        <Grid item md={12} xs={12}>
                                            <RiskStatutory riskDetails={riskDetails} index={index} setRiskDetails={setRiskDetails} />
                                        </Grid>
                                    </GridContainer>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </>
                ) : (
                    ''
                )}

                {riskDetails?.additionalControlActions[index]?.complianceType === 'Legal Compliance' ? (
                    <>
                        <Grid item md={12} xs={12}>
                            <Accordion>
                                <AccordionSummary
                                    aria-label="Expand"
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header">
                                    <Typography className={classes.heading}>Legal</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <GridContainer>
                                        <Grid item md={12} xs={12}>
                                            <Typography className={classes.heading}> This is the Legal Compliance</Typography>
                                        </Grid>
                                    </GridContainer>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </>
                ) : (
                    ''
                )}

                {riskDetails?.additionalControlActions[index]?.complianceType === 'Enterprise Compliance' ? (
                    <>
                        <Grid item md={12} xs={12}>
                            <Accordion>
                                <AccordionSummary
                                    aria-label="Expand"
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header">
                                    <Typography className={classes.heading}>Enterprise Compliance</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <GridContainer>
                                        <Grid item md={12} xs={12}>
                                            <RiskEnterprise riskDetails={riskDetails} index={index} setRiskDetails={setRiskDetails} />
                                        </Grid>
                                    </GridContainer>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </>
                ) : (
                    ''
                )}
                {/* END OF COMPLIANCE TYPE */}
            </GridContainer>
        </>
    );
}

export default AdditionalControlsForm;