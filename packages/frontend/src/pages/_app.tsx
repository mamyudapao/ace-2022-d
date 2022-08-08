import { ThemeProvider, createTheme } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '@styles/global.css';

const App = ({ Component, pageProps }: AppProps) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#fc5c6c',
        dark: '#ff6776',
        light: '#fc5c6c',
      },
      secondary: {
        main: '#f2f2f4',
        dark: '#e3e3e5',
        light: '#e3e3e5',
      },
      action: {
        disabledBackground: '#f2f2f4',
      },
      divider: '#e7e8ec',
    },
    typography: {
      fontFamily: 'Noto Sans JP',
      fontSize: 14,
      allVariants: {
        color: '#000038',
      },
      h1: {
        fontSize: '1.8rem',
        fontWeight: 500,
      },
      h2: {
        fontSize: '1.7rem',
        fontWeight: 500,
      },
      h3: {
        fontSize: '1.6rem',
        fontWeight: 500,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 500,
      },
      h5: {
        fontSize: '1.4rem',
        fontWeight: 500,
      },
      h6: {
        fontSize: '1.3rem',
        fontWeight: 500,
      },
      subtitle1: {
        fontSize: '1.1rem',
        fontWeight: 500,
        color: '#888fa1',
      },
      subtitle2: {
        fontSize: '0.85rem',
        fontWeight: 400,
        color: '#888fa1',
      },
      button: {
        fontSize: '1.3rem',
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: 'contained',
          size: 'large',
        },
        styleOverrides: {
          root: {
            height: '56px',
            borderRadius: '999px',
            textTransform: 'none',
            boxShadow: 'none',
            fontSize: '1.1rem',
            fontWeight: 500,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'standard',
        },
        styleOverrides: {
          root: {
            height: '48px',
            '& > div::before': {
              borderColor: '#e7e8ec',
            },
            '& > div > input': {
              paddingLeft: '14px',
              paddingRight: '14px',
            },
            '& > div > input::placeholder': {
              color: '#767980',
              fontWeight: '500',
              fontSize: '1.1rem',
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            color: '#bcbebf',
          },
        },
      },
    },
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
