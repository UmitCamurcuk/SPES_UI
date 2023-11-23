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


function ItemTypesTable({ id }) {
    //States and Variables_______________________
    const [itemTypes, SetItemTypes] = useState([]);
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
            const response = await postDataRequest(`/ItemType/ItemTypesTableData`, {
                page: page + 1,
                pageSize: rowsPerPage,
                orderBy,
                order,
                filters: filters
            });
            SetItemTypes(response.data.rows);
            setTotalRows(response.data.totalRows);
        } catch (error) {
            ShowMessage('Error', error);
        }
    }, [page, rowsPerPage, orderBy, order, filters]);


    useEffect(() => {
        fetchData();
    }, [fetchData]); // fetchData'yi bağımlılıklar listesine ekleyin


    //Functions And Methods____________________________________
    const handleRowClick = (row) => {
        console.log(row);
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
                            <TableCell sortDirection={orderBy === 'Code' ? order : false}>
                                <TableSortLabel active={orderBy === 'Code'} direction={orderBy === 'Code' ? order : 'asc'} onClick={() => handleSortRequest('Code')}>
                                    Code
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sortDirection={orderBy === 'Name' ? order : false}>
                                <TableSortLabel active={orderBy === 'Name'} direction={orderBy === 'Name' ? order : 'asc'} onClick={() => handleSortRequest('Name')}>
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Attributes</TableCell>
                            <TableCell>is Active</TableCell>
                            <TableCell>Show On Navbar</TableCell>
                            <TableCell>Created User</TableCell>
                            <TableCell>Updated At</TableCell>       
                            <TableCell sortDirection={orderBy === 'CreatedAt' ? order : false}>
                                <TableSortLabel active={orderBy === 'CreatedAt'} direction={orderBy === 'CreatedAt' ? order : 'asc'} onClick={() => handleSortRequest('CreatedAt')}>
                                    Created At
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {Array.isArray(itemTypes) && itemTypes.length > 0 ? (
                            // data bir dizi ise ve içinde öğeler varsa map fonksiyonunu kullan
                            itemTypes.map((row) => (
                                <TableRow key={row.Code} onClick={() => handleRowClick(row)} >
                                    <TableCell>{row.Code}</TableCell>
                                    <TableCell>{row.Name}</TableCell>
                                    <TableCell>{row.Attributes.length}</TableCell>
                                    <TableCell>{row.isActive ? <Chip label='Yes' sx={{ background: 'green', color: 'white' }} /> : <Chip label='No' sx={{ background: 'red', color: 'white' }} />}</TableCell>
                                    <TableCell>{row.ShowOnNavbar ? <Chip label='Yes' sx={{ background: 'green', color: 'white' }} /> : <Chip label='No' sx={{ background: 'red', color: 'white' }} />}</TableCell>
                                    <TableCell>{row.CreatedUser.Name + ' ' + row.CreatedUser.LastName}</TableCell>
                                    <TableCell>{ConvertInternalDateString(row.updatedAt)}</TableCell>
                                    <TableCell>{ConvertInternalDateString(row.createdAt)}</TableCell>
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

export default ItemTypesTable