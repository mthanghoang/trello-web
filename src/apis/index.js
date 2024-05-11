import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ROOT } from '~/utils/constants'

/*
* Về sau catch lỗi tập trung bằng axios Interceptors
*/

const instance = axios.create({
  baseURL: API_ROOT
})
instance.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      toast('You are offline. Changes made now will not be saved', {
        autoClose: false,
        closeOnClick: false
      })
      return Promise.reject(error) // => {message: 'Network Error', name: 'AxiosError', code: 'ERR_NETWORK', config: {…}, request: XMLHttpRequest,…}
    }

    // console.log('Error returned from server:', error.response.data)
    return Promise.reject(error.response.data) // => {message: 'Error text from backend', stack: ' ', statusCode:}
  }
)
//Board
export const fetchBoardDetailsAPI = async (boardId) => {
  return (await instance.get(`${API_ROOT}/v1/boards/${boardId}`)).data
}

export const updateBoardDetailsAPI = async (boardId, dataToUpdate) => {
  return (await instance.put(`${API_ROOT}/v1/boards/${boardId}`, dataToUpdate)).data
}

export const moveCardToDifferentColumnAPI = async (dataToUpdate) => {
  return (await instance.put(`${API_ROOT}/v1/boards/supports/moving_card`, dataToUpdate)).data
}

//Column
export const updateColumnDetailsAPI = async (columnId, dataToUpdate) => {
  return (await instance.put(`${API_ROOT}/v1/columns/${columnId}`, dataToUpdate)).data
}

export const deleteColumnAPI = async (columnId) => {
  return (await instance.delete(`${API_ROOT}/v1/columns/${columnId}`)).data
}

export const createNewColumnAPI = async (newColumnData) => {
  return (await instance.post(`${API_ROOT}/v1/columns/`, newColumnData)).data
}

//Card
export const createNewCardAPI = async (newCardData) => {
  return (await instance.post(`${API_ROOT}/v1/cards/`, newCardData)).data
}

export const deleteCardAPI = async (cardId) => {
  return (await instance.delete(`${API_ROOT}/v1/cards/${cardId}`)).data
}

export const updateCardDetailsAPI = async (cardId, dataToUpdate) => {
  return (await instance.put(`${API_ROOT}/v1/cards/${cardId}`, dataToUpdate)).data
}
