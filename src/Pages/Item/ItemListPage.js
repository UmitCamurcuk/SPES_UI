import React from 'react'
import InternalLayout from '../Layouts/InternalLayout'
import DynamicTable from '../../Components/Tables/DynamicTable'
import { Grid } from '@mui/material'
import { StyledCreateButton } from '../../Components/Buttons/StyledButtons'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { StyledPageHeaderDescriptionLabel, StyledPageHeaderLabel } from '../../Components/Typographys/StyledTypographys'
import { useParams } from 'react-router-dom'

function ItemListPage() {
  //States and Variables_______________________
  const params = useParams();




  return (
    <InternalLayout>
      <Grid container spacing={0}>
        <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
          <StyledPageHeaderLabel>
            {params.ItemTypeCode} List
          </StyledPageHeaderLabel>
          <StyledPageHeaderDescriptionLabel>
            You can see and Create a new Item
          </StyledPageHeaderDescriptionLabel>
        </Grid>
        <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
          <StyledCreateButton onClick={() => window.location.href = `/Item/Create/${params.ItemTypeCode}`} startIcon={<AddCircleOutline />}>Create a new {params.ItemTypeCode}</StyledCreateButton>
        </Grid>
      </Grid>
      <DynamicTable
        param_api={`/Item/ItemsTableData?ItemType=${params.ItemTypeCode}`}
        param_columns={
          [
            {
              Name: 'Code',
              Code: 'Code',
              isFiltered: true,
              isOrder: true,
            },
            {
              Name: 'Item Type',
              Code: 'ItemType',
              isFiltered: true,
              isOrder: true,
            },
            {
              Name: 'Family',
              Code: 'Family',
              isFiltered: true,
              isOrder: true,
            },
            {
              Name: 'Created User',
              Code: 'CreatedUser',
              isFiltered: true,
              isOrder: true,
            },
            {
              Name: 'Updated User',
              Code: 'UpdatedUser',
              isFiltered: true,
              isOrder: true,
            },
            {
              Name: 'Created On',
              Code: 'CreatedOn',
              isFiltered: true,
              isOrder: true,
            },
            {
              Name: 'Updated On',
              Code: 'UpdatedOn',
              isFiltered: true,
              isOrder: true,
            }
          ]
        }

      />
    </InternalLayout>
  )
}

export default ItemListPage