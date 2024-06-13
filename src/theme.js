// import { createTheme } from '@mui/material/styles'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#556cd6'
//     },
//     secondary: {
//       main: '#19857b'
//     },
//     error: {
//       main: red.A400
//     },
//     text: {
//       secondary: red[500]
//     }
//   }
// })
const APP_BAR_HEIGHT = '60px'
const BOARD_BAR_HEIGHT = '58px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`

const theme = extendTheme({
  custom: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT
  },
  colorSchemes: {
    light: {
      palette: {
        // primary: teal,
        // secondary: deepOrange
        // text: {
        //   primary: 'white'
        // }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#2c3e50'
        }
        // text: {
        //   primary: 'white'
        // }
        // secondary: orange
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '4px',
            height: '4px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '4px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white'
          },
          'input[type="password"]::-ms-reveal': {
            display: 'none'
          }
          // 'input[type="search"]::-webkit-search-cancel-button': {
          //   -webkit-appearance: 'none'
          // }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '1px'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          '& fieldset': { borderWidth: '1px !important' },
          '&.Mui-focused fieldset': { borderWidth: '1px !important'
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
        }
      }
    }
  }
  // ...other properties
})
export default theme