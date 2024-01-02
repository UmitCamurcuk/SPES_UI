import React from 'react'
import InternalLayout from '../Layouts/InternalLayout'
import { Box, Grid, Paper, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import InventoryIcon from '@mui/icons-material/Inventory';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie } from 'recharts';

const data = [
  { name: 'Oca', uv: 10, pv: 32, amt: 42 },
  { name: 'Sub', uv: 22, pv: 44, amt: 66 },
  { name: 'Mar', uv: 37, pv: 5, amt: 42 },
  { name: 'Nis', uv: 41, pv: 12, amt: 52 },
  { name: 'May', uv: 43, pv: 15, amt: 68 },
  { name: 'Haz', uv: 43, pv: 11, amt: 54 },
  { name: 'Tem', uv: 62, pv: 48, amt: 110 },
  { name: 'Agu', uv: 71, pv: 3, amt: 74 },
  { name: 'Eyl', uv: 81, pv: 33, amt: 114 },
  { name: 'Eki', uv: 34, pv: 43, amt: 77 },
  { name: 'Kas', uv: 83, pv: 54, amt: 138 },
  { name: 'Ara', uv: 91, pv: 61, amt: 152 },
]
const data01 = [
  {
    "name": "Group A",
    "value": 400
  },
  {
    "name": "Group B",
    "value": 300
  },
  {
    "name": "Group C",
    "value": 300
  },
  {
    "name": "Group D",
    "value": 200
  },
  {
    "name": "Group E",
    "value": 278
  },
  {
    "name": "Group F",
    "value": 189
  }
];
const data02 = [
  {
    "name": "Group A",
    "value": 2400
  },
  {
    "name": "Group B",
    "value": 4567
  },
  {
    "name": "Group C",
    "value": 1398
  },
  {
    "name": "Group D",
    "value": 9800
  },
  {
    "name": "Group E",
    "value": 3908
  },
  {
    "name": "Group F",
    "value": 4800
  }
];
function HomePage() {
  return (
    <InternalLayout>
      <Grid
        container spacing={2}>
        <Grid item xl={3} lg={3} md={4} xs={6}>
          <Paper
            sx={{
              borderRadius: '10px',
              padding: '16px'
            }}
            elevation={0}>
            <Box sx={{ width: '100%', display: 'inline-flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography
                  sx={{
                    textTransform: 'uppercase',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    color: 'rgb(103, 116, 142)',
                    fontWeight: 600
                  }}
                >
                  Items Count
                </Typography>

                <Typography
                  sx={{
                    textTransform: 'none',
                    fontSize: '1.25rem',
                    lineHeight: '1.375',
                    color: 'rgb(52, 71, 103)',
                    fontWeight: 600
                  }}
                >
                  1.403
                </Typography>
              </Box>

              <Box>
                <InventoryIcon sx={{ fontSize: '50px' }} />
              </Box>
            </Box>

            <Typography
              sx={{
                textTransform: 'none',
                fontSize: '1.rem',
                lineHeight: '1.6',
                color: 'rgb(52, 71, 103)',
                fontWeight: 400
              }}
            >
              <span
                style={{
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  fontWeight: 700,
                  marginRight: '3px',
                  color: 'rgb(45, 206, 137)'
                }}> +%43
              </span>
              since last month
            </Typography>
          </Paper>
        </Grid>

        <Grid item xl={3} lg={3} md={4} xs={6}>
          <Paper
            sx={{
              borderRadius: '10px',
              padding: '16px'
            }}
            elevation={0}>
            <Box sx={{ width: '100%', display: 'inline-flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography
                  sx={{
                    textTransform: 'uppercase',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    color: 'rgb(103, 116, 142)',
                    fontWeight: 600
                  }}
                >
                  Attributes Count
                </Typography>

                <Typography
                  sx={{
                    textTransform: 'none',
                    fontSize: '1.25rem',
                    lineHeight: '1.375',
                    color: 'rgb(52, 71, 103)',
                    fontWeight: 600
                  }}
                >
                  8.403
                </Typography>
              </Box>

              <Box>
                <DashboardCustomizeIcon sx={{ fontSize: '50px' }} />
              </Box>
            </Box>

            <Typography
              sx={{
                textTransform: 'none',
                fontSize: '1.rem',
                lineHeight: '1.6',
                color: 'rgb(52, 71, 103)',
                fontWeight: 400,
              }}
            >
              <span
                style={{
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  fontWeight: 700,
                  marginRight: '3px',
                  color: 'rgb(45, 206, 137)'
                }}>%43
              </span>
              since last month
            </Typography>
          </Paper>
        </Grid>

        <Grid item xl={3} lg={3} md={4} xs={6}>
          <Paper
            sx={{
              borderRadius: '10px',
              padding: '16px'
            }}
            elevation={0}>
            <Box sx={{ width: '100%', display: 'inline-flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography
                  sx={{
                    textTransform: 'uppercase',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    color: 'rgb(103, 116, 142)',
                    fontWeight: 600
                  }}
                >
                  New Membership Count
                </Typography>

                <Typography
                  sx={{
                    textTransform: 'none',
                    fontSize: '1.25rem',
                    lineHeight: '1.375',
                    color: 'rgb(52, 71, 103)',
                    fontWeight: 600
                  }}
                >
                  112
                </Typography>
              </Box>

              <Box>
                <TurnedInIcon sx={{ fontSize: '50px' }} />
              </Box>
            </Box>

            <Typography
              sx={{
                textTransform: 'none',
                fontSize: '1.rem',
                lineHeight: '1.6',
                color: 'rgb(52, 71, 103)',
                fontWeight: 400
              }}
            >
              <span
                style={{
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  fontWeight: 700,
                  marginRight: '3px',
                  color: 'rgb(245, 54, 92)'
                }}>
                -%12
              </span>
              since last month
            </Typography>
          </Paper>
        </Grid>

        <Grid item xl={3} lg={3} md={4} xs={6}>
          <Paper
            sx={{
              borderRadius: '10px',
              padding: '16px'
            }}
            elevation={0}>
            <Box sx={{ width: '100%', display: 'inline-flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography
                  sx={{
                    textTransform: 'uppercase',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    color: 'rgb(103, 116, 142)',
                    fontWeight: 600
                  }}
                >
                  System User Count
                </Typography>

                <Typography
                  sx={{
                    textTransform: 'none',
                    fontSize: '1.25rem',
                    lineHeight: '1.375',
                    color: 'rgb(52, 71, 103)',
                    fontWeight: 600
                  }}
                >
                  1
                </Typography>
              </Box>

              <Box>
                <PersonIcon sx={{ fontSize: '50px' }} />
              </Box>
            </Box>

            <Typography
              sx={{
                textTransform: 'none',
                fontSize: '1.rem',
                lineHeight: '1.6',
                color: 'rgb(52, 71, 103)',
                fontWeight: 400
              }}
            >
              <span
                style={{
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  fontWeight: 700,
                  marginRight: '3px',
                  color: 'rgb(45, 206, 137)'
                }}>
                %0
              </span>
              since last month
            </Typography>
          </Paper>
        </Grid>

        <Grid item xl={8} md={8} xs={12}>
          <Paper sx={{ padding: '8px' }} elevation={0}>
            <Typography
              sx={{
                fontSize: '14px'
              }}
            >
              Total Attributes Count Chart
            </Typography>
            <ResponsiveContainer width='100%' height={300}>
              <AreaChart width={730} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0CCDEF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0CCDEF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0CCDEF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0CCDEF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0CCDEF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0CCDEF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="amt" stroke="#81CA9C" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>


        <Grid item xl={4} md={4} xs={12}>
          <Paper sx={{ padding: '8px' }} elevation={0}>
            <Typography
              sx={{
                fontSize: '14px'
              }}
            >
              Total Item Groups Chart
            </Typography>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart width={730} height={250}>
                <Tooltip />
                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </InternalLayout >
  )
}

export default HomePage