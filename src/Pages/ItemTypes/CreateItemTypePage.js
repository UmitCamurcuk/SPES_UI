import React, { useEffect, useState } from 'react'
import InternalLayout from '../Layouts/InternalLayout'
import { Box, Grid, Paper, Step, StepLabel, Stepper } from '@mui/material'
import { StyledNextStepButton, StyledPreviousStepButton, StyledSaveButton } from '../../Components/Buttons/StyledButtons';
import ShowMessage from '../../Components/Notifications/Toastify';
import { postDataRequest } from '../../Axios/dataRequests';
import { StyledSpesEngineLabels } from '../../Components/Typographys/StyledTypographys';
import { StyledSpesEngineInput } from '../../Components/Inputs/StyledInputs';
import { StyledSpesEngineSwitch } from '../../Components/Switchs/StyledSwitchs';
import ItemTypeAttributesTable from '../../Components/Tables/ItemTypeAttributesTable';

function CreateItemTypePage() {
    //States and Variables____________________________________
    const [itemTypeData, SetItemTypeData] = useState({
        Name: '',
        Code: '',
        ShowOnNavbar: true,
        Attributes: [],
        Families: [],
        Categories: [],
        isActive: true,
    })
    const [saveButtonDisabled, SetSaveButtonDisabled] = useState(false);
    const [activeStep, SetActiveStep] = useState(0);
    const [attributes, setAttributes] = useState([]);
    const steps = [
        'General Features',
        'Attributes',
        'Final Settings'
    ];

    
    //Hooks____________________________________________
    useEffect(() => {
        const attributeIds = attributes.map(attribute => attribute._id);
        SetItemTypeData(prevState => ({
            ...prevState,
            'Attributes': attributeIds,
        }));
    }, [attributes])

    //Functions and Methods______________________________________
    const handleClickNext = () => {
        if (activeStep === 0) {
            if (itemTypeData.Name === '') {
                ShowMessage('Warning', 'Please Fill Item Name Field !');
            } else if (itemTypeData.Code === '') {
                ShowMessage('Warning', 'Please Fill ITem Code Field !')
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
            const response = await postDataRequest(`/ItemType/CreateItemType`, itemTypeData);
            console.log(response);
            SetSaveButtonDisabled(false);

        } catch (error) {
            ShowMessage('Error', error);
            SetSaveButtonDisabled(false);
        }
    }

    const handleInputChange = (e) => {
        SetItemTypeData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
        }));
    };

    const handleSwitchChange = (e) => {
        SetItemTypeData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.checked,
        }));
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

                <Grid sx={{ display: activeStep === 0 ? '' : 'none' }} item xl={12} lg={12} md={12} sm={12} xs={12}>
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

                        <Box sx={{ width: '100%', display: 'grid', alignItems: 'center', justifyContent: 'center' }}>
                            <StyledSpesEngineLabels>
                                Is Active ?
                            </StyledSpesEngineLabels>
                            <StyledSpesEngineSwitch onChange={handleSwitchChange} name='isActive' defaultChecked />
                        </Box>

                        <Box sx={{ width: '100%', display: 'grid', alignItems: 'center', justifyContent: 'center' }}>
                            <StyledSpesEngineLabels>
                                Show on Navbar ?
                            </StyledSpesEngineLabels>
                            <StyledSpesEngineSwitch onChange={handleSwitchChange} name='ShowOnNavbar' defaultChecked />
                        </Box>
                    </Paper>
                </Grid>

                <Grid sx={{ display: activeStep === 1 ? '' : 'none' }} item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Paper sx={{ width: '100%', display: 'inline-grid', alignContent: 'center' }}>
                        <ItemTypeAttributesTable setClickedState={setAttributes} goToDetail={false} />
                    </Paper>
                </Grid>


                <Grid sx={{ display: activeStep === 2 ? '' : 'none' }} item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Paper sx={{ width: '100%', display: 'inline-grid', alignContent: 'center' }}>
                        <StyledSpesEngineLabels>
                            Name : {itemTypeData.Name}
                        </StyledSpesEngineLabels>

                        <StyledSpesEngineLabels>
                            Code : {itemTypeData.Code}
                        </StyledSpesEngineLabels>

                        <StyledSpesEngineLabels>
                            Show On Navbar : {itemTypeData.ShowOnNavbar === true ? 'Yes' : 'No'}
                        </StyledSpesEngineLabels>

                        <StyledSpesEngineLabels>
                            is Active ? : {itemTypeData.isActive === true ? 'Yes' : 'No'}
                        </StyledSpesEngineLabels>

                        <StyledSpesEngineLabels>
                            Attributes
                        </StyledSpesEngineLabels>

                        {Array.isArray(attributes) && attributes.length > 0 ? (
                            attributes.map((attribute) => (
                                <StyledSpesEngineLabels key={attribute.Code}>
                                    {attribute.Name}
                                </StyledSpesEngineLabels>
                            ))
                        ) : (<></>)}

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

export default CreateItemTypePage