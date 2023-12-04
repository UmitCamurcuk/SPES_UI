import React, { useEffect, useState } from 'react'
import InternalLayout from '../Layouts/InternalLayout'
import { Box, Grid, Paper, Step, StepLabel, Stepper, TextField } from '@mui/material'
import { StyledNextStepButton, StyledPreviousStepButton, StyledSaveButton } from '../../Components/Buttons/StyledButtons';
import ShowMessage from '../../Components/Notifications/Toastify';
import { getDataRequest, postDataRequest } from '../../Axios/dataRequests';
import { StyledSpesEngineLabels } from '../../Components/Typographys/StyledTypographys';
import { StyledSpesEngineInput } from '../../Components/Inputs/StyledInputs';
import { StyledSelectDropdown } from '../../Components/DropdownSelects/StyledAutoComplates';
import { StyledSpesEngineSwitch } from '../../Components/Switchs/StyledSwitchs';
import { useParams } from 'react-router-dom';

function CreateItemPage() {
    //States and Variables____________________________________
    const params = useParams();
    const [itemData, SetItemData] = useState({
        ItemType: '',
        Family: '',
        Attributes: [],
        isActive: null,
    });
    const [saveButtonDisabled, SetSaveButtonDisabled] = useState(false);
    const [activeStep, SetActiveStep] = useState(0);
    const [itemTypeData, SetItemTypeData] = useState([]);
    const [itemTypeAttributes, SetItemTypeAttributes] = useState([]);
    const steps = [
        'General Features',
        'Item Type Requirements',
        'Family Requirements',
        'Attributes Selection',
    ];

    //Hooks____________________________________________
    useEffect(() => {
        const getItemTypes = async () => {
            try {
                const response = await getDataRequest(`/ItemType/getItemType?Code=${params.ItemTypeCode}`);
                if (response) {
                    SetItemTypeData(response);
                }
            } catch (error) {
                ShowMessage('error', 'An Error Accured for requesting ItemTypes Names')
            }
        }
        getItemTypes();
    }, [])

    useEffect(() => {
        const getItemTypeAttributes = async () => {
            try {
                const response = await getDataRequest(`/ItemType/getItemType?Code=${itemData.ItemType}`);
                if (response) {
                    SetItemTypeAttributes(response.Attributes);
                }
            } catch (error) {
                ShowMessage('error', 'An Error Accured for requesting ItemTypes Names')
            }
        }
        itemData.ItemType !== '' && getItemTypeAttributes();
    }, [itemData.ItemType])

    //Functions and Methods______________________________________
    const handleClickNext = () => {
        if (activeStep === 0) {
           if (itemData.Code === '') {
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
            const response = await postDataRequest(`/Attribute/CreateAttribute`, itemData);
            console.log(response);
        } catch (error) {
            ShowMessage('Error', error);
        }
    }

    const handleInputChange = (e) => {
        const tempItemData = { ...itemData.Attributes };
        tempItemData[e.target.name] = e.target.value;
        SetItemData(prevState => ({
            ...prevState,
            Attributes: tempItemData,
        }));

        console.log(itemData)
    };

    const handleItemTypesChange = (event, newValue) => {
        if (newValue) {
            SetItemData(prevState => ({
                ...prevState,
                ItemType: newValue.Code,
            }));
        } else {
            SetItemData(prevState => ({
                ...prevState,
                ItemType: '',
            }));
        }
    };

    const handleisRequiredChange = (e) => {
        const tempItemData = { ...itemData };
        tempItemData[e.target.name] = e.target.checked;
        SetItemData(tempItemData);
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
                            Item Code
                        </StyledSpesEngineLabels>
                        <StyledSpesEngineInput
                            name='Code'
                            onChange={handleInputChange}
                        />

                        {Array.isArray(itemTypeAttributes) && itemTypeAttributes.length > 0 ? (
                            // data bir dizi ise ve içinde öğeler varsa map fonksiyonunu kullan
                            itemTypeAttributes.map((row, index) => {
                                if (row.Type === 'STRING') {
                                    return (
                                        <Box key={index} sx={{ width: '100%', display: 'contents' }}>
                                            <StyledSpesEngineLabels>
                                                {row.Name}
                                            </StyledSpesEngineLabels>
                                            <StyledSpesEngineInput
                                                name={row.Code}
                                                onChange={handleInputChange}
                                            />
                                        </Box>
                                    );
                                } else {
                                    return null;
                                }
                            })
                        ) : (
                            <></>
                        )}

                        <Box sx={{ width: '100%', display: 'grid', alignItems: 'center', justifyContent: 'center' }}>
                            <StyledSpesEngineLabels>
                                Is Active ?
                            </StyledSpesEngineLabels>
                            <StyledSpesEngineSwitch onChange={handleisRequiredChange} name='IsRequired' defaultChecked />
                        </Box>
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
        </InternalLayout >
    )
}

export default CreateItemPage