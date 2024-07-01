import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ROOT } from '~/utils/constants'
import { logoutAPI, refreshTokenAPI } from '~/apis'

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

    if (error.response.status === 401) {
      // Check if user is on login page
      if (location.pathname === '/login') {
        return Promise.reject(error.response.data)
      }
      // If the unauthorized request is sent after a successful login, then logout.
      // Before logging out send a message to user that they are unauthorized
      logoutAPI().then(() => {
        // Display message to user. Make sure the user has enough time to read the message
        // before logging them out
        toast.error('Unauthorized request. Logging you out...', {
          autoClose: 5000
        })
        setTimeout(() => {
          logoutAPI().then(() => {
            location.href = '/login'
          })
        }, 5000)

      })
      return Promise.reject(error.response.data) // => {message: 'Unauthorized', statusCode: 401}
    }

    // Handle expired access token (auto call refresh token API)
    const originalRequest = error.config

    if (error.response.status === 410 && !originalRequest._retry) {
      originalRequest._retry = true

      // Get refresh token
      // 1. from local storage
      // const refreshToken = localStorage.getItem('refreshToken')

      // 2. from cookies
      // const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refreshToken')).split('=')[1]
      // Call refresh token API
      return refreshTokenAPI().then(() => {
        // Save new access token to local storage
        // localStorage.setItem('accessToken', response.accessToken)
        // axiosInstance.defaults.headers.Authorization = `Bearer ${response.accessToken}`

        // Lưu ý là access token cũng đã được update lại ở Cookie (cho trường hợp Cookie)

        // Resend the original request
        return axiosInstance(originalRequest)
      }).catch(err => {
        logoutAPI().then(() => {
          location.href = '/login'
        })
        return Promise.reject(err)
      })
    }

    // Handle other errors
    toast.error(error.response.data.message, {
      autoClose: 5000
    })
    return Promise.reject(error.response.data) // => {message: 'Error text from backend', stack: ' ', statusCode:}
  }
)