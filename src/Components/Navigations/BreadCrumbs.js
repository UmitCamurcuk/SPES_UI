import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

export default function BreadCrumbs() {
    //Hooks _____________
    const navigate = useNavigate();
    const location = useLocation();

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={() => navigate('/')}>
            Home
        </Link>
    ];
    if (location.pathname.split('/')[1] !== '') {
        breadcrumbs.push(
            <Link
                underline="hover"
                key="2"
                color="inherit"
                href={`/${location.pathname.split('/')[1]}`}
            >
                {location.pathname.split('/')[1]}
            </Link>
        )
    }
    if (location.pathname.split('/')[2] !== '') {
        breadcrumbs.push(
            <Typography key="3" color="text.primary">
                {location.pathname.split('/')[2]}
            </Typography>
        )

    }
    return (
        <Box sx={{ width: '100%', padding: '1em' }}>
            <Stack spacing={2}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
        </Box>
    );
}