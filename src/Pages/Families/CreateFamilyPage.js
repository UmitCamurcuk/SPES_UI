import React, { useEffect, useState } from 'react'
import InternalLayout from '../Layouts/InternalLayout'
import { Box, Grid, Paper, Step, StepLabel, Stepper, TextField } from '@mui/material'
import { StyledNextStepButton, StyledPreviousStepButton, StyledSaveButton } from '../../Components/Buttons/StyledButtons';
import { getDataRequest, postDataRequest } from '../../Axios/dataRequests';
import ShowMessage from '../../Components/Notifications/Toastify';
import { StyledSpesEngineLabels } from '../../Components/Typographys/StyledTypographys';
import { StyledSpesEngineInput } from '../../Components/Inputs/StyledInputs';
import { StyledMultiSelectDropdown } from '../../Components/DropdownSelects/StyledAutoComplates';
import ItemTypeAttributesTable from '../../Components/Tables/ItemTypeAttributesTable';

function CreateFamilyPage() {
    //States and Variables______________________________
    const [familyData, SetFamilyData] = useState({
        Name: '',
        Code: '',
        AttributeGroups: [],
        ItemType: '',
        Attributes: []
    })
    const [activeStep, SetActiveStep] = useState(0);
    const [itemTypes, SetItemTypes] = useState([]);
    const [attributes, SetAttributes] = useState([]);
    const [saveButtonDisabled, SetSaveButtonDisabled] = useState(false);
    const [attributeGroups, SetAttributeGroups] = useState([]);
    const steps = [
        'General Features',
        'Attribute Groups And Attributes',
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
        const attributeIds = attributes.map(attribute => attribute._id);
        SetFamilyData(prevState => ({
            ...prevState,
            'Attributes': attributeIds,
        }));
    }, [attributes])


    //Functions and Methods____________________________

    const handleInputChange = (e) => {
        const tempAttribute = { ...familyData };
        tempAttribute[e.target.name] = e.target.value;
        SetFamilyData(tempAttribute);
    };

    const handleItemTypesChange = (event, newValue) => {
        const selectedValues = newValue.map((option) => option._id);
        const tempAttribute = { ...familyData };
        tempAttribute['ItemTypes'] = selectedValues;
        SetFamilyData(tempAttribute);
    };

    const handleAttributeGroupsChange = (event, newValue) => {
        const selectedValues = newValue.map((option) => option._id);
        const tempAttribute = { ...familyData };
        tempAttribute['AttributeGroups'] = selectedValues;
        SetFamilyData(tempAttribute);
      };

    const handleClickNext = () => {
        if (activeStep === 0) {
            if (familyData.Name === '') {
                ShowMessage('Warning', 'Please Fill Attribute Name Field !')
            } else if (familyData.Code === '') {
                ShowMessage('Warning', 'Please Fill Attribute Code Field !')
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
            const response = await postDataRequest(`/Family/CreateFamily`, familyData);
            if (response.Code === 200) {
                ShowMessage('Success', 'Family Saved Succesfully.');
            } else {
                ShowMessage('Error', response.Message);
            }
            SetSaveButtonDisabled(false);
        } catch (error) {
            ShowMessage('Error', error);
            SetSaveButtonDisabled(false);
        }
    }
    return (
        <InternalLayout>
            <Grid container spacing={0}>
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
                            onChange={handleInputChange}
                        />

                        <StyledSpesEngineLabels>
                            Code
                        </StyledSpesEngineLabels>
                        <StyledSpesEngineInput
                            name='Code'
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
                    <Paper sx={{ width: '100%', display: 'inline-grid', alignContent: 'center' }}>

                        <StyledSpesEngineLabels>
                            Attribute Group
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
                            Other Attributes
                        </StyledSpesEngineLabels>
                        <ItemTypeAttributesTable filters={{ 'AttributeGroup': 'None' }} setClickedState={SetAttributes} goToDetail={false} />
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
            </Grid>


        </InternalLayout>
    )
}

export default CreateFamilyPage