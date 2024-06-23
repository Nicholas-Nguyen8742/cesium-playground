import { createTheme, responsiveFontSizes } from '@mui/material';

declare module '@mui/material/styles/createTypography' {
  interface TypographyOptions {
    fontWeightSemiBold?: number
  }

  interface Typography {
    fontWeightSemiBold: number
  }
}

export const customTheme = createTheme({
  typography: {
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 400,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 300,
    },
  },
  breakpoints: {
    values: {
      xs: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
});

export const theme = responsiveFontSizes(customTheme);

export default theme;
