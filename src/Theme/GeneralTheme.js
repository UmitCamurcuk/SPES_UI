// themes.js
import { createTheme } from '@mui/material';
export const generalTheme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
        attributeColor: {
            HeaderBackground: '#81d4fa',
            main: 'black',
        },
    },
    typography: {
        allVariants: {
            fontFamily: "'Poppins', sans-serif",
            textTransform: 'none',
        },
        button: {
            textTransform: 'none',
        },
    },
});
