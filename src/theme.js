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
const theme = extendTheme({
  custom: {
    appBarHeight: '60px',
    boardBarHeight: '58px'
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
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
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
        root: ({ theme }) => ({
          // color: theme.palette.primary.main,
          fontSize: '0.875rem'
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
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
        })
      }
    }
  }
  // ...other properties
})
console.log(theme)
export default theme