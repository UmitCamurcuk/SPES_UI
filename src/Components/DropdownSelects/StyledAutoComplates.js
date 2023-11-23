import styled from "@emotion/styled";
import { Autocomplete } from "@mui/material";


export const StyledMultiSelectDropdown = styled(Autocomplete)({
    width: '330px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    height: '43.59px',
    borderRadius: '20px',
    fontSize: '16px',
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
        borderRadius: '20px',
        height: '43.59px',
        display: 'inline-flex',
        alignContent: 'center'
    },
    '& .MuiChip-root': {
        backgroundColor: '#64b5f6', // Seçilen öğelerin chip rengi
        color: '#ffffff', // Chip metni rengi
        '&:focus': {
            backgroundColor: '#1565c0', // Odaklandığında chip rengi
        },
    },

})

export const StyledSelectDropdown = styled(Autocomplete)({
    width: '330px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    height: '43.59px',
    borderRadius: '20px',
    fontSize: '16px',
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
        borderRadius: '20px',
        height: '43.59px',
        display: 'inline-flex',
        alignContent: 'center'
    },
    '& .MuiChip-root': {
        backgroundColor: '#64b5f6', // Seçilen öğelerin chip rengi
        color: '#ffffff', // Chip metni rengi
        '&:focus': {
            backgroundColor: '#1565c0', // Odaklandığında chip rengi
        },
    },

})