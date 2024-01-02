// themes.js
import { createTheme } from '@mui/material';
export const generalTheme = createTheme({
    container: {
        maxWidth: '1200px', // İstediğiniz genişliği burada belirleyebilirsiniz
    },
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
          // İstediğiniz özel genişlikleri burada ekleyebilirsiniz.
        },
      },
    palette: {
        primary: {
            light: '#2C599dD',
            main: '#193A6F',
            dark: '#112240',
            contrastText: '#fff',
        },
        secondary: {
            light: '#feaa31',
            main: '#F98125',
            dark: '#0e5463',
            contrastText: '#000',
        },
        backgrounds: {
            lightGray: '#f5f5f5',
            default:'rgb(238, 242, 246)',
        },
        attributeColor: {
            HeaderBackground: '#24a08b',
            main: 'black',
        },
        StatusColors: {
            danger: '#FF0000',
            success: '#5cb85c', // Success rengini doldurmanız gerekiyor
            warning: '', // Warning rengini doldurmanız gerekiyor
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
