import React, { useEffect, useState } from 'react'
import InternalLayout from '../../Layouts/InternalLayout'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Grid, Paper, Tab, Tabs, Typography } from '@mui/material'
import { StyledNextStepButton, StyledPreviousStepButton, StyledSaveButton } from '../../../Components/Buttons/StyledButtons';
import { StyledSpesEngineInput } from '../../../Components/Inputs/StyledInputs';
import PropTypes from 'prop-types';
import { getDataRequest, postDataRequest } from '../../../Axios/dataRequests';
import { generalTheme } from '../../../Theme/GeneralTheme';
import { StyledSpesEngineSwitch } from '../../../Components/Switchs/StyledSwitchs';
import SpesEngineDynamicTable from '../../../Components/Tables/SpesEngineDynamicTable';
import ShowMessage from '../../../Components/Notifications/Toastify';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



function CreateRolePage() {
    //States and Variables_______________________________________________________________
    const [roleData, SetRoleData] = useState({
        Name: '',
        Description: '',
        Permissions: [],
        Users: [],
    })
    const [activeStep, SetActiveStep] = useState(0);
    const [saveButtonDisabled, SetSaveButtonDisabled] = useState(false);
    const steps = [
        'General',
        'Permissions',
        'Users',
        'Final'
    ];
    const [permissionsTabValue, SetPermissionsTabValue] = useState(0);
    const [permissions, SetPermissions] = useState([]);
    const [selectedUsers, SetSelectedUsers] = useState([]);
    //Hooks_______________________________________________________________
    useEffect(() => {
        const getPermissions = async () => {
            const response = await getDataRequest(`/Permission/getPermissions`);
            SetPermissions(response);
        }

        getPermissions();
    }, [])

    useEffect(() => {
        SetRoleData(prevState => ({
            ...prevState,
            Users: selectedUsers.map(user => user._id)
        }))
    }, [selectedUsers])


    //Functions and Methods_______________________________________________________________
    const handleClickNext = () => {
        activeStep === 0 && SetActiveStep(1);
        activeStep === 1 && SetActiveStep(2);
        activeStep === 2 && SetActiveStep(3);
    }
    const handleClickPrevious = () => {
        activeStep === 3 && SetActiveStep(2);
        activeStep === 2 && SetActiveStep(1);
        activeStep === 1 && SetActiveStep(0);
    }
    const handleClickSave = async () => {
        SetSaveButtonDisabled(true);
        try {
            const response = await postDataRequest(`/Role/CreateRole`, roleData);
            if (response.Code === 200) {
                ShowMessage('Success', 'Role Saved Succesfully. Returning to Role List page');
            } else {
                ShowMessage('Error', response.Message);
            }
            SetSaveButtonDisabled(false);
        } catch (error) {
            ShowMessage('Error', error);
            SetSaveButtonDisabled(false);
        }
    }

    const handleInputChange = (e) => {
        const tempRoleData = { ...roleData };
        tempRoleData[e.target.name] = e.target.value;
        SetRoleData(tempRoleData);
    };

    const handleChangeTab = (event, newValue) => {
        SetPermissionsTabValue(newValue);
    };

    const handlePermissionChange = (e) => {
        if (e.target.checked) {
            SetRoleData(prevState => ({
                ...prevState,
                Permissions: [...prevState.Permissions, e.target.name]
            }));
        } else {
            SetRoleData(prevState => ({
                ...prevState,
                Permissions: prevState.Permissions.filter(permissionId => permissionId !== e.target.name)
            }));
        }

    }

    return (
        <InternalLayout>
            <Grid container spacing={0}>
                <Grid item xl={12} md={12} xs={12}>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </Grid>

                <Grid sx={{ display: activeStep === 0 ? 'block' : 'none' }} item xl={12} md={12} xs={12}>
                    <Paper sx={{ minHeight: '60vh' }} elevation={0}>
                        <Typography>
                            General Settings
                        </Typography>

                        <Typography>
                            Name
                        </Typography>
                        <StyledSpesEngineInput
                            name='Name'
                            value={roleData.Name}
                            onChange={handleInputChange}
                        />

                        <Typography>
                            Description
                        </Typography>
                        <StyledSpesEngineInput
                            name='Description'
                            value={roleData.Description}
                            onChange={handleInputChange}
                        />
                    </Paper>
                </Grid>


                <Grid sx={{ display: activeStep === 1 ? 'block' : 'none' }} item xl={12} md={12} xs={12}>
                    <Paper sx={{ minHeight: '60vh' }} elevation={0}>
                        <Box sx={{ width: '100%' }}>
                            <Paper elevation={0}>
                                <Tabs value={permissionsTabValue} onChange={handleChangeTab} aria-label="basic tabs example">
                                    <Tab label="System Permissions" {...a11yProps(0)} />
                                    <Tab label="Attribute Permissions" {...a11yProps(1)} />
                                    <Tab label="Family Permissions" {...a11yProps(2)} />
                                    <Tab label="Category Permissions" {...a11yProps(3)} />
                                    <Tab label="Item Type Permissions" {...a11yProps(4)} />
                                    <Tab label="Item Permissions" {...a11yProps(5)} />
                                    <Tab label="Role Permissions" {...a11yProps(6)} />
                                    <Tab label="User Permissions" {...a11yProps(7)} />
                                </Tabs>


                                <CustomTabPanel value={permissionsTabValue} index={0}>
                                    <Grid container spacing={3}>
                                        {
                                            permissions.length > 0 && (
                                                permissions.map(permission => {
                                                    if (permission.Group === 'System') {
                                                        return (
                                                            <Grid key={permission._id} item xl={3} md={3} sm={6} xs={12}>
                                                                <Box key={permission._id}>
                                                                    <Typography fontWeight={500} fontSize='15px'>
                                                                        <span style={{ marginRight: '8px', backgroundColor: roleData.Permissions.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                        {permission.Name}
                                                                    </Typography>
                                                                    <StyledSpesEngineSwitch
                                                                        name={permission._id}
                                                                        onChange={handlePermissionChange}
                                                                        checked={roleData.Permissions.indexOf(permission._id) !== -1 ? true : false} />
                                                                    <Typography fontWeight={200} fontSize='11px'>
                                                                        {permission.Description}
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        )
                                                    }
                                                    return null; // Eğer şart sağlanmazsa null döndür
                                                })
                                            )
                                        }
                                    </Grid>
                                </CustomTabPanel>

                                <CustomTabPanel value={permissionsTabValue} index={1}>
                                    <Grid container spacing={3}>
                                        {
                                            permissions.length > 0 && (
                                                permissions.map(permission => {
                                                    if (permission.Group === 'Attribute') {
                                                        return (
                                                            <Grid key={permission._id} item xl={3} md={3} sm={6} xs={12}>
                                                                <Box key={permission._id}>
                                                                    <Typography fontWeight={500} fontSize='15px'>
                                                                        <span style={{ marginRight: '8px', backgroundColor: roleData.Permissions.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                        {permission.Name}
                                                                    </Typography>
                                                                    <StyledSpesEngineSwitch
                                                                        name={permission._id}
                                                                        onChange={handlePermissionChange}
                                                                        checked={roleData.Permissions.indexOf(permission._id) !== -1 ? true : false} />
                                                                    <Typography fontWeight={200} fontSize='11px'>
                                                                        {permission.Description}
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        )
                                                    } else if (permission.Group === 'Attribute Group') {
                                                        return (
                                                            <Grid key={permission._id} item xl={3} md={3} sm={6} xs={12}>
                                                                <Box key={permission._id}>
                                                                    <Typography fontWeight={500} fontSize='15px'>
                                                                        <span style={{ marginRight: '8px', backgroundColor: roleData.Permissions.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                        {permission.Name}
                                                                    </Typography>
                                                                    <StyledSpesEngineSwitch
                                                                        name={permission._id}
                                                                        onChange={handlePermissionChange}
                                                                        checked={roleData.Permissions.indexOf(permission._id) !== -1 ? true : false} />
                                                                    <Typography fontWeight={200} fontSize='11px'>
                                                                        {permission.Description}
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        )
                                                    } else if (permission.Group === 'Attribute Permission') {
                                                        return (
                                                            <Grid key={permission._id} item xl={3} md={3} sm={6} xs={12}>
                                                                <Box key={permission._id}>
                                                                    <Typography fontWeight={500} fontSize='15px'>
                                                                        <span style={{ marginRight: '8px', backgroundColor: roleData.Permissions.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                        {permission.Name}
                                                                    </Typography>
                                                                    <StyledSpesEngineSwitch
                                                                        name={permission._id}
                                                                        onChange={handlePermissionChange}
                                                                        checked={roleData.Permissions.indexOf(permission._id) !== -1 ? true : false} />
                                                                    <Typography fontWeight={200} fontSize='11px'>
                                                                        {permission.Description}
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        )
                                                    }
                                                    return null; // Eğer şart sağlanmazsa null döndür
                                                })
                                            )
                                        }
                                    </Grid>
                                </CustomTabPanel>

                                <CustomTabPanel value={permissionsTabValue} index={2}>
                                    <Grid container spacing={1}>
                                        {
                                            permissions.length > 0 && (
                                                permissions.map(permission => {
                                                    if (permission.Group === 'Family') {
                                                        return (
                                                            <Grid key={permission._id} item xl={3} md={3} sm={6} xs={12}>
                                                                <Box key={permission._id}>
                                                                    <Typography fontWeight={500} fontSize='15px'>
                                                                        <span style={{ marginRight: '8px', backgroundColor: roleData.Permissions.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                        {permission.Name}
                                                                    </Typography>
                                                                    <StyledSpesEngineSwitch
                                                                        name={permission._id}
                                                                        onChange={handlePermissionChange}
                                                                        checked={roleData.Permissions.indexOf(permission._id) !== -1 ? true : false} />
                                                                    <Typography fontWeight={200} fontSize='11px'>
                                                                        {permission.Description}
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        )
                                                    }
                                                    return null; // Eğer şart sağlanmazsa null döndür
                                                })
                                            )
                                        }
                                    </Grid>
                                </CustomTabPanel>

                                <CustomTabPanel value={permissionsTabValue} index={3}>
                                    <Grid container spacing={1}>
                                        {
                                            permissions.length > 0 && (
                                                permissions.map(permission => {
                                                    if (permission.Group === 'Category') {
                                                        return (
                                                            <Grid key={permission._id} item xl={3} md={3} sm={6} xs={12}>
                                                                <Box key={permission._id}>
                                                                    <Typography fontWeight={500} fontSize='15px'>
                                                                        <span style={{ marginRight: '8px', backgroundColor: roleData.Permissions.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                        {permission.Name}
                                                                    </Typography>
                                                                    <StyledSpesEngineSwitch
                                                                        name={permission._id}
                                                                        onChange={handlePermissionChange}
                                                                        checked={roleData.Permissions.indexOf(permission._id) !== -1 ? true : false} />
                                                                    <Typography fontWeight={200} fontSize='11px'>
                                                                        {permission.Description}
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        )
                                                    }
                                                    return null; // Eğer şart sağlanmazsa null döndür
                                                })
                                            )
                                        }
                                    </Grid>
                                </CustomTabPanel>

                                <CustomTabPanel value={permissionsTabValue} index={4}>
                                    <Grid container spacing={1}>
                                        {
                                            permissions.length > 0 && (
                                                permissions.map(permission => {
                                                    if (permission.Group === 'Item Type') {
                                                        return (
                                                            <Grid key={permission._id} item xl={3} md={3} sm={6} xs={12}>
                                                                <Box key={permission._id}>
                                                                    <Typography fontWeight={500} fontSize='15px'>
                                                                        <span style={{ marginRight: '8px', backgroundColor: roleData.Permissions.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                        {permission.Name}
                                                                    </Typography>
                                                                    <StyledSpesEngineSwitch
                                                                        name={permission._id}
                                                                        onChange={handlePermissionChange}
                                                                        checked={roleData.Permissions.indexOf(permission._id) !== -1 ? true : false} />
                                                                    <Typography fontWeight={200} fontSize='11px'>
                                                                        {permission.Description}
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        )
                                                    }
                                                    return null; // Eğer şart sağlanmazsa null döndür
                                                })
                                            )
                                        }
                                    </Grid>
                                </CustomTabPanel>

                                <CustomTabPanel value={permissionsTabValue} index={5}>
                                    <Grid container spacing={1}>
                                        {
                                            permissions.length > 0 && (
                                                permissions.map(permission => {
                                                    if (permission.Group === 'Item') {
                                                        return (
                                                            <Grid key={permission._id} item xl={3} md={3} sm={6} xs={12}>
                                                                <Box key={permission._id}>
                                                                    <Typography fontWeight={500} fontSize='15px'>
                                                                        <span style={{ marginRight: '8px', backgroundColor: roleData.Permissions.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                        {permission.Name}
                                                                    </Typography>
                                                                    <StyledSpesEngineSwitch
                                                                        name={permission._id}
                                                                        onChange={handlePermissionChange}
                                                                        checked={roleData.Permissions.indexOf(permission._id) !== -1 ? true : false} />
                                                                    <Typography fontWeight={200} fontSize='11px'>
                                                                        {permission.Description}
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        )
                                                    }
                                                    return null; // Eğer şart sağlanmazsa null döndür
                                                })
                                            )
                                        }
                                    </Grid>
                                </CustomTabPanel>

                                <CustomTabPanel value={permissionsTabValue} index={6}>
                                    <Grid container spacing={1}>
                                        {
                                            permissions.length > 0 && (
                                                permissions.map(permission => {
                                                    if (permission.Group === 'Role') {
                                                        return (
                                                            <Grid key={permission._id} item xl={3} md={3} sm={6} xs={12}>
                                                                <Box key={permission._id}>
                                                                    <Typography fontWeight={500} fontSize='15px'>
                                                                        <span style={{ marginRight: '8px', backgroundColor: roleData.Permissions.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                        {permission.Name}
                                                                    </Typography>
                                                                    <StyledSpesEngineSwitch
                                                                        name={permission._id}
                                                                        onChange={handlePermissionChange}
                                                                        checked={roleData.Permissions.indexOf(permission._id) !== -1 ? true : false} />
                                                                    <Typography fontWeight={200} fontSize='11px'>
                                                                        {permission.Description}
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        )
                                                    }
                                                    return null; // Eğer şart sağlanmazsa null döndür
                                                })
                                            )
                                        }
                                    </Grid>
                                </CustomTabPanel>

                                <CustomTabPanel value={permissionsTabValue} index={7}>
                                    <Grid container spacing={1}>
                                        {
                                            permissions.length > 0 && (
                                                permissions.map(permission => {
                                                    if (permission.Group === 'User') {
                                                        return (
                                                            <Grid key={permission._id} item xl={3} md={3} sm={6} xs={12}>
                                                                <Box key={permission._id}>
                                                                    <Typography fontWeight={500} fontSize='15px'>
                                                                        <span style={{ marginRight: '8px', backgroundColor: roleData.Permissions.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                        {permission.Name}
                                                                    </Typography>
                                                                    <StyledSpesEngineSwitch
                                                                        name={permission._id}
                                                                        onChange={handlePermissionChange}
                                                                        checked={roleData.Permissions.indexOf(permission._id) !== -1 ? true : false} />
                                                                    <Typography fontWeight={200} fontSize='11px'>
                                                                        {permission.Description}
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        )
                                                    }
                                                    return null; // Eğer şart sağlanmazsa null döndür
                                                })
                                            )
                                        }
                                    </Grid>
                                </CustomTabPanel>

                            </Paper>
                        </Box>
                    </Paper>
                </Grid>

                <Grid sx={{ display: activeStep === 2 ? 'block' : 'none' }} item xl={12} md={12} xs={12}>
                    <Paper sx={{ minHeight: '60vh' }} elevation={0}>
                        <SpesEngineDynamicTable
                            api='/User/SystemUsersTableData'
                            link='/System/User/Detail/'
                            goToDetail={false}
                            setClickedState={SetSelectedUsers}
                            canSelected={true}
                            clickedLinkAfterClick='/System/User/Detail/'
                            paramfilters={
                                {
                                    Name: '',
                                    isActive: '',
                                }
                            }
                            columns={
                                [
                                    {
                                        Name: 'UserName',
                                        Label: 'Username',
                                        Type: 'String',
                                        Filter: false,
                                        DefaultOrder: false,
                                        CanOrder: false,
                                    },
                                    {
                                        Name: 'Name',
                                        Label: 'Name',
                                        Type: 'String',
                                        Filter: true,
                                        DefaultOrder: true,
                                        CanOrder: false,
                                    },
                                    {
                                        Name: 'LastName',
                                        Label: 'Lastname',
                                        Type: 'String',
                                        Filter: true,
                                        DefaultOrder: false,
                                        CanOrder: false,
                                    },
                                    {
                                        Name: 'Email',
                                        Label: 'E-mail',
                                        Type: 'String',
                                        Filter: false,
                                        DefaultOrder: false,
                                        CanOrder: true,
                                    },
                                    {
                                        Name: 'Role',
                                        Label: 'Role',
                                        Type: 'Role',
                                        Filter: false,
                                        DefaultOrder: false,
                                        CanOrder: true,
                                    },
                                    {
                                        Name: 'isActive',
                                        Label: 'Status',
                                        Type: 'Boolean2',
                                        Filter: false,
                                        DefaultOrder: false,
                                        CanOrder: true,
                                    },

                                    {
                                        Name: 'createdAt',
                                        Label: 'Created Date',
                                        Type: 'Date',
                                        Filter: false,
                                        DefaultOrder: false,
                                        CanOrder: false,
                                    },
                                    {
                                        Name: 'updatedAt',
                                        Label: 'Updated Date',
                                        Type: 'Date',
                                        Filter: false,
                                        DefaultOrder: false,
                                        CanOrder: false,
                                    }
                                ]
                            }
                        />
                    </Paper>
                </Grid>

                <Grid sx={{ display: activeStep === 3 ? 'block' : 'none' }} item xl={12} md={12} xs={12}>
                    <Paper sx={{ minHeight: '60vh' }} elevation={0}>
                        Name: {roleData.Name}

                        Description: {roleData.Name}

                        Total Permission Count : {roleData.Permissions.length}

                        Users which will has this Role ;
                        {
                            selectedUsers && selectedUsers.map(user => (
                                <Box key={user._id}>
                                    {user.Name}
                                </Box>
                            ))
                        }
                    </Paper>
                </Grid>
                <Grid
                    sx={{
                        width: '100%',
                        display: 'inline-flex',
                        alignContent: 'center',
                        justifyContent: 'center'
                    }}
                    item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Box sx={{ position: 'fixed', bottom: 10, minWidth: 'max-content' }}>
                        <StyledPreviousStepButton
                            mr={3}
                            sx={{ display: activeStep > 0 ? '' : 'none' }}
                            onClick={handleClickPrevious}>
                            Previous
                        </StyledPreviousStepButton>

                        <StyledNextStepButton
                            mr={3}
                            sx={{ display: activeStep < 3 ? '' : 'none' }}
                            onClick={handleClickNext}>
                            Next
                        </StyledNextStepButton>

                        <StyledSaveButton
                            disabled={saveButtonDisabled}
                            sx={{ display: activeStep === 3 ? '' : 'none' }}
                            onClick={handleClickSave}>
                            Save
                        </StyledSaveButton>
                    </Box>
                </Grid>
            </Grid>

        </InternalLayout>
    )
}

export default CreateRolePage