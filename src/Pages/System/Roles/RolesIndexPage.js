import React from 'react'
import InternalLayout from '../../Layouts/InternalLayout'
import { Grid, Typography } from '@mui/material'
import SpesEngineDynamicTable from '../../../Components/Tables/SpesEngineDynamicTable';

function RolesIndexPage() {
    return (
        <InternalLayout>

            <Grid container spacing={2}>
                <Grid item xl={12} md={12} xs={12}>
                    <Typography>
                        Roles Table
                    </Typography>
                </Grid>

                <Grid item xl={12} md={12} xs={12}>
                    <SpesEngineDynamicTable
                        api='/Role/RolesTableData'
                        link='/System/Roles/Detail/'
                        goToDetail={true}
                        canSelected={false}
                        clickedLinkAfterClick='/System/Roles/Detail/'
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