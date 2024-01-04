import React, { useEffect, useState } from 'react'
import InternalLayout from '../../Layouts/InternalLayout'
import { useParams } from 'react-router-dom';
import { getDataRequest } from '../../../Axios/dataRequests';
import { Box, Chip, Grid, IconButton, Paper, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import UndoIcon from '@mui/icons-material/Undo';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { StyledSpesEngineSwitch } from '../../../Components/Switchs/StyledSwitchs';
import { generalTheme } from '../../../Theme/GeneralTheme';
import SpesEngineDynamicTable from '../../../Components/Tables/SpesEngineDynamicTable';

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


function RoleDetailPage() {
    const params = useParams();
    const [roleData, SetRoleData] = useState([]);
    const [roleDataRAW, SetRoleDataRAW] = useState(null);
    const [history, SetHistory] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = React.useState(0);
    const [permissions, SetPermissions] = useState([]);
    const [permissionsArray, setPermissionsArray] = useState([]);

    useEffect(() => {
        const getRoleData = async () => {
            const response = await getDataRequest(`/Role/getRole?_id=${params.id}`);
            SetRoleData(response);
            SetRoleDataRAW(response);
            setPermissionsArray(response.Permissions.map(permission => permission._id))
        }

        const getPermissions = async () => {
            const response = await getDataRequest(`/Permission/getPermissions`);
            SetPermissions(response);
        }

        const getHistory = async () => {
            const response = await getDataRequest(`/History/getHistory?_id=${params.id}`);
            SetHistory(response);
        }

        getRoleData();
        getPermissions();
        getHistory();
    }, [params])


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handlePermissionChange = (e) => {
        if (e.target.checked) {
            let newPermissions = [...permissionsArray, e.target.name];
            setPermissionsArray(newPermissions);
        } else {
            let newPermissions = permissionsArray.filter(item => item !== e.target.name);
            setPermissionsArray(newPermissions)
        }
    }

    const handleUndoChanges = () => {
        SetRoleData(roleDataRAW);
        setPermissionsArray(roleDataRAW.Permissions.map(permission => permission._id))
    }

    return (
        <InternalLayout>
            <Grid container spacing={1}>
                <Grid item xl={12} md={12} xs={12}>
                    <Paper elevation={0} sx={{
                        border: 'none',
                        height: '50px',
                        display: 'inline-flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        <Grid alignItems='center' container spacing={0}>
                            <Grid item xl={4} md={4} xs={6}>
                                <Typography sx={{
                                    fontSize: '16px',
                                    fontWeight: 400,
                                    pl: '2em'
                                }}>
                                    Role Settings
                                </Typography>
                            </Grid>
                            <Grid align='center' item xl={4} md={4} xs={0}>
                                <Box sx={{ display: isEditMode ? 'block' : 'none' }}>
                                    <Chip label='Edit Mode' />
                                </Box>
                            </Grid>
                            <Grid align='right' item xl={4} md={4} xs={6}>
                                <Box>
                                    <IconButton onClick={(e) => setIsEditMode(!isEditMode)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={handleUndoChanges}>
                                        <UndoIcon />
                                    </IconButton>
                                    <IconButton>
                                        <SaveIcon />
                                    </IconButton>
                                    <IconButton>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xl={12} md={12} xs={12}>
                    <Box sx={{ width: '100%' }}>
                        <Paper elevation={0}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="General" {...a11yProps(0)} />
                                <Tab label="System Permissions" {...a11yProps(1)} />
                                <Tab label="Attribute Permissions" {...a11yProps(2)} />
                                <Tab label="Family Permissions" {...a11yProps(3)} />
                                <Tab label="Category Permissions" {...a11yProps(4)} />
                                <Tab label="Item Type Permissions" {...a11yProps(5)} />
                                <Tab label="Item Permissions" {...a11yProps(6)} />
                                <Tab label="Role Permissions" {...a11yProps(7)} />
                                <Tab label="User Permissions" {...a11yProps(8)} />
                                <Tab label="History" {...a11yProps(9)} />
                            </Tabs>
                        </Paper>
                    </Box>
                </Grid>

                <Grid item xl={12} md={12} xs={12}>
                    <Paper sx={{ minHeight: '70vh' }} elevation={0}>
                        <CustomTabPanel value={value} index={0}>
                            <Typography>
                                Name : {roleData.Name}
                            </Typography>
                            <Typography>
                                Description : {roleData.Description}
                            </Typography>

                            <Typography>
                                Connected Users
                            </Typography>

                            <Box>
                                <SpesEngineDynamicTable
                                    api='/User/SystemUsersTableData'
                                    link='/System/User/Detail/'
                                    goToDetail={false}
                                    canSelected={true}
                                    clickedLinkAfterClick='/System/User/Detail/'
                                    paramfilters={
                                        {
                                            Role: '659457476176f86c5e06b015',
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
                            </Box>
                        </CustomTabPanel>

                        <CustomTabPanel value={value} index={1}>
                            <Grid container spacing={3}>
                                {
                                    permissions.length > 0 && (
                                        permissions.map(permission => {
                                            if (permission.Group === 'System') {
                                                return (
                                                    <Grid item xl={3} md={3} sm={6} xs={12}>
                                                        <Box key={permission._id}>
                                                            <Typography fontWeight={500} fontSize='15px'>
                                                                <span style={{ marginRight: '8px', backgroundColor: permissionsArray.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                {permission.Name}
                                                            </Typography>
                                                            <StyledSpesEngineSwitch
                                                                sx={{ cursor: !isEditMode ? 'not-allowed' : '' }}
                                                                disabled={!isEditMode}
                                                                name={permission._id}
                                                                onChange={handlePermissionChange}
                                                                checked={permissionsArray.indexOf(permission._id) !== -1 ? true : false} />
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


                        <CustomTabPanel value={value} index={2}>
                            <Grid container spacing={3}>
                                {
                                    permissions.length > 0 && (
                                        permissions.map(permission => {
                                            if (permission.Group === 'Attribute') {
                                                return (
                                                    <Grid item xl={3} md={3} sm={6} xs={12}>
                                                        <Box key={permission._id}>
                                                            <Typography fontWeight={500} fontSize='15px'>
                                                                <span style={{ marginRight: '8px', backgroundColor: permissionsArray.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                {permission.Name}
                                                            </Typography>
                                                            <StyledSpesEngineSwitch
                                                                sx={{ cursor: !isEditMode ? 'not-allowed' : '' }}
                                                                disabled={!isEditMode}
                                                                name={permission._id}
                                                                onChange={handlePermissionChange}
                                                                checked={permissionsArray.indexOf(permission._id) !== -1 ? true : false} />
                                                            <Typography fontWeight={200} fontSize='11px'>
                                                                {permission.Description}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                )
                                            } else if (permission.Group === 'Attribute Group') {
                                                return (
                                                    <Grid item xl={3} md={3} sm={6} xs={12}>
                                                        <Box key={permission._id}>
                                                            <Typography fontWeight={500} fontSize='15px'>
                                                                <span style={{ marginRight: '8px', backgroundColor: permissionsArray.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                {permission.Name}
                                                            </Typography>
                                                            <StyledSpesEngineSwitch
                                                                sx={{ cursor: !isEditMode ? 'not-allowed' : '' }}
                                                                disabled={!isEditMode}
                                                                name={permission._id}
                                                                onChange={handlePermissionChange}
                                                                checked={permissionsArray.indexOf(permission._id) !== -1 ? true : false} />
                                                            <Typography fontWeight={200} fontSize='11px'>
                                                                {permission.Description}
                                                            </Typography>

                                                        </Box>
                                                    </Grid>
                                                )
                                            } else if (permission.Group === 'Attribute Permission') {
                                                return (
                                                    <Grid item xl={3} md={3} sm={6} xs={12}>
                                                        <Box key={permission._id}>
                                                            <Typography fontWeight={500} fontSize='15px'>
                                                                <span style={{ marginRight: '8px', backgroundColor: permissionsArray.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                {permission.Name}
                                                            </Typography>
                                                            <StyledSpesEngineSwitch
                                                                sx={{ cursor: !isEditMode ? 'not-allowed' : '' }}
                                                                disabled={!isEditMode}
                                                                name={permission._id}
                                                                onChange={handlePermissionChange}
                                                                checked={permissionsArray.indexOf(permission._id) !== -1 ? true : false} />
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

                        <CustomTabPanel value={value} index={3}>
                            <Grid container spacing={1}>
                                {
                                    permissions.length > 0 && (
                                        permissions.map(permission => {
                                            if (permission.Group === 'Family') {
                                                return (
                                                    <Grid item xl={3} md={3} sm={6} xs={12}>
                                                        <Box key={permission._id}>
                                                            <Typography fontWeight={500} fontSize='15px'>
                                                                <span style={{ marginRight: '8px', backgroundColor: permissionsArray.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                {permission.Name}
                                                            </Typography>
                                                            <StyledSpesEngineSwitch
                                                                sx={{ cursor: !isEditMode ? 'not-allowed' : '' }}
                                                                disabled={!isEditMode}
                                                                name={permission._id}
                                                                onChange={handlePermissionChange}
                                                                checked={permissionsArray.indexOf(permission._id) !== -1 ? true : false} />
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

                        <CustomTabPanel value={value} index={4}>
                            <Grid container spacing={1}>
                                {
                                    permissions.length > 0 && (
                                        permissions.map(permission => {
                                            if (permission.Group === 'Category') {
                                                return (
                                                    <Grid item xl={3} md={3} sm={6} xs={12}>
                                                        <Box key={permission._id}>
                                                            <Typography fontWeight={500} fontSize='15px'>
                                                                <span style={{ marginRight: '8px', backgroundColor: permissionsArray.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                {permission.Name}
                                                            </Typography>
                                                            <StyledSpesEngineSwitch
                                                                sx={{ cursor: !isEditMode ? 'not-allowed' : '' }}
                                                                disabled={!isEditMode}
                                                                name={permission._id}
                                                                onChange={handlePermissionChange}
                                                                checked={permissionsArray.indexOf(permission._id) !== -1 ? true : false} />
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

                        <CustomTabPanel value={value} index={5}>
                            <Grid container spacing={1}>
                                {
                                    permissions.length > 0 && (
                                        permissions.map(permission => {
                                            if (permission.Group === 'Item Type') {
                                                return (
                                                    <Grid item xl={3} md={3} sm={6} xs={12}>
                                                        <Box key={permission._id}>
                                                            <Typography fontWeight={500} fontSize='15px'>
                                                                <span style={{ marginRight: '8px', backgroundColor: permissionsArray.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                {permission.Name}
                                                            </Typography>
                                                            <StyledSpesEngineSwitch
                                                                sx={{ cursor: !isEditMode ? 'not-allowed' : '' }}
                                                                disabled={!isEditMode}
                                                                name={permission._id}
                                                                onChange={handlePermissionChange}
                                                                checked={permissionsArray.indexOf(permission._id) !== -1 ? true : false} />
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

                        <CustomTabPanel value={value} index={6}>
                            <Grid container spacing={1}>
                                {
                                    permissions.length > 0 && (
                                        permissions.map(permission => {
                                            if (permission.Group === 'Item') {
                                                return (
                                                    <Grid item xl={3} md={3} sm={6} xs={12}>
                                                        <Box key={permission._id}>
                                                            <Typography fontWeight={500} fontSize='15px'>
                                                                <span style={{ marginRight: '8px', backgroundColor: permissionsArray.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                {permission.Name}
                                                            </Typography>
                                                            <StyledSpesEngineSwitch
                                                                sx={{ cursor: !isEditMode ? 'not-allowed' : '' }}
                                                                disabled={!isEditMode}
                                                                name={permission._id}
                                                                onChange={handlePermissionChange}
                                                                checked={permissionsArray.indexOf(permission._id) !== -1 ? true : false} />
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

                        <CustomTabPanel value={value} index={7}>
                            <Grid container spacing={1}>
                                {
                                    permissions.length > 0 && (
                                        permissions.map(permission => {
                                            if (permission.Group === 'Role') {
                                                return (
                                                    <Grid item xl={3} md={3} sm={6} xs={12}>
                                                        <Box key={permission._id}>
                                                            <Typography fontWeight={500} fontSize='15px'>
                                                                <span style={{ marginRight: '8px', backgroundColor: permissionsArray.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                {permission.Name}
                                                            </Typography>
                                                            <StyledSpesEngineSwitch
                                                                sx={{ cursor: !isEditMode ? 'not-allowed' : '' }}
                                                                disabled={!isEditMode}
                                                                name={permission._id}
                                                                onChange={handlePermissionChange}
                                                                checked={permissionsArray.indexOf(permission._id) !== -1 ? true : false} />
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

                        <CustomTabPanel value={value} index={8}>
                            <Grid container spacing={1}>
                                {
                                    permissions.length > 0 && (
                                        permissions.map(permission => {
                                            if (permission.Group === 'User') {
                                                return (
                                                    <Grid item xl={3} md={3} sm={6} xs={12}>
                                                        <Box key={permission._id}>
                                                            <Typography fontWeight={500} fontSize='15px'>
                                                                <span style={{ marginRight: '8px', backgroundColor: permissionsArray.indexOf(permission._id) !== -1 ? generalTheme.palette.StatusColors.success : generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                                {permission.Name}
                                                            </Typography>
                                                            <StyledSpesEngineSwitch
                                                                sx={{ cursor: !isEditMode ? 'not-allowed' : '' }}
                                                                disabled={!isEditMode}
                                                                name={permission._id}
                                                                onChange={handlePermissionChange}
                                                                checked={permissionsArray.indexOf(permission._id) !== -1 ? true : false} />
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

                        <CustomTabPanel value={value} index={9}>
                            History
                        </CustomTabPanel>
                    </Paper>

                </Grid>

                <Grid item xl={12} md={12} xs={12} mt={1}>
                    <Paper elevation={0}>

                    </Paper>
                </Grid>
            </Grid>
        </InternalLayout>
    )
}

export default RoleDetailPage