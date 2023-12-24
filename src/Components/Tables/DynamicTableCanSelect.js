import React, { useCallback, useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, TableSortLabel, TablePagination, Chip, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
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


function DynamicTableCanSelect({ param_columns, param_filters, param_api, param_settings }) {
    //States and Variables_______________________
    const [attributes, SetAttributes] = useState([]);
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
            const response = await postDataRequest(`${param_api}`, {
                page: page + 1,
                pageSize: rowsPerPage,
                orderBy,
                order,
                filters: filters
            });
            SetAttributes(response.data.rows);
            setTotalRows(response.data.totalRows);
        } catch (error) {
            ShowMessage('Error', error);
        }
    }, [page, rowsPerPage, orderBy, order, filters, param_api]);


    useEffect(() => {
        fetchData();
    }, [fetchData]); // fetchData'yi bağımlılıklar listesine ekleyin


    useEffect(() => {
        const attributeIds = attributes.map(attribute => attribute._id);
        SetattributeGroupData(prevState => ({
            ...prevState,
            'Attributes': attributeIds,
        }));
    }, [attributes])

    
    //Functions And Methods____________________________________
    const handleRowClick = (row) => {
        window.location.href = '/Attribute/Detail/' + row._id
        // Burada tıklanan satır ile ilgili başka bir şeyler yapabilirsiniz
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
                            {Array.isArray(param_columns) && param_columns.length > 0 ? (
                                // data bir dizi ise ve içinde öğeler varsa map fonksiyonunu kullan
                                param_columns.map((row) => (
                                    <TableCell key={row.Code} sortDirection={row.isOrder ? (orderBy === row.Code ? order : false) : (false)}>
                                        <TableSortLabel active={orderBy === row.Code} direction={orderBy === row.Code ? order : 'asc'} onClick={() => handleSortRequest(row.Code)}>
                                            {row.Name}
                                        </TableSortLabel>
                                    </TableCell>
                                ))
                            ) : (
                                <TableCell>Wrong Data</TableCell>
                            )}
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {Array.isArray(attributes) && attributes.length > 0 ? (
                            // data bir dizi ise ve içinde öğeler varsa map fonksiyonunu kullan
                            attributes.map((row) => (
                                <TableRow key={row.Code} onClick={() => handleRowClick(row)} >
                                    <TableCell>{row.Code}</TableCell>
                                    <TableCell>{row.Name}</TableCell>
                                    <TableCell>{row.Type}</TableCell>
                                    <TableCell>{row.CreatedUser.Name}</TableCell>
                                    <TableCell>{ConvertInternalDateString(row.createdAt)}</TableCell>
                                    <TableCell>{ConvertInternalDateString(row.updatedAt)}</TableCell>
                                    <TableCell>{row.isRequired ? <Chip label='Yes' sx={{ background: 'green', color: 'white' }} /> : <Chip label='No' sx={{ background: 'red', color: 'white' }} />}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            // data boş bir dizi veya undefined/null ise yükleniyor mesajını göster
                            <TableRow>
                                <TableCell colSpan={7}>Veri Yok</TableCell>
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

export default DynamicTableCanSelect