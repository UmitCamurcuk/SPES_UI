import styled from "@emotion/styled";
import { Button } from "@mui/material";


export const StyledProfileSaveButton = styled(Button)({
    width: '100%',
    marginTop: '16px',
    padding: '12px',
    backgroundColor: 'rgb(38, 43, 64)',
    color: 'white',
    borderRadius:'8px',
    textTransform:'none',
    '&:hover': {
        backgroundColor: 'black',
    },
})
