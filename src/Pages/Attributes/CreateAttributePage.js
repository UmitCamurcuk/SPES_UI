import React, { useEffect, useState } from 'react'
import InternalLayout from '../Layouts/InternalLayout'
import { Box, Grid, Paper, Step, StepLabel, Stepper, TextField } from '@mui/material'
import { StyledNextStepButton, StyledPreviousStepButton, StyledSaveButton } from '../../Components/Buttons/StyledButtons';
import { StyledSpesEngineLabels } from '../../Components/Typographys/StyledTypographys';
import { StyledSpesEngineInput } from '../../Components/Inputs/StyledInputs';
import ShowMessage from '../../Components/Notifications/Toastify';
import { getDataRequest, postDataRequest } from '../../Axios/dataRequests';
import { StyledMultiSelectDropdown } from '../../Components/DropdownSelects/StyledAutoComplates';
import { StyledSpesEngineSwitch } from '../../Components/Switchs/StyledSwitchs';

function CreateAttributePage() {
  //States and Variables______________________________
  const [attributeData, SetAttributeData] = useState({
    Name: '',
    Code: '',
    Type: '',
    ItemTypes: [],
    IsRequired: null
  })
  const [activeStep, SetActiveStep] = useState(0);
  const [itemTypes, SetItemTypes] = useState(0);
  const [saveButtonDisabled, SetSaveButtonDisabled] = useState(false);
  const steps = [
    'General Features',
    'Permissions And Roles',
    'Final Features',
  ];
  //Hooks____________________________________________
  useEffect(() => {
    const getItemTypes = async () => {
      try {
        const response = await getDataRequest('/ItemType/getItemTypes');
        if (response) {
          SetItemTypes(response);
        }
      } catch (error) {
        ShowMessage('error', 'An Error Accured for requesting ItemTypes Names')
      }
    }
    getItemTypes();
  }, [])

  //Functions and Methods____________________________

  const handleClickNext = () => {
    if (activeStep === 0) {
      if (attributeData.Name === '') {
        ShowMessage('Warning', 'Please Fill Attribute Name Field !')
      } else if (attributeData.Code === '') {
        ShowMessage('Warning', 'Please Fill Attribute Code Field !')
      } else if (attributeData.Type === '') {
        ShowMessage('Warning', 'Please Fill Attribute Type Field !')
      } else if (attributeData.ItemTypes.length === 0) {
        ShowMessage('Warning', 'Please Select an ItemType !')
      } else {
        SetActiveStep(activeStep + 1)
      }
    } else {
      SetActiveStep(activeStep + 1)
    }
  }


  const handleClickPrevious = () => {
    SetActiveStep(activeStep - 1)
  }


  const handleClickSave = async () => {
    SetSaveButtonDisabled(true);
    try {
      const response = await postDataRequest(`/Attribute/CreateAttribute`, attributeData);
      console.log(response);
    } catch (error) {
      ShowMessage('Error', error);
    }
  }

  const handleInputChange = (e) => {
    const tempAttribute = { ...attributeData };
    tempAttribute[e.target.name] = e.target.value;
    SetAttributeData(tempAttribute);
  };

  const handleItemTypesChange = (event, newValue) => {
    const selectedValues = newValue.map((option) => option._id);
    const tempAttribute = { ...attributeData };
    tempAttribute['ItemTypes'] = selectedValues;
    SetAttributeData(tempAttribute);
  };

  const handleisRequiredChange = (e) => {
    const tempAttribute = { ...attributeData };
    tempAttribute[e.target.name] = e.target.checked;
    SetAttributeData(tempAttribute);
    console.log(attributeData)
  }

  return (
    <InternalLayout>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Grid>

      <Grid sx={{ display: activeStep === 0 ? 'block' : 'none' }} item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Paper sx={{ width: '100%', display: 'inline-grid', alignContent: 'center' }}>
          <StyledSpesEngineLabels>
            Name
          </StyledSpesEngineLabels>
          <StyledSpesEngineInput
            name='Name'
            value={attributeData.Name}
            onChange={handleInputChange}
          />

          <StyledSpesEngineLabels>
            Code
          </StyledSpesEngineLabels>
          <StyledSpesEngineInput
            name='Code'
            value={attributeData.Code}
            onChange={handleInputChange}
          />

          <StyledSpesEngineLabels>
            Type
          </StyledSpesEngineLabels>
          <StyledSpesEngineInput
            name='Type'
            value={attributeData.Type}
            onChange={handleInputChange}
          />

          <StyledSpesEngineLabels>
            Item Types
          </StyledSpesEngineLabels>
          <StyledMultiSelectDropdown
            onChange={handleItemTypesChange}
            name='ItemTypes'
            multiple
            filterSelectedOptions
            id="tags-outlined"
            options={itemTypes}
            getOptionLabel={(option) => option.Name}
            renderInput={(params) => (
              <TextField
                {...params}
              />
            )}
          />
        </Paper>
      </Grid>

      <Grid sx={{ display: activeStep === 1 ? 'block' : 'none' }} item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Paper sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box>
            <StyledSpesEngineLabels>
              Is Required ?
            </StyledSpesEngineLabels>
            <StyledSpesEngineSwitch onChange={handleisRequiredChange} name='IsRequired' defaultChecked />
          </Box>
        </Paper>
      </Grid>


      <Grid sx={{ display: activeStep === 2 ? 'block' : 'none' }} item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Paper sx={{ width: '100%', display: 'inline-grid', alignItems: 'center', justifyContent: 'center' }}>
          <StyledSpesEngineLabels>
            Name
          </StyledSpesEngineLabels>
          <StyledSpesEngineInput
            name='Name'
            value={attributeData.Name}
            inputProps={
              { readOnly: true, }
            }
          />

          <StyledSpesEngineLabels>
            Code
          </StyledSpesEngineLabels>
          <StyledSpesEngineInput
            name='Code'
            value={attributeData.Code}
            inputProps={
              { readOnly: true, }
            }
          />

          <StyledSpesEngineLabels>
            Type
          </StyledSpesEngineLabels>
          <StyledSpesEngineInput
            name='Type'
            value={attributeData.Type}
            inputProps={
              { readOnly: true, }
            }
          />
        </Paper>
      </Grid>


      <Grid
        sx={{
          width: '100%',
          display: 'inline-flex',
          alignContent: 'center',
          justifyContent: 'center'
        }}
        item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Box sx={{ position: 'fixed', bottom: 10, minWidth: 'max-content' }}>
          <StyledPreviousStepButton
            mr={3}
            sx={{ display: activeStep > 0 ? '' : 'none' }}
            onClick={handleClickPrevious}>
            Previous
          </StyledPreviousStepButton>

          <StyledNextStepButton
            mr={3}
            sx={{ display: activeStep < 2 ? '' : 'none' }}
            onClick={handleClickNext}>
            Next
          </StyledNextStepButton>

          <StyledSaveButton
            disabled={saveButtonDisabled}
            sx={{ display: activeStep === 2 ? '' : 'none' }}
            onClick={handleClickSave}>
            Save
          </StyledSaveButton>
        </Box>
      </Grid>

    </InternalLayout>
  )
}

export default CreateAttributePage