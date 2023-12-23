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
import ItemTypeAttributesTable from '../../Components/Tables/ItemTypeAttributesTable';

function CreateAttributeGroupPage() {
    //States and Variables______________________________
    const [attributeGroupData, SetattributeGroupData] = useState({
        Name: '',
        Code: '',
        Attributes: [],
        ItemTypes: [],
        isActive: true,
    })
    const [activeStep, SetActiveStep] = useState(0);
    const [itemTypes, SetItemTypes] = useState([]);
    const [attributes, SetAttributes] = useState([]);
    const [saveButtonDisabled, SetSaveButtonDisabled] = useState(false);
    const steps = [
        'General Features',
        'Attributes',
        'Item Types',
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
        const attributeIds = attributes.map(attribute => attribute._id);
        SetattributeGroupData(prevState => ({
            ...prevState,
            'Attributes': attributeIds,
        }));
    }, [attributes])


    //Functions and Methods____________________________

    const handleClickNext = () => {
        if (activeStep === 0) {
            if (attributeGroupData.Name === '') {
                ShowMessage('Warning', 'Please Fill Attribute Name Field !')
            } else if (attributeGroupData.Code === '') {
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

    const handleInputChange = (e) => {
        const tempAttribute = { ...attributeGroupData };
        tempAttribute[e.target.name] = e.target.value;
        SetattributeGroupData(tempAttribute);
    };

    const handleItemTypesChange = (event, newValue) => {
        const selectedValues = newValue.map((option) => option._id);
        const tempAttribute = { ...attributeGroupData };
        tempAttribute['ItemTypes'] = selectedValues;
        SetattributeGroupData(tempAttribute);
    };

    const handleisRequiredChange = (e) => {
        const tempAttribute = { ...attributeGroupData };
        tempAttribute[e.target.name] = e.target.checked;
        SetattributeGroupData(tempAttribute);
        console.log(attributeGroupData)
    }


    const handleClickSave = async () => {
        SetSaveButtonDisabled(true);
        try {
            const response = await postDataRequest(`/Attribute/CreateAttributeGroup`, attributeGroupData);
            if (response.Code === 200) {
                ShowMessage('Success', 'Attribute Saved Succesfully.');
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
                        value={attributeGroupData.Name}
                        onChange={handleInputChange}
                    />

                    <StyledSpesEngineLabels>
                        Code
                    </StyledSpesEngineLabels>
                    <StyledSpesEngineInput
                        name='Code'
                        value={attributeGroupData.Code}
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
                    <Box sx={{ display: 'grid', alignItems: 'center', justifyContent: 'center' }}>
                        <StyledSpesEngineLabels>
                            Is Active ?
                        </StyledSpesEngineLabels>
                        <StyledSpesEngineSwitch onChange={handleisRequiredChange} name='isActive' defaultChecked />
                    </Box>
                </Paper>
            </Grid>

            <Grid sx={{ display: activeStep === 1 ? 'block' : 'none' }} item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Paper sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box>
                        <ItemTypeAttributesTable setClickedState={SetAttributes} goToDetail={false} />
                    </Box>
                </Paper>
            </Grid>



            <Grid sx={{ display: activeStep === 2 ? 'block' : 'none' }} item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Paper sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    ITEM TYPES
                </Paper>
            </Grid>


            <Grid sx={{ display: activeStep === 3 ? 'block' : 'none' }} item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Paper sx={{ width: '100%', display: 'inline-grid', alignItems: 'center', justifyContent: 'center' }}>
                    <StyledSpesEngineLabels>
                        Name
                    </StyledSpesEngineLabels>
                    <StyledSpesEngineInput
                        name='Name'
                        value={attributeGroupData.Name}
                        inputProps={
                            { readOnly: true, }
                        }
                    />

                    <StyledSpesEngineLabels>
                        Code
                    </StyledSpesEngineLabels>
                    <StyledSpesEngineInput
                        name='Code'
                        value={attributeGroupData.Code}
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
                        sx={{ display: activeStep < 3 ? '' : 'none' }}
                        onClick={handleClickNext}>
                        Next
                    </StyledNextStepButton>

                    <StyledSaveButton
                        disabled={saveButtonDisabled}
                        sx={{ display: activeStep === 3 ? '' : 'none' }}
                        onClick={handleClickSave}>
                        Save
                    </StyledSaveButton>
                </Box>
            </Grid>

        </InternalLayout>
    )
}

export default CreateAttributeGroupPage