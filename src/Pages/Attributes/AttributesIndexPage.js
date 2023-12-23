import React from 'react'
import InternalLayout from '../Layouts/InternalLayout'
import { Grid } from '@mui/material'
import { StyledCreateButton } from '../../Components/Buttons/StyledButtons';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { StyledPageHeaderDescriptionLabel, StyledPageHeaderLabel } from '../../Components/Typographys/StyledTypographys';
import DetailTableWithFilters from '../../Components/Tables/DetailTableWithFilters';

function AttributesIndexPage() {
    return (
        <InternalLayout>
            <Grid pl={3} container spacing={0}>
                <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
                    <StyledPageHeaderLabel>
                        Attributes List
                    </StyledPageHeaderLabel>
                    <StyledPageHeaderDescriptionLabel>
                        You can see and Create a new Attributes
                    </StyledPageHeaderDescriptionLabel>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
                    <StyledCreateButton onClick={()=> window.location.href = '/Attribute/Create'} startIcon={<AddCircleOutline />}>Create a new Attribute</StyledCreateButton>
                </Grid>
                <Grid  item mt={3} xl={12} lg={12} md={12} sm={12} xs={12}>
                <DetailTableWithFilters
                        api='/Attribute/AttributesTableData'
                        link='/Attribute/Detail/'
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
                                    Name: 'Type',
                                    Label: 'Type',
                                    Type: 'String',
                                    Filter: false,
                                    DefaultOrder: false,
                                    CanOrder: true,
                                },
                                {
                                    Name: 'AttributeGroups',
                                    Label: 'Attribute Groups',
                                    Type: 'Array',
                                    Filter: false,
                                    DefaultOrder: false,
                                    CanOrder: false,
                                },
                                {
                                    Name: 'isRequired',
                                    Label: 'Required',
                                    Type: 'Boolean',
                                    Filter: true,
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

export default AttributesIndexPage