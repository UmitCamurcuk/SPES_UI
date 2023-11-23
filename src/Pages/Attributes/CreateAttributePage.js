import React, { useEffect, useState } from 'react'
import InternalLayout from '../Layouts/InternalLayout'
import { Box, Grid, Paper, Step, StepLabel, Stepper, TextField } from '@mui/material'
import { StyledNextStepButton, StyledPreviousStepButton, StyledSaveButton } from '../../Components/Buttons/StyledButtons';
import { StyledSpesEngineLabels } from '../../Components/Typographys/StyledTypographys';
import { StyledSpesEngineInput } from '../../Components/Inputs/StyledInputs';
import ShowMessage from '../../Components/Notifications/Toastify';
import { getDataRequest, postDataRequest } from '../../Axios/dataRequests';
import { StyledMultiSelectDropdown, StyledSelectDropdown } from '../../Components/DropdownSelects/StyledAutoComplates';
import { StyledSpesEngineSwitch } from '../../Components/Switchs/StyledSwitchs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function CreateAttributePage() {
  //States and Variables______________________________
  const [attributeData, SetAttributeData] = useState({
    Name: '',
    Code: '',
    Type: '',
    ItemTypes: [],
    AttributeGroups: [],
    AttributeValidations: [],
    isRequired: true,
    isActive: true,
  })
  const [activeStep, SetActiveStep] = useState(0);
  const [itemTypes, SetItemTypes] = useState([]);
  const [attributeGroups, SetAttributeGroups] = useState([]);
  const [attributeValidations, SetAttributeValidations] = useState([]);
  const [saveButtonDisabled, SetSaveButtonDisabled] = useState(false);
  const steps = [
    'General Features',
    'Attribute Validations',
    'Final Features',
  ];

  const attributeTypes = [
    { label: 'String', Code: 'STRING' },
    { label: 'Number', Code: 'NUMBER' },
    { label: 'QR Code', Code: 'QR' },
    { label: 'Datetime', Code: 'DATE' },
    { label: 'File', Code: 'FILE' },
    { label: 'Image', Code: 'IMAGE' },
  ]
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

  useEffect(() => {
    const getAttributeGroups = async () => {
      try {
        const response = await getDataRequest('/Attribute/getAttributeGroups');
        if (response) {
          SetAttributeGroups(response);
        }
      } catch (error) {
        ShowMessage('error', 'An Error Accured for requesting ItemTypes Names')
      }
    }
    getAttributeGroups();
  }, [])

  useEffect(() => {
    const getAttributeValidations = async () => {
      try {
        const response = await getDataRequest(`/Attribute/getAttributeValidation?Type=${attributeData.Type}`);
        if (response) {
          SetAttributeValidations(response);
          let tempArr = [];
          response.forEach(element => {
            tempArr.push(
              {
                "Validation": element._id,
                "Value": ''
              }
            )

          });
          SetAttributeData(prevState => ({
            ...prevState,
            AttributeValidations: tempArr
          }))
        }
      } catch (error) {
        ShowMessage('error', 'An Error Accured for requesting ItemTypes Names')
      }
    }
    if (attributeData.Type !== '') {
      getAttributeValidations();
    }
  }, [attributeData.Type])

  //Functions and Methods____________________________

  const handleClickNext = () => {
    if (activeStep === 0) {
      if (attributeData.Name === '') {
        ShowMessage('Warning', 'Please Fill Attribute Name Field !')
      } else if (attributeData.Code === '') {
        ShowMessage('Warning', 'Please Fill Attribute Code Field !')
      } else if (attributeData.Type === '') {
        ShowMessage('Warning', 'Please Fill Attribute Type Field !')
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

  const handleInputChange = (e) => {
    const tempAttribute = { ...attributeData };
    tempAttribute[e.target.name] = e.target.value;
    SetAttributeData(tempAttribute);
  };

  const handleAttributeValidationsChange = (id, type, code, value) => {
    console.log(attributeData);
    console.log(type);
    console.log(code);
    console.log(value);

    if (type === 'NUMBER' || type === 'STRING') {
      if (value !== '') {
        SetAttributeData(prevState => {
          const newState = { ...prevState };
          newState.AttributeValidations = prevState.AttributeValidations.map(validation => {
            if (validation.Validation === id) {
              return { ...validation, Value: value };
            }
            return validation;
          });
          return newState;
        });
      } else {
        SetAttributeData(prevState => {
          const newState = { ...prevState };
          newState.AttributeValidations = prevState.AttributeValidations.map(validation => {
            if (validation.Validation === id) {
              return { ...validation, Value: '' };
            }
            return validation;
          });
          return newState;
        });
      }
    } else if (type === 'BOOLEAN') {
      SetAttributeData(prevState => {
        const newState = { ...prevState };
        newState.AttributeValidations = prevState.AttributeValidations.map(validation => {
          if (validation.Validation === id) {
            return { ...validation, Value: value.toString() };
          }
          return validation;
        });
        return newState;
      });
    }
  };

  const handleItemTypesChange = (event, newValue) => {
    const selectedValues = newValue.map((option) => option._id);
    const tempAttribute = { ...attributeData };
    tempAttribute['ItemTypes'] = selectedValues;
    SetAttributeData(tempAttribute);
  };

  const handleAttributeGroupsChange = (event, newValue) => {
    const selectedValues = newValue.map((option) => option._id);
    const tempAttribute = { ...attributeData };
    tempAttribute['AttributeGroups'] = selectedValues;
    SetAttributeData(tempAttribute);
  };

  const handleisRequiredChange = (e) => {
    const tempAttribute = { ...attributeData };
    tempAttribute[e.target.name] = e.target.checked;
    SetAttributeData(tempAttribute);
    console.log(attributeData)
  }


  const handleAttributeTypeChange = (e) => {
    if (e) {
      const tempAttribute = { ...attributeData };
      tempAttribute['Type'] = e.Code;
      SetAttributeData(tempAttribute);
    } else {
      const tempAttribute = { ...attributeData };
      tempAttribute['Type'] = '';
      SetAttributeData(tempAttribute);
    }
  }

  const handleClickSave = async () => {
    SetSaveButtonDisabled(true);
    try {
      const response = await postDataRequest(`/Attribute/CreateAttribute`, attributeData);
      if(response.Code === 200){
        ShowMessage('Success','Attribute Saved Succesfully.');
      } else {
        ShowMessage('Error',response.Message);
      }
      SetSaveButtonDisabled(false);
    } catch (error) {
      ShowMessage('Error', error);
      SetSaveButtonDisabled(false);
    }
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
            Attribute Type
          </StyledSpesEngineLabels>
          <StyledSelectDropdown
            options={attributeTypes}
            filterSelectedOptions
            id="attributeTypeSelect"
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            renderInput={(params) => (
              <TextField
                {...params}
              />
            )}
            onChange={(event, newValue) => {
              handleAttributeTypeChange(newValue)
            }}
          />

          <StyledSpesEngineLabels>
            Attribute Groups
          </StyledSpesEngineLabels>
          <StyledMultiSelectDropdown
            onChange={handleAttributeGroupsChange}
            name='Attribute Groups'
            multiple
            filterSelectedOptions
            id="tags-outlined"
            options={attributeGroups}
            getOptionLabel={(option) => option.Name}
            renderInput={(params) => (
              <TextField
                {...params}
              />
            )}
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
            <StyledSpesEngineSwitch onChange={handleisRequiredChange} name='isRequired' defaultChecked />

            <StyledSpesEngineLabels>
              Is Active ?
            </StyledSpesEngineLabels>
            <StyledSpesEngineSwitch onChange={handleisRequiredChange} name='isActive' defaultChecked />

            {Array.isArray(attributeValidations) && attributeValidations.length > 0 ? (
              attributeValidations.map((validation) => {
                if (validation.Type === 'NUMBER') {
                  return (
                    <React.Fragment key={validation.Code}>
                      <StyledSpesEngineLabels>
                        {validation.Name}
                      </StyledSpesEngineLabels>
                      <StyledSpesEngineInput
                        type='number'
                        name={validation.Code}
                        id={validation._id}
                        onChange={(e) => handleAttributeValidationsChange(validation._id, validation.Type, validation.Code, e.target.value)}
                      />
                    </React.Fragment>
                  )
                } else if (validation.Type === 'BOOLEAN') {
                  return (
                    <React.Fragment key={validation.Code}>
                      <StyledSpesEngineLabels>
                        {validation.Name}
                      </StyledSpesEngineLabels>
                      <StyledSpesEngineSwitch
                        id={validation._id}
                        onChange={(e) => handleAttributeValidationsChange(validation._id, validation.Type, validation.Code, e.target.checked)}
                        name={validation.Code} />
                    </React.Fragment>
                  )
                } else if (validation.Type === 'DATE') {
                  return (
                    <React.Fragment key={validation.Code}>
                      <StyledSpesEngineLabels>
                        {validation.Name}
                      </StyledSpesEngineLabels>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                          <DatePicker label="DD.MM.YYY" />
                        </DemoContainer>
                      </LocalizationProvider>
                    </React.Fragment>
                  )
                } else {
                  return (
                    <>
                      THERE IS NO VALIDATIONS
                    </>
                  )
                }
              })
            ) : (
              <div>
                No Validations
              </div>
            )}
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