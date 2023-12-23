import React from 'react'
import InternalLayout from '../Layouts/InternalLayout'
import { Grid } from '@mui/material'
import { StyledCreateButton } from '../../Components/Buttons/StyledButtons';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { StyledPageHeaderDescriptionLabel, StyledPageHeaderLabel } from '../../Components/Typographys/StyledTypographys';
import DetailTableWithFilters from '../../Components/Tables/DetailTableWithFilters';

function AttributeGroupsPage() {
    return (
        <InternalLayout>
            <Grid pl={3} container spacing={0}>
                <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
                    <StyledPageHeaderLabel>
                        Attribute Groups List
                    </StyledPageHeaderLabel>
                    <StyledPageHeaderDescriptionLabel>
                        You can see and Create a new Attribute Group
                    </StyledPageHeaderDescriptionLabel>
                </Grid>
                <Grid align='right' pr={2} item xl={3} lg={3} md={3} sm={12} xs={12}>
                    <StyledCreateButton onClick={() => window.location.href = '/AttributeGroup/Create'} startIcon={<AddCircleOutline />}>Create a new Attribute Group</StyledCreateButton>
                </Grid>
                <Grid item mt={3} xl={12} lg={12} md={12} sm={12} xs={12}>
                    <DetailTableWithFilters
                        api='/Attribute/AttributeGroupsTableData'
                        link='/AttributeGroup/Detail/'
                        paramfilters={
                            {
                                Code: '',
                                Name: '',
                                isActive: '',
                            }
                        }
                        columns={
                            [
                                {
                                    Name: 'Code',
                                    Label: 'Code',
                                    Type: 'String',
                                    Filter: true,
                                    DefaultOrder: true,
                                    CanOrder: false,
                                },
                                {
                                    Name: 'Name',
                                    Label: 'Name',
                                    Type: 'String',
                                    Filter: true,
                                    DefaultOrder: false,
                                    CanOrder: false,
                                },
                                {
                                    Name: 'Attributes',
                                    Label: 'Attributes Count',
                                    Type: 'Length',
                                    Filter: false,
                                    DefaultOrder: false,
                                    CanOrder: false,
                                },
                                {
                                    Name: 'ItemTypes',
                                    Label: 'ItemTypes Count',
                                    Type: 'Length',
                                    Filter: false,
                                    DefaultOrder: false,
                                    CanOrder: false,
                                },
                                {
                                    Name: 'isActive',
                                    Label: 'isActive ?',
                                    Type: 'Boolean',
                                    Filter: true,
                                    DefaultOrder: false,
                                    CanOrder: false,
                                },
                                {
                                    Name: 'createdAt',
                                    Label: 'Created',
                                    Type: 'Date',
                                    Filter: false,
                                    DefaultOrder: false,
                                    CanOrder: false,
                                },
                                {
                                    Name: 'updatedAt',
                                    Label: 'Updated',
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

export default AttributeGroupsPage