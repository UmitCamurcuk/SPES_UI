import React from 'react'
import InternalLayout from '../Layouts/InternalLayout'
import { Grid } from '@mui/material'
import AttributesTable from '../../Components/Tables/AttributesTable';
import { StyledCreateButton } from '../../Components/Buttons/StyledButtons';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { StyledPageHeaderDescriptionLabel, StyledPageHeaderLabel } from '../../Components/Typographys/StyledTypographys';

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
                    <AttributesTable />
                </Grid>
            </Grid>
        </InternalLayout>
    )
}

export default AttributesIndexPage