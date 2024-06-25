import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ROOT } from '~/utils/constants'

export const axiosInstance = axios.create({
  baseURL: API_ROOT
})

// Maximum wait time for a request
axiosInstance.defaults.timeout = 1000 * 60 * 10 // 10 minutes

// Send cookies with requests
axiosInstance.defaults.withCredentials = true

axiosInstance.interceptors.request.use(
  config => {
    // Do something before request is sent

    // BE USES COOKIES FOR AUTHENTICATION SO NO NEED TO ATTACH ACCESS TOKEN TO HEADER

    // Get access token from local storage and attach to the header
    // const accessToken = localStorage.getItem('accessToken')
    // if (accessToken) {
    // Cần thêm Bearer đề tuân thủ theo tiêu chuẩn OAuth2 trong việc xác định loại token sử dụng
    // https://tools.ietf.org/html/rfc6750#section-2.1
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
    // Bearer là định nghĩa loại token dành cho authentication và authorization, tham khảo các loại token khác như: Basic Token, Digest Token, OAuth Token
    //   config.headers['Authorization'] = `Bearer ${accessToken}`
    // }
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
      toast('Network error. Changes made now will not be saved', {
        autoClose: false,
        closeOnClick: false
      })
      return Promise.reject(error) // => {message: 'Network Error', name: 'AxiosError', code: 'ERR_NETWORK', config: {…}, request: XMLHttpRequest,…}
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    toast.error(error.response.data.message, {
      autoClose: 5000
    })
    return Promise.reject(error.response.data) // => {message: 'Error text from backend', stack: ' ', statusCode:}
  }
)