import React, { useCallback, useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, TableSortLabel, TablePagination, Chip, Accordion, AccordionSummary, AccordionDetails, Typography, TextField } from '@mui/material';
import { postDataRequest } from '../../Axios/dataRequests';
import ShowMessage from '../Notifications/Toastify';
import { StyledTableFilterInput } from '../Inputs/StyledInputs';
import { ConvertInternalDateString } from '../../Scripts/DateTimes';
import { StyledFilterClearButton } from '../Buttons/StyledButtons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StyledTableFilterSimpleSelect } from '../DropdownSelects/StyledAutoComplates';

const StyledTableContainer = styled(TableContainer)({
    marginTop: '20px',
});

const StyledTableHead = styled(TableHead)({
    backgroundColor: '#f2f2f2',
});


function DetailTableWithFilters({ columns, api, link, paramfilters }) {
    //States and Variables_______________________
    const [attributes, SetAttributes] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orderBy, setOrderBy] = useState('CreatedAt');
    const [order, setOrder] = useState('desc');
    const [totalRows, setTotalRows] = useState(0);
    const [filters, setFilters] = useState(paramfilters);

    //Hooks_______________________________________
    const fetchData = useCallback(async () => {
        try {
            const response = await postDataRequest(api, {
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
    }, [page, rowsPerPage, orderBy, order, filters, api]);


    useEffect(() => {
        fetchData();
    }, [fetchData]); // fetchData'yi bağımlılıklar listesine ekleyin



    //Functions And Methods____________________________________
    const handleRowClick = (row) => {
        window.location.href = link + row._id

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
                <AccordionDetails sx={{ display: 'inline-flex', }}>
                    {
                        columns.map(item => {
                            if (item.Filter) {
                                if (item.Type === 'String') {
                                    return (
                                        <StyledTableFilterInput key={item.Name} label={item.Label} name={item.Name} value={filters[item.Name]} onChange={handleFilterChange} />
                                    )
                                } else if (item.Type === 'Boolean') {
                                    return (
                                        <StyledTableFilterSimpleSelect
                                            options={[
                                                { label: 'Yes', value: true },
                                                { label: 'No', value: false },
                                            ]}
                                            filterSelectedOptions
                                            id="simpleSelectFilter"
                                            key={item.Name}
                                            label={item.Label}
                                            getOptionLabel={(option) => option.label}
                                            isOptionEqualToValue={(option, value) => option.label === value.label}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label={item.Name}
                                                />
                                            )}
                                            onChange={(e, newValue) => {
                                                console.log(newValue)
                                                if (newValue) {
                                                    setFilters((prevFilters) => ({
                                                        ...prevFilters,
                                                        [item.Name]: newValue.value,
                                                    }));
                                                    console.log(filters)
                                                } else {
                                                    setFilters((prevFilters) => ({
                                                        ...prevFilters,
                                                        [item.Name]: '',
                                                    }));
                                                }
                                            }}
                                        />
                                    )
                                }
                            }
                             return null; // Eklenen bir return ifadesi
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
                                columns.map(item => (
                                    <TableCell key={item.Name} sortDirection={orderBy === item.Name ? order : false}>
                                        <TableSortLabel active={orderBy === item.Name} direction={orderBy === item.Name ? order : 'asc'} onClick={() => handleSortRequest(item.Name)}>
                                            {item.Label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {Array.isArray(attributes) && attributes.length > 0 ? (
                            // data bir dizi ise ve içinde öğeler varsa map fonksiyonunu kullan
                            attributes.map(row => (
                                <TableRow sx={{cursor:'pointer'}} key={row._id} onClick={() => handleRowClick(row)}>
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
                                                        <Chip label="Yes" sx={{ background: 'green', color: 'white' }} />
                                                    ) : (
                                                        <Chip label="No" sx={{ background: 'red', color: 'white' }} />
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
                            <TableRow>
                                <TableCell colSpan={columns.length}>Veri Yok</TableCell>
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

export default DetailTableWithFilters