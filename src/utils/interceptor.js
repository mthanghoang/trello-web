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

// Ininitialize a promise for calling refresh token API
// to prevent multiple calls to refresh token API when multiple requests are sent concurrently
let refreshTokenPromise = null

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
        toast.error(`${error.response.data.message}. Logging you out...`, {
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

    if (error.response.status === 410 && originalRequest) {
      // originalRequest._retry = true

      if (!refreshTokenPromise) {
        // Get refresh token
        // 1. from local storage
        // const refreshToken = localStorage.getItem('refreshToken')

        // Call refresh token API
        refreshTokenPromise = refreshTokenAPI().then(() => {
          // Save new access token to local storage
          // localStorage.setItem('accessToken', response.accessToken)
          // axiosInstance.defaults.headers.Authorization = `Bearer ${response.accessToken}`

          // Lưu ý là access token cũng đã được update lại ở Cookie (cho trường hợp Cookie)
        }).catch(err => {
          // Nếu API refresh token lỗi thì BE đã trả về code 401 nên sẽ rơi vào block 401 ở trên
          return Promise.reject(err)
        }).finally(() => {
          refreshTokenPromise = null
        })
      }
      return refreshTokenPromise.then(() => {
        // Return axios instance together with original request to retry failed API call
        return axiosInstance(originalRequest)
      })
    }

    // Handle other errors
    toast.error(error.response.data.message, {
      autoClose: 5000
    })
    return Promise.reject(error.response.data) // => {message: 'Error text from backend', stack: ' ', statusCode:}
  }
)
