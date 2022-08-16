import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { emotionCache } from '@utils/cache';
import '@styles/global.css';

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    document.documentElement.removeAttribute('style');
  }, []);

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
      fontFamily: 'Noto Sans JP, sans-serif',
      fontSize: 14,
      allVariants: {
        color: '#000038',
      },
      h1: {
        fontSize: '1.6rem',
        fontWeight: 500,
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 500,
      },
      h3: {
        fontSize: '1.4rem',
        fontWeight: 500,
      },
      h4: {
        fontSize: '1.3rem',
        fontWeight: 500,
      },
      h5: {
        fontSize: '1.2rem',
        fontWeight: 500,
      },
      h6: {
        fontSize: '1.1rem',
        fontWeight: 700,
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 500,
        color: '#888fa1',
      },
      subtitle2: {
        fontSize: '0.85rem',
        fontWeight: 400,
        color: '#6e7586',
      },
      caption: {
        fontSize: '0.6rem',
      },
      button: {
        fontSize: '1.2rem',
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
            height: '48px',
            borderRadius: '999px',
            textTransform: 'none',
            boxShadow: 'none',
            fontSize: '1.1rem',
            fontWeight: 500,
          },
          outlined: {
            fontSize: '14px',
            fontWeight: 'bold',
            borderColor: '#fc5c6c',
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'standard',
        },
        styleOverrides: {
          root: {
            height: '32px',
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
      MuiTabs: {
        styleOverrides: {
          root: {
            '& .MuiTabs-indicator': {
              backgroundColor: '#172242',
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontSize: '0.9rem',
            fontWeight: 700,
            color: '#abb0bb',
            marginBottom: '4px',
            '&.Mui-selected': {
              color: '#172242',
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: '#fc5c6c',
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            color: '#888fa1',
            fontWeight: 'bold',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: '20px',
          },
          paperFullWidth: {
            width: '75%',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontSize: '1rem',
            padding: '8px',
            fontWeight: '500',
          },
        },
      },
    },
  });

  return (
    <>
      <Head>
        <title>タップル(tapple)</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <CacheProvider value={emotionCache}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default App;
