import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import store from './redux/store'
import { Provider } from 'react-redux'
// import { ThemeProvider } from '@mui/material/styles'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import theme from '~/theme.js'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Mui Confirm Dialog library
import { ConfirmProvider } from 'material-ui-confirm'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <ConfirmProvider defaultOptions={{
      allowClose: false,
      dialogProps: { maxWidth: 'xs' },
      confirmationButtonProps:{ color: 'error', variant: 'contained' },
      cancellationButtonProps: { color: 'info', variant: 'outlined' }
    }}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
      <ToastContainer position='top-left' autoClose={1000}/>
    </ConfirmProvider>
  </CssVarsProvider>
  // </React.StrictMode>
)
