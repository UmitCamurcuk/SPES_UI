import React, { useEffect, useMemo, useState } from 'react'
import InternalLayout from '../Layouts/InternalLayout'
import { Box, Chip, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import { useParams } from 'react-router-dom';
import { getDataRequest } from '../../Axios/dataRequests';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import EditIcon from '@mui/icons-material/Edit';
import UndoIcon from '@mui/icons-material/Undo';
import SaveIcon from '@mui/icons-material/Save';
import { StyledSelectDropdown } from '../../Components/DropdownSelects/StyledAutoComplates';
import SpesEngineDynamicTable from '../../Components/Tables/SpesEngineDynamicTable';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { StyledSpesEngineSwitch } from '../../Components/Switchs/StyledSwitchs';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


function AttributeDetailsPage() {
  //States and Variables_________________________
  const [attributeData, SetAttributeData] = useState({
    Name: '',
    Code: '',
    Type: null,
    AttributeGroups: [],
    AttributeValidations: [],
  });
  const [attributeDataRAW, SetAttributeDataRAW] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const params = useParams();
  const [value, setValue] = useState(0);
  const [selectedAttributeGroups, SetSelectedAttributeGroups] = useState([]);
  const attributeTypes = useMemo(() => [
    { label: 'String', Code: 'STRING' },
    { label: 'Number', Code: 'NUMBER' },
    { label: 'QR Code', Code: 'QR' },
    { label: 'Datetime', Code: 'DATE' },
    { label: 'File', Code: 'FILE' },
    { label: 'Image', Code: 'IMAGE' },
  ], []);


  //Hooks________________________________________
  useEffect(() => {
    const getAttributeData = async () => {
      const response = await getDataRequest(`/Attribute/GetAttribute?_id=${params.id}`);
      SetAttributeData(response);
      SetAttributeData((prevState) => ({
        ...prevState,
        'Type': attributeTypes.find(type => type.Code === response.Type)
      }))
      SetAttributeDataRAW(response)
    }
    getAttributeData();
  }, [params, attributeTypes])

  useEffect(() => {
    SetAttributeData(prevState => ({
      ...prevState,
      'AttributeGroups': selectedAttributeGroups,
    }));
  }, [selectedAttributeGroups])


  //Functions and Methods_______________________
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    SetAttributeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleUndoChanges = (e) => {
    SetAttributeData((prevState) => ({
      ...prevState,
      ...attributeDataRAW,
      AttributeValidations: attributeDataRAW.AttributeValidations.map((item) => ({ ...item })),
      Type: attributeTypes.find((type) => type.Code === attributeDataRAW.Type.Code) // Make sure to compare Codes
    }));
    console.log(attributeData)
    SetSelectedAttributeGroups(attributeDataRAW?.AttributeGroups);
  }

  const handleAttributeTypeChange = (e) => {
    if (e) {
      const tempAttribute = { ...attributeData };
      tempAttribute['Type'] = e;
      SetAttributeData(tempAttribute);
    } else {
      const tempAttribute = { ...attributeData };
      tempAttribute['Type'] = null;
      SetAttributeData(tempAttribute);
    }
  }

  const handleValidationChange = (type, value, id) => {
    const validationData = attributeData.AttributeValidations.find(item => item._id === id);
    if (type === 'NUMBER' || type === 'STRING') {
      validationData.Value = value;
      SetAttributeData(prevState => ({
        ...prevState,
        AttributeValidations: prevState.AttributeValidations.map(item =>
          item._id === id ? validationData : item
        ),
      }));
    } else if (type === 'BOOLEAN') {
      validationData.Value = value;
      SetAttributeData(prevState => ({
        ...prevState,
        AttributeValidations: prevState.AttributeValidations.map(item =>
          item._id === id ? validationData : item
        ),
      }));
    }
  }

  const handleSaveChange = (e) => {
    console.log(attributeData)
  }

  return (
    <InternalLayout>
      <Grid container spacing={0}>
        <Grid mb={2} item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Paper elevation={0} sx={{
            border: 'none',
            height: '50px',
            display: 'inline-flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
            <Grid alignItems='center' container spacing={0}>
              <Grid item xl={4} md={4} xs={6}>
                <Typography sx={{
                  fontSize: '16px',
                  fontWeight: 400,
                  pl: '2em'
                }}>
                  Attribute Settings
                </Typography>
              </Grid>
              <Grid align='center' item xl={4} md={4} xs={0}>
                <Box sx={{ display: isEditMode ? 'block' : 'none' }}>
                  <Chip label='Edit Mode' />
                </Box>
              </Grid>
              <Grid align='right' item xl={4} md={4} xs={6}>
                <Box>
                  <IconButton onClick={(e) => setIsEditMode(!isEditMode)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={handleUndoChanges}>
                    <UndoIcon />
                  </IconButton>
                  <IconButton onClick={handleSaveChange}>
                    <SaveIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid sx={{ backgroundClor: 'white' }} alignContent='center' item xl={12} md={12} xs={12}>
          <Paper elevation={0}>
            <Tabs
              variant="scrollable"
              value={value}
              onChange={handleChange}
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab label="General" {...a11yProps(0)} />
              <Tab label="Attribute Groups" {...a11yProps(2)} />
              <Tab label="Validations" {...a11yProps(3)} />
              <Tab label="Permissions" {...a11yProps(4)} />
              <Tab label="Associations" {...a11yProps(5)} />
              <Tab label="Calculations" {...a11yProps(6)} />
              <Tab label="History" {...a11yProps(7)} />
            </Tabs>
          </Paper>
        </Grid>
        <Grid mt={1} sx={{ backgroundClor: 'white' }} item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Paper sx={{ minHeight: '60vh' }} elevation={0}>
            {/* Attribute General Values */}
            <TabPanel value={value} index={0}>
              <Typography
                sx={{
                  fontSize: '18px'
                }}
              >
                General Settings
              </Typography>

              <Typography
                sx={{
                  fontSize: '12px'
                }}
              >
                Here you can change the most defining properties of the attribute.
              </Typography>

              <Grid mt={5} container spacing={0}>
                <Grid item xl={3} md={4} sm={6} xs={12}>
                  <Box sx={{ width: '100%' }} >
                    <Box>
                      <Typography>
                        Name
                      </Typography>
                    </Box>
                    <Box key='Attribute Name' sx={{ display: 'inline-flex' }}>
                      <TextField
                        disabled={!isEditMode}
                        value={attributeData?.Name}
                        name='Name'
                        onChange={handleInputChange}
                        variant='outlined'
                        sx={{
                          width: '330px',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          paddingBottom: 0,
                          marginTop: 0,
                          borderRadius: '20px',
                          fontSize: '12px',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                            '& input': {
                              color: '#66799e',
                              height: '43.59px',
                              fontSize: '12px',
                              fontWeight: 500,
                              border: '1px solid #ddd',
                              borderRadius: '20px',
                              padding: '8px',
                              outline: 'none',
                              width: '100%',
                              boxSizing: 'border-box',
                            },
                          },
                          '& label': {
                            color: 'blue',
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xl={3} md={4} sm={6} xs={12}>
                  <Box sx={{ width: '100%' }} >
                    <Box>
                      <Typography>
                        Code
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'inline-flex' }}>
                      <TextField
                        disabled={!isEditMode}
                        value={attributeData?.Code}
                        variant='outlined'
                        onChange={handleInputChange}
                        name='Code'
                        sx={{
                          width: '330px',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          paddingBottom: 0,
                          marginTop: 0,
                          borderRadius: '20px',
                          fontSize: '12px',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                            '& input': {
                              color: '#66799e',
                              height: '43.59px',
                              fontSize: '12px',
                              fontWeight: 500,
                              border: '1px solid #ddd',
                              borderRadius: '20px',
                              padding: '8px',
                              outline: 'none',
                              width: '100%',
                              boxSizing: 'border-box',
                            },
                          },
                          '& label': {
                            color: 'blue',
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xl={3} md={4} sm={6} xs={12}>
                  <Box sx={{ width: '100%' }} >
                    <Box>
                      <Typography>
                        Type
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'inline-flex' }}>
                      <StyledSelectDropdown
                        disabled={true}
                        options={attributeTypes}
                        value={attributeData?.Type}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.Code === value.Code}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                        onChange={(event, newValue) => {
                          handleAttributeTypeChange(newValue)
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            {/* Attribute GROUPS */}
            <TabPanel value={value} index={1}>
              <Grid container spacing={0}>
                <Grid item xl={12} md={12} sm={12} xs={12}>
                  <Typography
                    sx={{
                      fontSize: '18px'
                    }}
                  >
                    Attribute Groups
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: '12px'
                    }}
                  >
                    Here you can select or remove the attribute groups to which the attribute will depend.
                  </Typography>

                  <Box mt={3} sx={{ width: '100%' }}>
                    {
                      attributeDataRAW !== null && (
                        <SpesEngineDynamicTable
                          setClickedState={SetSelectedAttributeGroups}
                          goToDetail={false}
                          api={`/Attribute/AttributeGroupsTableData`}
                          canSelected={true}
                          defaultSelected={attributeData?.AttributeGroups}
                          columns={
                            [
                              {
                                Name: 'Code',
                                Label: 'Code',
                                Type: 'String',
                                Filter: true,
                                DefaultOrder: true,
                                CanOrder: false,
                              },
                              {
                                Name: 'Name',
                                Label: 'Name',
                                Type: 'String',
                                Filter: true,
                                DefaultOrder: false,
                                CanOrder: false,
                              },
                              {
                                Name: 'Attributes',
                                Label: 'Attributes Count',
                                Type: 'Length',
                                Filter: false,
                                DefaultOrder: false,
                                CanOrder: false,
                              },
                              {
                                Name: 'ItemTypes',
                                Label: 'ItemTypes Count',
                                Type: 'Length',
                                Filter: false,
                                DefaultOrder: false,
                                CanOrder: false,
                              },
                              {
                                Name: 'isActive',
                                Label: 'isActive ?',
                                Type: 'Boolean',
                                Filter: true,
                                DefaultOrder: false,
                                CanOrder: false,
                              },
                              {
                                Name: 'createdAt',
                                Label: 'Created',
                                Type: 'Date',
                                Filter: false,
                                DefaultOrder: false,
                                CanOrder: false,
                              },
                              {
                                Name: 'updatedAt',
                                Label: 'Updated',
                                Type: 'Date',
                                Filter: false,
                                DefaultOrder: false,
                                CanOrder: false,
                              }
                            ]
                          }
                        />
                      )
                    }

                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            {/* Attribute VALIDATIONS */}
            <TabPanel value={value} index={2}>
              <Grid container spacing={0}>
                <Grid item xl={12} md={12} sm={12} xs={12}>
                  <Typography
                    sx={{
                      fontSize: '18px'
                    }}
                  >
                    Attribute Validations
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: '12px'
                    }}
                  >
                    Here you can set which values ​the attribute can or cannot take depending on its type.
                  </Typography>
                  <Grid mt={3} container spacing={1}>
                    {
                      Array.isArray(attributeData.AttributeValidations) && attributeData.AttributeValidations.length > 0 && (
                        attributeData.AttributeValidations.map((item, index) => (
                          <Grid item xl={3} md={4} xs={12} key={index}>
                            {
                              item.Type === 'STRING' ? (
                                <Box>
                                  <Box>
                                    <Typography>
                                      {item.Name}
                                    </Typography>
                                  </Box>
                                  <TextField
                                    disabled={!isEditMode}
                                    value={item?.Value}
                                    name={item.Code}
                                    onChange={(e) => handleValidationChange(item.Type, e.target.value, item._id)}
                                    variant='outlined'
                                    sx={{
                                      width: '330px',
                                      marginLeft: 'auto',
                                      marginRight: 'auto',
                                      paddingBottom: 0,
                                      marginTop: 0,
                                      borderRadius: '20px',
                                      fontSize: '12px',
                                      '& .MuiOutlinedInput-root': {
                                        borderRadius: '20px',
                                        '& input': {
                                          color: '#66799e',
                                          height: '43.59px',
                                          fontSize: '12px',
                                          fontWeight: 500,
                                          border: '1px solid #ddd',
                                          borderRadius: '20px',
                                          padding: '8px',
                                          outline: 'none',
                                          width: '100%',
                                          boxSizing: 'border-box',
                                        },
                                      },
                                      '& label': {
                                        color: 'blue',
                                      },
                                    }}
                                  />
                                </Box>
                              ) : item.Type === 'NUMBER' ? (
                                <Box>
                                  <Box>
                                    <Typography>
                                      {item.Name}
                                    </Typography>
                                  </Box>
                                  <TextField
                                    onChange={(e) => handleValidationChange(item.Type, e.target.value, item._id)}
                                    disabled={!isEditMode}
                                    value={item?.Value}
                                    name={item.Code}
                                    variant='outlined'
                                    type='number'
                                    sx={{
                                      width: '330px',
                                      marginLeft: 'auto',
                                      marginRight: 'auto',
                                      paddingBottom: 0,
                                      marginTop: 0,
                                      borderRadius: '20px',
                                      fontSize: '12px',
                                      '& .MuiOutlinedInput-root': {
                                        borderRadius: '20px',
                                        '& input': {
                                          color: '#66799e',
                                          height: '43.59px',
                                          fontSize: '12px',
                                          fontWeight: 500,
                                          border: '1px solid #ddd',
                                          borderRadius: '20px',
                                          padding: '8px',
                                          outline: 'none',
                                          width: '100%',
                                          boxSizing: 'border-box',
                                        },
                                      },
                                      '& label': {
                                        color: 'blue',
                                      },
                                    }}
                                  />
                                </Box>
                              ) : item.Type === 'DATE' ? (
                                <Box>
                                  <Box>
                                    <Typography>
                                      {item.Name}
                                    </Typography>
                                  </Box>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                      <DatePicker disabled={!isEditMode} value={dayjs(item.Value)} label="DD.MM.YYY" />
                                    </DemoContainer>
                                  </LocalizationProvider>
                                </Box>
                              ) : item.Type === 'BOOLEAN' ? (
                                <Box>
                                  <Box>
                                    <Typography>
                                      {item.Name}
                                    </Typography>
                                  </Box>
                                  <React.Fragment key={item.Code}>
                                    <StyledSpesEngineSwitch
                                      onChange={(e) => handleValidationChange(item.Type, e.target.checked, item._id)}
                                      disabled={!isEditMode}
                                      checked={item.Value === 'true' || item.Value === true ? true : false}
                                      name={item.Code} />
                                  </React.Fragment>
                                </Box>
                              ) : null
                            }
                          </Grid>
                        ))
                      )
                    }
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
            {/* Attribute PERMISSIONS */}
            <TabPanel value={value} index={3}>
              <Typography
                sx={{
                  fontSize: '18px'
                }}
              >
                Attribute Permissions
              </Typography>

              <Typography
                sx={{
                  fontSize: '12px'
                }}
              >
                Here you can set which values ​the attribute can or cannot take depending on its type.
              </Typography>
            </TabPanel>
            {/* Attribute ASSOCIATIONS */}
            <TabPanel value={value} index={4}>
              <Typography
                sx={{
                  fontSize: '18px'
                }}
              >
                Attribute Associtions
              </Typography>

              <Typography
                sx={{
                  fontSize: '12px'
                }}
              >
                Here you can set which values ​the attribute can or cannot take depending on its type.
              </Typography>
            </TabPanel>
            {/* Attribute CALCULATIONS */}
            <TabPanel value={value} index={5}>
              <Typography
                sx={{
                  fontSize: '18px'
                }}
              >
                Attribute Calculations
              </Typography>

              <Typography
                sx={{
                  fontSize: '12px'
                }}
              >
                Here you can set which values ​the attribute can or cannot take depending on its type.
              </Typography>
            </TabPanel>
            {/* Attribute HISTORY */}
            <TabPanel value={value} index={6}>
              <Typography
                sx={{
                  fontSize: '18px'
                }}
              >
                Attribute History
              </Typography>

              <Typography
                sx={{
                  fontSize: '12px'
                }}
              >
                Here you can set which values ​the attribute can or cannot take depending on its type.
              </Typography>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </InternalLayout>
  )
}

export default AttributeDetailsPage