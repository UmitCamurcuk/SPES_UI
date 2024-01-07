import React, { useEffect, useState } from 'react'
import InternalLayout from '../../Layouts/InternalLayout'
import { Badge, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Paper, Typography } from '@mui/material'
import { getDataRequest } from '../../../Axios/dataRequests'
import { useParams } from 'react-router-dom'
import { StyledSpesEngineInput } from '../../../Components/Inputs/StyledInputs'
import SpesEngineDynamicTable from '../../../Components/Tables/SpesEngineDynamicTable'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import EditIcon from '@mui/icons-material/Edit';
import UndoIcon from '@mui/icons-material/Undo';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


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


function SystemUserDetailPage() {
    //STATES AND VARIABLES ____________________________________________________________________________________________
    const params = useParams();
    const [isEditMode, setIsEditMode] = useState(false);
    const [deleteModal, SetDeleteModal] = useState(false);
    const [userData, SetUserData] = useState({
        _id: '',
        Name: '',
        LastName: '',
        UserName: '',
        Password: '',
        Email: '',
        BirthDate: '',
        Phone: '',
        isActive: false,
        Location: '',
        Roles: [],
        SelectedRoles: [],
        RoleNames: [],
    })
    const [selectedRoles, SetSelectedRoles] = useState([]);
    const [tabValue, SetTabValue] = useState(0);

    //HOOKS ____________________________________________________________________________________________
    useEffect(() => {
        const getUserData = async () => {
            const response = await getDataRequest(`/User/getUser?_id=${params.id}`)
            SetUserData(response)
        }
        getUserData()
    }, [params])

    useEffect(() => {
        SetUserData(prevState => ({
            ...prevState,
            RoleNames: selectedRoles.map(item => item.Name)
        }))

        SetUserData(prevState => ({
            ...prevState,
            SelectedRoles: selectedRoles.map(item => item._id)
        }))
    }, [selectedRoles])

    //FUNCTIONS AND METHODS ____________________________________________________________________________________________
    const handleTabChange = (event, newValue) => {
        SetTabValue(newValue);
    };

    const handleUndoChanges = (e) => {

    }

    const handleSaveChange = async (e) => {
    }

    const hnadleDeleteUser = async () => {

    }

    return (
        <InternalLayout>
            <Grid container spacing={2}>
                <Grid mb={2} item xl={12} lg={12} md={12} sm={12} xs={12}>
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
                                    User Details
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
                                    <IconButton onClick={handleSaveChange}>
                                        <SaveIcon />
                                    </IconButton>
                                    <IconButton onClick={e => SetDeleteModal(true)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xl={8} md={8} xs={8}>
                    <Paper elevation={0}>
                        <Grid container spacing={1}>
                            <Grid item xl={3} md={4} xs={12}>
                                <Typography>
                                    Username
                                </Typography>
                                <StyledSpesEngineInput
                                    value={userData?.UserName}
                                />
                            </Grid>
                            <Grid item xl={3} md={4} xs={12}>
                                <Typography>
                                    Email
                                </Typography>
                                <StyledSpesEngineInput
                                    value={userData?.Email}
                                />
                            </Grid>
                            <Grid item xl={3} md={4} xs={12}>
                                <Typography>
                                    Birthdate
                                </Typography>
                                <StyledSpesEngineInput
                                    value={userData?.BirthDate}
                                />
                            </Grid>
                            <Grid item xl={3} md={4} xs={12}>
                                <Typography>
                                    Phone
                                </Typography>
                                <StyledSpesEngineInput
                                    value={userData?.Phone}
                                />
                            </Grid>
                            <Grid item xl={3} md={4} xs={12}>
                                <Typography>
                                    is Active
                                </Typography>
                                <StyledSpesEngineInput
                                    value={userData?.Phone}
                                />
                            </Grid>
                            <Grid item xl={3} md={4} xs={12}>
                                <Typography>
                                    Location
                                </Typography>
                                <StyledSpesEngineInput
                                    value={userData?.Location}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xl={4} md={4} xs={4}>
                    <Paper elevation={0}>
                        <Box
                            sx={{
                                minHeight: '160px',
                                width: 'auto',
                                border: '1px solid black',
                            }}
                        >
                            IMAGE
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <Typography>
                                    {`${userData.Name} ${userData.LastName}`}
                                </Typography>
                            </Box>

                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                {
                                    userData.Roles?.length > 0 && userData.Roles?.map(role => (
                                        <Badge key={role?._id} sx={{
                                            color: 'White',
                                            backgroundColor: role?.Name === 'Admin' || role?.Name === 'System Admin' ? 'rgb(0, 200, 83)' : 'rgb(33, 150, 243)',
                                            pl: 1, pr: 1, pt: 0.5, pb: 0.5, borderRadius: '10px'
                                        }}>
                                            <Typography fontSize='11px'>
                                                {role?.Name}
                                            </Typography>
                                        </Badge>
                                    ))
                                }
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xl={12} md={12} xs={12}>
                    <Box sx={{ width: '100%' }}>
                        <Paper sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                                <Tab label="User Roles" {...a11yProps(0)} />
                                <Tab label="History" {...a11yProps(1)} />
                            </Tabs>
                        </Paper>
                        <Paper>
                            <CustomTabPanel value={tabValue} index={0}>
                                <Typography>
                                    User Roles
                                </Typography>
                                <Box>
                                    {userData?._id !== '' && (<SpesEngineDynamicTable
                                        api='/Role/RolesTableData'
                                        link='/System/Roles/Detail/'
                                        goToDetail={false}
                                        canSelected={true}
                                        defaultSelected={userData?.Roles}
                                        setClickedState={SetSelectedRoles}
                                        clickedLinkAfterClick='/System/Role/Detail/'
                                        paramfilters={
                                            {
                                                Name: '',
                                                isActive: '',
                                            }
                                        }
                                        columns={
                                            [
                                                {
                                                    Name: 'Name',
                                                    Label: 'Name',
                                                    Type: 'String',
                                                    Filter: true,
                                                    DefaultOrder: true,
                                                    CanOrder: false,
                                                },
                                                {
                                                    Name: 'Description',
                                                    Label: 'Description',
                                                    Type: 'String',
                                                    Filter: true,
                                                    DefaultOrder: true,
                                                    CanOrder: false,
                                                },
                                                {
                                                    Name: 'Permissions',
                                                    Label: 'Permissions',
                                                    Type: 'Length',
                                                    Filter: true,
                                                    DefaultOrder: true,
                                                    CanOrder: false,
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
                                    />)}
                                </Box>
                            </CustomTabPanel>
                            <CustomTabPanel value={tabValue} index={1}>
                                Item Two
                            </CustomTabPanel>
                        </Paper>

                    </Box>
                </Grid>

                <Grid item xl={12} md={12} xs={12}>

                </Grid>
            </Grid>


            <React.Fragment>
                <Dialog
                    open={deleteModal}
                    onClose={e => SetDeleteModal(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Delete Attribute
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to do this? Once you confirm the transaction,
                            the Attribute will be deleted. Attribute cannot be deleted in the following cases:
                            If it has an Association
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='outlined' onClick={e => SetDeleteModal(false)}>Cancel</Button>
                        <Button variant='outlined' onClick={hnadleDeleteUser} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </InternalLayout>
    )
}

export default SystemUserDetailPage