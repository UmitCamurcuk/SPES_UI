import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import { generalTheme } from "../../Theme/GeneralTheme";




export const PageHeaderPaper = styled(Paper)({
    border: 'none',
    background: generalTheme.palette.attributeColor.HeaderBackground,
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width:'400px',
    margin:'0 auto'
})