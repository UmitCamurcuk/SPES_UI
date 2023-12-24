import React, { useCallback, useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, TableSortLabel, TablePagination, Chip, Accordion, AccordionSummary, AccordionDetails, Typography, Checkbox } from '@mui/material';
import { postDataRequest } from '../../Axios/dataRequests';
import ShowMessage from '../Notifications/Toastify';
import { StyledTableFilterInput } from '../Inputs/StyledInputs';
import { ConvertInternalDateString } from '../../Scripts/DateTimes';
import { StyledFilterClearButton } from '../Buttons/StyledButtons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledTableContainer = styled(TableContainer)({
    marginTop: '20px',
});

const StyledTableHead = styled(TableHead)({
    backgroundColor: '#f2f2f2',
});


function SpesEngineDynamicTable({ setClickedState, goToDetail, columns, defaultSelected, param_filters, api, param_settings }) {
    //States and Variables_______________________
    const [selectedRows, setSelectedRows] = useState(defaultSelected);
    const [dataRows, SetDataRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orderBy, setOrderBy] = useState('CreatedAt');
    const [order, setOrder] = useState('desc');
    const [totalRows, setTotalRows] = useState(0);
    const [filters, setFilters] = useState({
        Code: '',
        Name: '',
        Type: '',
    });

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
        setClickedState(selectedRows)
    }, [selectedRows, setClickedState, defaultSelected])


    //Functions And Methods____________________________________
    const handleRowClick = (row) => {
        if (goToDetail) {
            window.location.href = '/Attribute/Detail/' + row._id
        } else {
            if (selectedRows.some(selectedRow => selectedRow.Code === row.Code)) {
                setSelectedRows(selectedRows.filter(selectedRow => selectedRow.Code !== row.Code));
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
                    <StyledTableFilterInput label="Code" name="Code" value={filters.Code} onChange={handleFilterChange} />
                    <StyledTableFilterInput label="Name" name="Name" value={filters.Name} onChange={handleFilterChange} />
                    <StyledTableFilterInput label="Type" name="Type" value={filters.Type} onChange={handleFilterChange} />
                    <StyledFilterClearButton onClick={clearFilters}>Clear Filters</StyledFilterClearButton>
                </AccordionDetails>
            </Accordion>

            <StyledTableContainer sx={{ pt: 3 }} component={Paper}>
                <Table>
                    <StyledTableHead>
                        <TableRow>
                            <TableCell key={1}>is Selected ?</TableCell>
                            {Array.isArray(columns) && columns.length > 0 ? (
                                // data bir dizi ise ve içinde öğeler varsa map fonksiyonunu kullan
                                columns.map((row) => (
                                    <TableCell key={row.Name} sortDirection={row.isOrder ? (orderBy === row.Code ? order : false) : (false)}>
                                        <TableSortLabel key={row.Name} active={orderBy === row.Code} direction={orderBy === row.Code ? order : 'asc'} onClick={() => handleSortRequest(row.Code)}>
                                            {row.Name}
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
                                    <TableCell key='1'>
                                        <Checkbox
                                            checked={selectedRows.some(selectedRow => selectedRow.Code === row.Code)}
                                        />
                                    </TableCell>
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
                                        } else if (item.Type === 'Array') {
                                            const chipElements = row[item.Name].map(element => (
                                                <TableCell key={element.Name}>
                                                    <Chip label={element.Name} />
                                                </TableCell>
                                            ));

                                            return chipElements;
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