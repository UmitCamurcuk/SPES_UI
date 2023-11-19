import styled from "@emotion/styled";
import { TextField } from "@mui/material";
export const StyledProfileInput = styled(TextField)({
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    borderRadius: '20px',
    fontSize: '16px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        '& input': {
            color: '#66799e',
            height: '43.59px',
            fontSize: '14px',
            fontWeight: 800,
            border: '1px solid #ddd',
            borderRadius: '20px',
            padding: '8px',
            outline: 'none',
            width: '100%',
            boxSizing: 'border-box',
        },
    },
    '& label': {
        color: 'blue',
    },

})

export const StyledTableFilterInput = styled(TextField)({
    width: '200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '20px',
    fontSize: '16px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        '& input': {
            color: '#66799e',
            height: '43.59px',
            fontSize: '14px',
            fontWeight: 800,
            border: '1px solid #ddd',
            borderRadius: '20px',
            outline: 'none',
            width: '100%',
            boxSizing: 'border-box',
            textAlign:'center'
        },
    },
    '& label': {
        color: 'black',
    },
})


export const StyledSpesEngineInput = styled(TextField)({
    width: '330px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    borderRadius: '20px',
    fontSize: '16px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        '& input': {
            color: '#66799e',
            height: '43.59px',
            fontSize: '14px',
            fontWeight: 800,
            border: '1px solid #ddd',
            borderRadius: '20px',
            padding: '8px',
            outline: 'none',
            width: '100%',
            boxSizing: 'border-box',
        },
    },
    '& label': {
        color: 'blue',
    },

})