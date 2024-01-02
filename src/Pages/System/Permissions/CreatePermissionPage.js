import React, { useState } from 'react'
import InternalLayout from '../../Layouts/InternalLayout'
import { Button, Grid, Paper, TextField } from '@mui/material'
import { postDataRequest } from '../../../Axios/dataRequests'
import ShowMessage from '../../../Components/Notifications/Toastify'

function CreatePermissionPage() {
    const [permissionData, SetPermissionData] = useState({
        Name: '',
        Code: '',
        Description: '',
        Type: '',
        Group: '',
    })

    const handleSavePermission = async () => {
        try {
            const response = await postDataRequest('/Permission/CreatePermission', permissionData)
            if (response.Code === 200) {
                ShowMessage('Success', response.Message)
            } else {
                ShowMessage('Error', response.Message)
            }
        } catch (error) {
            ShowMessage('Error', error)
        }
    }
    return (
        <InternalLayout>
            <Grid container spacing={0}>
                <Grid item xl={12} md={12} xs={12}>
                    <Paper sx={{ minHeight: '80vh' }} elevation={0}>
                        <TextField
                            label='Name'
                            onChange={e => SetPermissionData(prevState => ({ ...prevState, Name: e.target.value }))}
                            value={permissionData.Name}
                        />

                        <TextField
                            label='Code'
                            onChange={e => SetPermissionData(prevState => ({ ...prevState, Code: e.target.value }))}
                            value={permissionData.Code}
                        />

                        <TextField
                            label='Dscription'
                            onChange={e => SetPermissionData(prevState => ({ ...prevState, Description: e.target.value }))}
                            value={permissionData.Description}
                        />

                        <TextField
                            label='Type'
                            onChange={e => SetPermissionData(prevState => ({ ...prevState, Type: e.target.value }))}
                            value={permissionData.Type}
                        />

                        <TextField
                            label='Group'
                            onChange={e => SetPermissionData(prevState => ({ ...prevState, Group: e.target.value }))}
                            value={permissionData.Group}
                        />
                    </Paper>

                    <Button onClick={handleSavePermission} >
                        Save
                    </Button>
                </Grid>


            </Grid>
        </InternalLayout>
    )
}

export default CreatePermissionPage