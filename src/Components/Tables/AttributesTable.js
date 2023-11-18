import React, { useCallback, useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, TableSortLabel, TablePagination } from '@mui/material';
import { postDataRequest } from '../../Axios/dataRequests';
import ShowMessage from '../Notifications/Toastify';
import { StyledTableFilterInput } from '../Inputs/StyledInputs';

const StyledTableContainer = styled(TableContainer)({
    marginTop: '20px',
});

const StyledTableHead = styled(TableHead)({
    backgroundColor: '#f2f2f2',
});


function AttributesTable({ id }) {
    //States and Variables_______________________
    const [attributes, SetAttributes] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orderBy, setOrderBy] = useState('CreatedAt');
    const [order, setOrder] = useState('asc');
    const [totalRows, setTotalRows] = useState(0);
    const [filters, setFilters] = useState({
        Code: '',
        Name: '',
        Type: '',
    });

    //Hooks_______________________________________
    const fetchData = useCallback(async () => {
        try {
            const response = await postDataRequest(`/Attribute/AttributesTableData`, {
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
    }, [page, rowsPerPage, orderBy, order, filters]);


    useEffect(() => {
        fetchData();
    }, [fetchData]); // fetchData'yi bağımlılıklar listesine ekleyin


    //Functions And Methods____________________________________
    const handleRowClick = (row) => {
        console.log(row)
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
        <StyledTableContainer sx={{pt:3}} component={Paper}>
            <StyledTableFilterInput label="Code" name="Code" value={filters.Code} onChange={handleFilterChange} />
            <StyledTableFilterInput label="Name" name="Name" value={filters.Name} onChange={handleFilterChange} />
            <StyledTableFilterInput label="Type" name="Type" value={filters.Type} onChange={handleFilterChange} />
            <button onClick={clearFilters}>Clear Filters</button>
            <Table>
                <StyledTableHead>
                    <TableRow>
                        <TableCell sortDirection={orderBy === 'code' ? order : false}>
                            <TableSortLabel active={orderBy === 'code'} direction={orderBy === 'code' ? order : 'asc'} onClick={() => handleSortRequest('code')}>
                                Code
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sortDirection={orderBy === 'name' ? order : false}>
                            <TableSortLabel active={orderBy === 'name'} direction={orderBy === 'name' ? order : 'asc'} onClick={() => handleSortRequest('name')}>
                                Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Created User</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Updated At</TableCell>
                        <TableCell>Is Required</TableCell>
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
                                <TableCell>{row.createdAt}</TableCell>
                                <TableCell>{row.updatedAt}</TableCell>
                                <TableCell>{row.isRequired ? 'Yes' : 'No'}</TableCell>
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
    )
}

export default AttributesTable