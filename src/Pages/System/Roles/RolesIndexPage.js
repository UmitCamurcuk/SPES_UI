import React from 'react'
import InternalLayout from '../../Layouts/InternalLayout'
import { Grid } from '@mui/material'
import SpesEngineDynamicTable from '../../../Components/Tables/SpesEngineDynamicTable';
import { StyledPageHeaderDescriptionLabel, StyledPageHeaderLabel } from '../../../Components/Typographys/StyledTypographys';
import { StyledCreateButton } from '../../../Components/Buttons/StyledButtons';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';

function RolesIndexPage() {
    return (
        <InternalLayout>
            <Grid container spacing={2}>
                <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
                    <StyledPageHeaderLabel>
                        Roles List
                    </StyledPageHeaderLabel>
                    <StyledPageHeaderDescriptionLabel>
                        You can see and Create a new Role
                    </StyledPageHeaderDescriptionLabel>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
                    <StyledCreateButton onClick={() => window.location.href = '/System/Roles/Create'} startIcon={<AddCircleOutline />}>Create a new Role</StyledCreateButton>
                </Grid>

                <Grid item xl={12} md={12} xs={12}>
                    <SpesEngineDynamicTable
                        api='/Role/RolesTableData'
                        link='/System/Roles/Detail/'
                        goToDetail={true}
                        canSelected={false}
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
                    />
                </Grid>
            </Grid>
        </InternalLayout>
    )
}

export default RolesIndexPage