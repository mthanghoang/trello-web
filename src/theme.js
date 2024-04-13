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
const COLUMN_HEADER_HEIGHT = '172px'
const COLUMN_FOOTER_MAX_HEIGHT = '174px'
const COLUMN_FOOTER_MIN_HEIGHT = '56px'

const theme = extendTheme({
  custom: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterMaxHeight: COLUMN_FOOTER_MAX_HEIGHT,
    columnFooterMinHeight: COLUMN_FOOTER_MIN_HEIGHT
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
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '1px'
          // '&:hover': {borderWidth: '1.5px'}
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          fontSize: '0.875rem'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          fontSize: '0.875rem',
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.light
          // },
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.main
          //   }
          // },
          '& fieldset': { borderWidth: '1px !important' },
          // '&:hover fieldset': { borderWidth: '2px !important' },
          '&.Mui-focused fieldset': { borderWidth: '1px !important' }
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