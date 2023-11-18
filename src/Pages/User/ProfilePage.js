import React, { useEffect, useState } from 'react'
import InternalLayout from '../Layouts/InternalLayout'
import { Box, Grid, Paper } from '@mui/material'
import { getDataRequest } from '../../Axios/dataRequests';
import ShowMessage from '../../Components/Notifications/Toastify';
import { StyledProfileInput } from '../../Components/Inputs/StyledInputs';
import { StyledPaperHeaderLabels, StyledProfileDetailsLabels, StyledProfileLabels, StyledProfileNameLabels } from '../../Components/Typographys/StyledTypographys';
import { StyledProfileSaveButton } from '../../Components/Buttons/StyledButtons';

function ProfilePage() {
    //Variables and States_____________________
    const [myInformations, setMyInformations] = useState({
        "_id": "",
        "Name": "",
        "LastName": "",
        "UserName": "",
        "Password": "",
        "Email": "",
        "BirthDate": "",
        "Role": {
            "Name": "",
            "Description": "",
            "Permissions": []
        },
        "Phone": "",
        "isActive": null,
        "Location": "",
        "createdAt": "",
        "updatedAt": "",
        "__v": 0
    });

    //Hooks_______________________________________
    useEffect(() => {
        const getMyInfo = async () => {
            try {
                const response = await getDataRequest('/User/getMyUserInfo');
                if (response) {
                    setMyInformations(response[0]);
                }
            } catch (error) {
                ShowMessage('error', 'An Error Accured for requesting GetMyInfo')
            }
        }
        getMyInfo();
    }, [])

    return (
        <InternalLayout>
            <Grid container spacing={4} sx={{ pl: 5, pr: 5 }}>
                <Grid order={{ md: 1, sm: 2 }} item xl={8} lg={8} md={8} sm={12} xs={12}>
                    <Paper sx={{ pr: 3, pl: 3, pt: 2 }} >
                        <StyledPaperHeaderLabels>
                            General Informations
                        </StyledPaperHeaderLabels>

                        <Grid container spacing={1}>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <StyledProfileLabels>
                                    Name
                                </StyledProfileLabels>
                                <StyledProfileInput
                                    placeholder='Your Name'
                                    value={myInformations.Name}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <StyledProfileLabels>
                                    Surname
                                </StyledProfileLabels>
                                <StyledProfileInput
                                    placeholder='Your Surname'
                                    fullWidth
                                    value={myInformations.LastName}
                                />
                            </Grid>

                        </Grid>

                        <Grid container spacing={1}>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <StyledProfileLabels>
                                    Birthday
                                </StyledProfileLabels>
                                <StyledProfileInput
                                    placeholder='DD/MM/YYYY'
                                    fullWidth
                                    value={myInformations.BirthDate}
                                />
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <StyledProfileLabels>
                                    Gender
                                </StyledProfileLabels>
                                <StyledProfileInput
                                    placeholder='Female or Male'
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <StyledProfileLabels>
                                    Email
                                </StyledProfileLabels>
                                <StyledProfileInput
                                    placeholder='example@example.com'
                                    fullWidth
                                    value={myInformations.Email}
                                />
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <StyledProfileLabels>
                                    Phone
                                </StyledProfileLabels>
                                <StyledProfileInput
                                    placeholder='00-000-000-00-00'
                                    value={myInformations.Phone}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <StyledPaperHeaderLabels>
                            Adress
                        </StyledPaperHeaderLabels>

                        <Grid container spacing={1}>
                            <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
                                <StyledProfileLabels>
                                    Adress
                                </StyledProfileLabels>
                                <StyledProfileInput
                                    placeholder='Your Adress String'
                                    fullWidth
                                    value={myInformations.Location}
                                />
                            </Grid>
                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                <StyledProfileLabels>
                                    Number
                                </StyledProfileLabels>
                                <StyledProfileInput
                                    placeholder='Adress Number'
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                                <StyledProfileLabels>
                                    City
                                </StyledProfileLabels>
                                <StyledProfileInput
                                    placeholder='City'
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                                <StyledProfileLabels>
                                    State
                                </StyledProfileLabels>
                                <StyledProfileInput
                                    placeholder='State'
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                                <StyledProfileLabels>
                                    ZIP
                                </StyledProfileLabels>
                                <StyledProfileInput
                                    placeholder='ZIP'
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <StyledProfileSaveButton>
                                Save All
                            </StyledProfileSaveButton>
                        </Grid>
                    </Paper>


                </Grid>
                <Grid order={{ md: 2, sm: 1 }} item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <Paper sx={{ pr: 3, pl: 3, pt: 2 }}>
                        <StyledPaperHeaderLabels>
                            Profile
                        </StyledPaperHeaderLabels>
                        <Grid container spacing={0}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Box sx={{
                                    backgroundImage: "url('https://media.licdn.com/dms/image/D4D16AQFEplWsUpzfbA/profile-displaybackgroundimage-shrink_200_800/0/1664794599568?e=2147483647&v=beta&t=6A9YjgtvtFQY3uRS6w8vpkm61mRqUird-bOgzfU-IRA')",
                                    width: '100%',
                                    backgroundSize: 'cover',
                                    backgroundPositionX: '50%',
                                    backgroundPositionY: '0%',
                                    minHeight: '200px',
                                    objectFit: 'cover',
                                    position: 'relative'
                                }}>
                                    <img
                                        alt='ProfileImage'
                                        height='160px'
                                        width='160px'
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: 'calc(50% - 80px)',
                                            borderRadius: '50%'
                                        }}
                                        src='https://media.licdn.com/dms/image/D4D03AQGsH-DvnssoMQ/profile-displayphoto-shrink_200_200/0/1673875237542?e=2147483647&v=beta&t=O3JRvtSZ9Vfyisv6OaQp9L9GTAo4eRfhy0mue0CSg4E' />
                                </Box>
                            </Grid>
                            <Grid mt='80px' item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <StyledProfileNameLabels>
                                    {myInformations.Name + ' ' + myInformations.LastName}
                                </StyledProfileNameLabels>
                                <StyledProfileDetailsLabels>
                                    {myInformations.Role.Name}
                                </StyledProfileDetailsLabels>
                                <StyledProfileDetailsLabels>
                                    {myInformations.Location}
                                </StyledProfileDetailsLabels>

                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </InternalLayout>
    )
}

export default ProfilePage