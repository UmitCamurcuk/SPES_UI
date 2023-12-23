import React, { useEffect, useState } from 'react'
import InternalLayout from '../Layouts/InternalLayout'
import { Grid, Paper, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom';
import { getDataRequest } from '../../Axios/dataRequests';
import { generalTheme } from '../../Theme/GeneralTheme';
function AttributeDetailsPage() {
  //States and Variables_________________________
  const [attributeData, SetAttributeData] = useState();
  const { pathname } = useLocation();

  //Hooks________________________________________
  useEffect(() => {
    const getAttributeData = async () => {
      const response = getDataRequest(`/Attribute/GetAttribute?_id=${pathname.split('/')[3]}`);
      SetAttributeData(response);
    }
    getAttributeData();
  }, [pathname])

  //Functions and Methods_______________________



  return (
    <InternalLayout>
      <Grid container spacing={0}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Paper sx={{ background: generalTheme.palette.attributeColor.HeaderBackground , height:'40px' }}>
            <Typography sx={{ textAlign: 'center', }}>
              Attribute Settings
            </Typography>
          </Paper>
        </Grid>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Paper>
            Name : {attributeData?.Name}
          </Paper>
        </Grid>
      </Grid>
    </InternalLayout>
  )
}

export default AttributeDetailsPage