import React from 'react'
import InternalLayout from '../../Layouts/InternalLayout'
import { Grid, Typography } from '@mui/material'
import SpesEngineDynamicTable from '../../../Components/Tables/SpesEngineDynamicTable';
import { StyledCreateButton } from '../../../Components/Buttons/StyledButtons';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';

function PermissionsIndexPage() {
    return (
        <InternalLayout>

            <Grid container spacing={2}>
                <Grid item xl={10} md={10} xs={8}>
                    <Typography>
                        Permissions Table
                    </Typography>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
                    <StyledCreateButton onClick={()=> window.location.href = '/Permissions/Create'} startIcon={<AddCircleOutline />}>Create a new Permission</StyledCreateButton>
                </Grid>

                <Grid item xl={12} md={12} xs={12}>
                    <SpesEngineDynamicTable
                        api='/Permission/PermissionsTableData'
                        link='/System/User/Detail/'
                        goToDetail={true}
                        canSelected={false}
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
                                    Name: 'Name',
                                    Label: 'Name',
                                    Type: 'String',
                                    Filter: true,
                                    DefaultOrder: true,
                                    CanOrder: false,
                                },
                                {
                                    Name: 'Code',
                                    Label: 'Code',
                                    Type: 'String',
                                    Filter: true,
                                    DefaultOrder: false,
                                    CanOrder: false,
                                },
                                {
                                    Name: 'Description',
                                    Label: 'Description',
                                    Type: 'String',
                                    Filter: true,
                                    DefaultOrder: false,
                                    CanOrder: false,
                                },
                                {
                                    Name: 'Type',
                                    Label: 'Type',
                                    Type: 'String',
                                    Filter: true,
                                    DefaultOrder: false,
                                    CanOrder: false,
                                },
                                {
                                    Name: 'Group',
                                    Label: 'Group',
                                    Type: 'String',
                                    Filter: true,
                                    DefaultOrder: false,
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
                    />
                </Grid>
            </Grid>
        </InternalLayout>
    )
}

export default PermissionsIndexPage