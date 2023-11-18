import React from 'react'
import InternalLayout from '../Layouts/InternalLayout'
import { Grid } from '@mui/material'
import AttributesTable from '../../Components/Tables/AttributesTable';

function AttributesIndexPage() {
    return (
        <InternalLayout>
            <Grid container spacing={0}>
                <Grid item mt={3} xl={12} lg={12} md={12} sm={12} xs={12}>
                    <AttributesTable />
                </Grid>
            </Grid>
        </InternalLayout>
    )
}

export default AttributesIndexPage