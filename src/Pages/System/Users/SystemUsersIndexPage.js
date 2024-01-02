import React from 'react'
import InternalLayout from '../../Layouts/InternalLayout'
import { Grid, Typography } from '@mui/material'
import SpesEngineDynamicTable from '../../../Components/Tables/SpesEngineDynamicTable';

function SystemUsersIndexPage() {
    return (
        <InternalLayout>

            <Grid container spacing={2}>
                <Grid item xl={12} md={12} xs={12}>
                    <Typography>
                        Authors Table
                    </Typography>
                </Grid>

                <Grid item xl={12} md={12} xs={12}>
                    <SpesEngineDynamicTable
                        api='/User/SystemUsersTableData'
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
                </Grid>
            </Grid>
        </InternalLayout>
    )
}

export default SystemUsersIndexPage