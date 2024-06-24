import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ROOT } from '~/utils/constants'

export const axiosInstance = axios.create({
  baseURL: API_ROOT
})

// Maximum wait time for a request
axiosInstance.defaults.timeout = 1000 * 60 * 10 // 10 minutes

// Send cookies with requests
// axiosInstance.defaults.withCredentials = true

axiosInstance.interceptors.request.use(
  config => {
  // Do something before request is sent
    return config
  },
  error => {
  // Do something with request error
    return Promise.reject(error)
  })

axiosInstance.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  response => {
    return response
  },
  error => {
    // Can't connect to the server
    if (!error.response) {
      toast('You are offline. Changes made now will not be saved', {
        autoClose: false,
        closeOnClick: false
      })
      return Promise.reject(error) // => {message: 'Network Error', name: 'AxiosError', code: 'ERR_NETWORK', config: {…}, request: XMLHttpRequest,…}
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    console.log(error.response.data)
    toast.error(error.response.data.message, {
      autoClose: 5000
    })
    return Promise.reject(error.response.data) // => {message: 'Error text from backend', stack: ' ', statusCode:}
  }
)