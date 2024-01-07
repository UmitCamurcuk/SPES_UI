import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Badge } from '@mui/material';
import { ConvertInternalDateString } from '../../Scripts/DateTimes';

const HistoryTable = ({ historyData }) => {
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (index) => {
        setSelectedRow(selectedRow === index ? null : index);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Entity Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Changed By</TableCell>
                        <TableCell>User Roles</TableCell>
                        <TableCell>Change Date</TableCell>
                        <TableCell>Comment</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {historyData.map((row, index) => (
                        <React.Fragment key={row._id}>
                            <TableRow onClick={() => handleRowClick(index)}>
                                <TableCell>
                                    {selectedRow === index ? (
                                        <KeyboardArrowUpIcon />
                                    ) : (
                                        <KeyboardArrowDownIcon />
                                    )}
                                </TableCell>
                                <TableCell>{row.entityType}</TableCell>
                                <TableCell>{row.Description}</TableCell>
                                <TableCell>{`${row.CreatedUser.Name} ${row.CreatedUser.LastName}`}</TableCell>
                                <TableCell>
                                    {row.UpdatedUser.Roles.map((role, index) => (
                                        <Badge
                                            key={`${row._id}_${index}`}
                                            sx={{
                                                color: 'White',
                                                backgroundColor:
                                                    role.Name === 'Admin' ||
                                                    role.Name === 'System Admin'
                                                        ? 'rgb(0, 200, 83)'
                                                        : 'rgb(33, 150, 243)',
                                                pl: 1,
                                                pr: 1,
                                                pt: 0.5,
                                                pb: 0.5,
                                                borderRadius: '10px',
                                                mr: 1,
                                                ml: 1,
                                            }}
                                        >
                                            <Typography fontSize='10px'>
                                                {role.Name}
                                            </Typography>
                                        </Badge>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {ConvertInternalDateString(row.createdAt)}
                                </TableCell>
                                <TableCell>{row.Comment}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Collapse
                                        in={selectedRow === index}
                                        timeout='auto'
                                        unmountOnExit
                                    >
                                        <Box margin={1}>
                                            <Typography
                                                variant='h5'
                                                gutterBottom
                                                component='div'
                                            >
                                                Changes
                                            </Typography>

                                            <Table
                                                size='small'
                                                aria-label='purchases'
                                            >
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Typography variant='h6'>
                                                                Name
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant='h6'>
                                                                Old Value
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant='h6'>
                                                                New Value
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {Object.entries(
                                                        row.ChangedValues
                                                    ).map(([key, value]) => (
                                                        <TableRow key={key}>
                                                            <TableCell>
                                                                {key}
                                                            </TableCell>
                                                            <TableCell>
                                                                {value.oldValue !==
                                                                    null &&
                                                                !Array.isArray(
                                                                    value.oldValue
                                                                )
                                                                    ? value.oldValue
                                                                    : '-'}
                                                            </TableCell>
                                                            <TableCell>
                                                                {value.newValue !==
                                                                    null &&
                                                                Array.isArray(
                                                                    value.newValue
                                                                ) ? (
                                                                    value.newValue.map(
                                                                        (
                                                                            element,
                                                                            index
                                                                        ) => (
                                                                            <Typography
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                {
                                                                                    element
                                                                                }
                                                                            </Typography>
                                                                        )
                                                                    )
                                                                ) : (
                                                                    value.newValue
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default HistoryTable;
