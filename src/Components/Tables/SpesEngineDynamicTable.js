import React, { useCallback, useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, TableSortLabel, TablePagination, Chip, Accordion, AccordionSummary, AccordionDetails, Typography, Checkbox, Box, Badge } from '@mui/material';
import { postDataRequest } from '../../Axios/dataRequests';
import ShowMessage from '../Notifications/Toastify';
import { StyledTableFilterInput } from '../Inputs/StyledInputs';
import { ConvertInternalDateString } from '../../Scripts/DateTimes';
import { StyledFilterClearButton } from '../Buttons/StyledButtons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { generalTheme } from '../../Theme/GeneralTheme';

const StyledTableContainer = styled(TableContainer)({
    marginTop: '20px',
});

const StyledTableHead = styled(TableHead)({
    backgroundColor: '#f2f2f2',
});


function SpesEngineDynamicTable({ api, columns, goToDetail, clickedLinkAfterClick, param_filters = {}, param_settings, setClickedState = null, defaultSelected = [] }) {
    //States and Variables_______________________
    const [selectedRows, setSelectedRows] = useState(defaultSelected);
    const [dataRows, SetDataRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orderBy, setOrderBy] = useState('CreatedAt');
    const [order, setOrder] = useState('desc');
    const [totalRows, setTotalRows] = useState(0);
    const [filters, setFilters] = useState(param_filters);

    //Hooks_______________________________________
    const fetchData = useCallback(async () => {
        try {
            const response = await postDataRequest(`${api}`, {
                page: page + 1,
                pageSize: rowsPerPage,
                orderBy,
                order,
                filters: filters
            });
            SetDataRows(response.data.rows);
            setTotalRows(response.data.totalRows);
        } catch (error) {
            ShowMessage('Error', error);
        }
    }, [page, rowsPerPage, orderBy, order, filters, api]);


    useEffect(() => {
        fetchData();
    }, [fetchData]); // fetchData'yi bağımlılıklar listesine ekleyin


    useEffect(() => {
        setClickedState !== null && setClickedState(selectedRows)
    }, [selectedRows, setClickedState, defaultSelected])


    //Functions And Methods____________________________________
    const handleRowClick = (row) => {
        if (goToDetail) {
            window.location.href = clickedLinkAfterClick + row._id
        } else {
            if (selectedRows.some(selectedRow => selectedRow._id === row._id)) {
                setSelectedRows(selectedRows.filter(selectedRow => selectedRow._id !== row._id));
            } else {
                setSelectedRows([...selectedRows, row]);
            }
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSortRequest = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrderBy(property);
        setOrder(isAsc ? 'desc' : 'asc');
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const clearFilters = (name) => {
        setFilters((prevFilters = {}) => {
            const updatedFilters = { ...prevFilters };
            if (updatedFilters[name]) {
                updatedFilters[name] = updatedFilters[name].slice(0, -1); // Son karakteri sil
            }
            return updatedFilters;
        });
    };

    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Show Filters</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        columns.map(item => {
                            if (item.Filter && item.Type === 'String') {
                                return (
                                    <StyledTableFilterInput
                                        key={item.Name}
                                        label={item.Label}
                                        name={item.Name}
                                        value={filters[item.Name]}
                                        onChange={handleFilterChange}
                                    />
                                );
                            }
                            return null;
                        })
                    }

                    <StyledFilterClearButton onClick={clearFilters}>Clear Filters</StyledFilterClearButton>
                </AccordionDetails>
            </Accordion>

            <StyledTableContainer sx={{ pt: 3 }} component={Paper}>
                <Table>
                    <StyledTableHead>
                        <TableRow>
                            {
                                goToDetail !== true && <TableCell key={1}>is Selected ?</TableCell>
                            }
                            {Array.isArray(columns) && columns.length > 0 ? (
                                // data bir dizi ise ve içinde öğeler varsa map fonksiyonunu kullan
                                columns.map((row) => (
                                    <TableCell key={row.Name} sortDirection={row.isOrder ? (orderBy === row.Name ? order : false) : (false)}>
                                        <TableSortLabel key={row.Name} active={orderBy === row.Name} direction={orderBy === row.Name ? order : 'asc'} onClick={() => handleSortRequest(row.Name)}>
                                            {row.Label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))
                            ) : (
                                <TableCell key="empty-key">Wrong Data</TableCell>
                            )}
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {Array.isArray(dataRows) && dataRows.length > 0 ? (
                            // data bir dizi ise ve içinde öğeler varsa map fonksiyonunu kullan

                            dataRows.map(row => (
                                <TableRow sx={{ cursor: 'pointer' }} key={row._id} onClick={() => handleRowClick(row)}>
                                    {
                                        goToDetail !== true && <TableCell key='1'>
                                            <Checkbox
                                                checked={selectedRows.some(selectedRow => selectedRow._id === row._id)}
                                            />
                                        </TableCell>
                                    }
                                    {columns.map(item => {
                                        if (item.Type === 'String') {
                                            return <TableCell key={item.Name}>{row[item.Name]}</TableCell>;
                                        } else if (item.Type === 'Date') {
                                            return <TableCell key={item.Name}>{ConvertInternalDateString(row[item.Name])}</TableCell>;
                                        } else if (item.Type === 'Length') {
                                            const dynamicValue = row[item.Name];
                                            if (Array.isArray(dynamicValue)) {
                                                const arrayLength = dynamicValue.length;
                                                return <TableCell key={item.Name}>{arrayLength}</TableCell>;
                                            } else {
                                                return <TableCell key={item.Name}>-</TableCell>;
                                            }

                                        } else if (item.Type === 'Boolean') {
                                            return (
                                                <TableCell key={item.Name}>
                                                    {row[item.Name] ? (
                                                        <Chip key={item.Name} label="Yes" sx={{ background: 'green', color: 'white' }} />
                                                    ) : (
                                                        <Chip key={item.Name} label="No" sx={{ background: 'red', color: 'white' }} />
                                                    )}
                                                </TableCell>
                                            );
                                        } else if (item.Type === 'Boolean2') {
                                            return (
                                                <TableCell key={item.Name}>
                                                    {row[item.Name] ? (
                                                        <Typography style={{ display: 'flex', alignItems: 'center' }}>
                                                            <span style={{ marginRight: '8px', backgroundColor: generalTheme.palette.StatusColors.success, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                            Active
                                                        </Typography>

                                                    ) : (
                                                        <Typography style={{ display: 'flex', alignItems: 'center' }}>
                                                            <span style={{ marginRight: '8px', backgroundColor: generalTheme.palette.StatusColors.danger, width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                                            Deactive
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                            );
                                        } else if (item.Type === 'Array') {
                                            return (
                                                <TableCell key={item.Name}>
                                                    <Box sx={{
                                                        display: 'flex'
                                                    }}>
                                                        {row[item.Name].map(element => (
                                                            <Chip key={element.Name} label={element.Name} />
                                                        ))}
                                                    </Box>
                                                </TableCell>
                                            );
                                        } else if (item.Type === 'Role') {
                                            return (
                                                <React.Fragment key={item.Type}>
                                                    <TableCell key={`${item.Name}_`}>
                                                        {row.Roles.map((role, index) => (
                                                            <Badge key={index} sx={{
                                                                color: 'White',
                                                                backgroundColor: role.Name === 'Admin' || role.Name === 'System Admin' ? 'rgb(0, 200, 83)' : 'rgb(33, 150, 243)',
                                                                pl: 1, pr: 1, pt: 0.5, pb: 0.5, borderRadius: '10px'
                                                            }}>
                                                                <Typography fontSize='10px'>
                                                                    {role.Name}
                                                                </Typography>
                                                            </Badge>
                                                        ))}
                                                    </TableCell>
                                                </React.Fragment>
                                            );
                                        }
                                        return null; // Eklenen bir return ifadesi
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            // data boş bir dizi veya undefined/null ise yükleniyor mesajını göster
                            <TableRow key="no-data1">
                                <TableCell key='no-data' colSpan={columns.length}>Veri Yok</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[1, 5, 10]}
                    component="div"
                    count={totalRows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </StyledTableContainer>
        </>
    )
}

export default SpesEngineDynamicTable