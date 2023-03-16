import React from 'react';
import { Typography,Grid } from "@mui/material";
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { getAutoCompleteValue } from '../../../../../@jumbo/utils/commonHelper';


export const IncidentPreview = props => {
    const [expanded, setExpanded] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const { riskDetails, isView, index } = props;
    const { riskFrequencies } = useSelector(({ utils }) => utils);
  
    const selectedFrequency = getAutoCompleteValue(riskFrequencies, riskDetails.keyIndicatorFrequencyId);
  
    const useStyles = makeStyles(theme => ({
      isActive: {
        backgroundColor: '#E8EBF6',
        padding: 12,
        color: 'black',
        borderRadius: 4,
        fontWeight: '300',
        cursor: 'pointer',
        marginRight: 4,
        marginLeft: 4,
      },
      notActive: {
        backgroundColor: '#fff',
        padding: 12,
        color: 'black',
        borderRadius: 4,
        fontWeight: '300',
        cursor: 'pointer',
        marginRight: 4,
        marginLeft: 4,
      },
      button: {
        color: '#3F51B5',
        paddig: 10,
      },
      td: {
        border: '1px solid #dddddd',
        padding: '8px',
      },
      table: {
        borderCollapse: 'collapse',
        width: '100%',
        maxHeight: '70vh',
      },
      title: {
        marginBottom: 10,
      },
    }));
  
    const handleNext = () => {
      setActiveStep(activeStep + 1);
    };
  
    const handlePrev = () => {
      setActiveStep(activeStep - 1);
    };
  
    const handleChange = panel => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    const classes = useStyles();
    const action = activeStep > 0 ? riskDetails.additionalControlActions[activeStep - 1] : null;
    return (
      <>
        <Grid container sx={{mt: 4}}>
          <Grid item md={3} xs={12}>
            <Grid onClick={() => setActiveStep(0)} className={activeStep === 0 ? classes.isActive : classes.notActive}>
              <Typography>Risk</Typography>
            </Grid>
            {riskDetails.additionalControlActions?.map((action, index) => (
              <Grid
                onClick={() => setActiveStep(index + 1)}
                key={index}
                className={index + 1 === activeStep ? classes.isActive : classes.notActive}>
                <Typography key={index}>{action.action}</Typography>
              </Grid>
            ))}
          </Grid>
          <Grid item md={9} xs={12}>
            {activeStep == 0 && (
              <>
                <table className={classes.table}>
                  <tbody>
                    <tr>
                      <td className={classes.td}>Narration</td>
                      <td className={classes.td}>{riskDetails.narration !== '' ? riskDetails.narration : 'Not Set'}</td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Event</td>
                      <td className={classes.td}>{riskDetails.riskEvent !== '' ? riskDetails.riskEvent : 'Not Set'}</td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Category</td>
                      <td className={classes.td}>
                        {riskDetails.riskCategoryControlName !== '' ? riskDetails.riskCategoryControlName : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Causes</td>
                      <td className={classes.td}>
                        {riskDetails.rootCauses?.length !== 0
                          ? riskDetails.rootCauses?.map(rootCause => <li key={rootCause.id}>{rootCause.name}</li>)
                          : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Subsidiary</td>
                      <td className={classes.td}>{riskDetails.companyName !== '' ? riskDetails.companyName : 'Not Set'}</td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Department</td>
                      <td className={classes.td}>
                        {riskDetails.departmentName !== '' ? riskDetails.departmentName : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Section</td>
                      <td className={classes.td}>{riskDetails.sectionName !== '' ? riskDetails.sectionName : 'Not Set'}</td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Sub Section</td>
                      <td className={classes.td}>
                        {riskDetails.subSectionName !== '' ? riskDetails.subSectionName : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Owner</td>
                      <td className={classes.td}>
                        {riskDetails.riskOwners?.map(owner => (
                          <li key={owner.id}>{owner.name}</li>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Impact</td>
                      <td className={classes.td}>
                        {riskDetails.riskImpact?.length !== 0
                          ? riskDetails.riskImpact?.map((impact, index) => <li key={index}>{impact.name}</li>)
                          : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Impact Amount in {riskDetails.riskImpactCurrency}</td>
                      <td className={classes.td}>
                        {riskDetails.riskImpactAmount !== '' ? riskDetails.riskImpactAmount : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Control Category</td>
                      <td className={classes.td}>
                        {riskDetails.riskCategoryControlName !== '' ? riskDetails.riskCategoryControlName : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Control/Mitigation Actions</td>
                      <td className={classes.td}>
                        {riskDetails.controlActions?.length !== 0
                          ? riskDetails.controlActions?.map((controlAction, index) => <li key={index}>{controlAction.name}</li>)
                          : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Loss Type</td>
                      <td className={classes.td}>{riskDetails.lossTypeQuantityTypeName !== '' ? riskDetails.lossTypeQuantityTypeName : 'Not Set'}</td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Indicator</td>
                      <td className={classes.td}>
                        {riskDetails.riskIndicator !== '' ? riskDetails.riskIndicator : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Indicator Frequency</td>
                      <td className={classes.td}>{selectedFrequency ? selectedFrequency.name : 'Not Set'}</td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Appetite in {riskDetails.riskAppetiteTypeName}</td>
                      <td className={classes.td}>
                        {riskDetails.riskAppetiteAmount !== '' ? riskDetails.riskAppetiteAmount : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Appetite Direction {riskDetails.riskAppetiteDirection}</td>
                      <td className={classes.td}>
                        {riskDetails.riskAppetiteDirection !== '' ? riskDetails.riskAppetiteDirection : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Probability</td>
                      <td className={classes.td}>
                        {riskDetails.riskProbabilityName !== '' ? riskDetails.riskProbabilityName : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Severity</td>
                      <td className={classes.td}>
                        {riskDetails.riskSeverityName !== '' ? riskDetails.riskSeverityName : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Severity</td>
                      <td className={classes.td}>
                        {riskDetails.riskSeverityName !== '' ? riskDetails.riskSeverityName : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Velocity</td>
                      <td className={classes.td}>{riskDetails.riskVelocity !== '' ? riskDetails.riskVelocity : 'Not Set'}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
            {activeStep > 0 && action && (
              <>
                <table className={classes.table}>
                  <tbody>
                    <tr>
                      <td className={classes.td}>Action Title</td>
                      <td className={classes.td}>{action.action !== '' ? action.action : 'Not Set'}</td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Action Date</td>
                      <td className={classes.td}>{action.actionDate !== '' ? action.actionDate : 'Not Set'}</td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Compliance Type</td>
                      <td className={classes.td}>{action.complianceType !== '' ? action.complianceType : 'Not Set'}</td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Action Owners</td>
                      <td className={classes.td}>
                        {action.actionOwner?.map(owner => (
                          <li>{owner.name}</li>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Emails</td>
                      <td className={classes.td}>
                        {action.emails?.map(email => (
                          <li>{email}</li>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Compliance Title</td>
                      <td className={classes.td}>
                        {action.complianceDetails.title !== '' ? action.complianceDetails.title : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Description</td>
                      <td className={classes.td}>
                        {action.complianceDetails.description !== '' ? action.complianceDetails.description : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Authority</td>
                      <td className={classes.td}>
                        {action.complianceDetails.authority !== '' ? action.complianceDetails.authority : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Company Name</td>
                      <td className={classes.td}>
                        {action.complianceDetails.companyName !== '' ? action.complianceDetails.companyName : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Organization</td>
                      <td className={classes.td}>
                        {action.complianceDetails.organization.map(org => (
                          <>
                            <li>{org.departmentName}</li>
                            <li>{org.sectionName}</li>
                            <li>{org.subsectionName}</li>
                          </>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Penalty Type</td>
                      <td className={classes.td}>
                        {action.complianceDetails.penaltyType !== '' ? action.complianceDetails.penaltyType : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>penalty Currency</td>
                      <td className={classes.td}>
                        {action.complianceDetails.penaltyCurrency !== ''
                          ? action.complianceDetails.penaltyCurrency
                          : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>PrimaryOwnerName</td>
                      <td className={classes.td}>
                        {action.complianceDetails.primaryOwnerName !== ''
                          ? action.complianceDetails.primaryOwnerName
                          : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>SecondaryOwner</td>
                      <td className={classes.td}>
                        {action.complianceDetails.secondaryOwnerName !== ''
                          ? action.complianceDetails.secondaryOwnerName
                          : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>EscalationOwner</td>
                      <td className={classes.td}>
                        {action.complianceDetails.escalationOwnerName !== ''
                          ? action.complianceDetails.escalationOwnerName
                          : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Priority</td>
                      <td className={classes.td}>
                        {action.complianceDetails.priority !== '' ? action.complianceDetails.priority : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Frequency</td>
                      <td className={classes.td}>
                        {action.complianceDetails.frequency !== '' ? action.complianceDetails.frequency : 'Not Set'}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Submission Deadline</td>
                      <td className={classes.td}>
                        {action.complianceDetails.submissionDeadline !== ''
                          ? action.complianceDetails.submissionDeadline
                          : 'Not Set'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </Grid>
        </Grid>
      </>
    );
  };