import React from 'react'
import InternalLayout from '../Layouts/InternalLayout'
import { Grid } from '@mui/material'
import { StyledCreateButton } from '../../Components/Buttons/StyledButtons';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { StyledPageHeaderDescriptionLabel, StyledPageHeaderLabel } from '../../Components/Typographys/StyledTypographys';
import ItemTypesTable from '../../Components/Tables/ItemTypesTable';

function ItemTypesIndexPage() {
    return (
        <InternalLayout>
            <Grid pl={3} container spacing={0}>
                <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
                    <StyledPageHeaderLabel>
                        Item Types List
                    </StyledPageHeaderLabel>
                    <StyledPageHeaderDescriptionLabel>
                        You can see and Create a new Item Types
                    </StyledPageHeaderDescriptionLabel>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
                    <StyledCreateButton onClick={()=> window.location.href = '/ItemType/Create'} startIcon={<AddCircleOutline />}>Create a new Item Type</StyledCreateButton>
                </Grid>
                <Grid  item mt={3} xl={12} lg={12} md={12} sm={12} xs={12}>
                    <ItemTypesTable />
                </Grid>
            </Grid>
        </InternalLayout>
    )
}

export default ItemTypesIndexPage