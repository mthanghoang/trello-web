import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

/*
* Về sau catch lỗi tập trung bằng axios Interceptors
*/
//Board
export const fetchBoardDetailsAPI = async (boardId) => {
  return (await axios.get(`${API_ROOT}/v1/boards/${boardId}`)).data
}

export const updateBoardDetailsAPI = async (boardId, dataToUpdate) => {
  return (await axios.put(`${API_ROOT}/v1/boards/${boardId}`, dataToUpdate)).data
}

export const moveCardToDifferentColumnAPI = async (dataToUpdate) => {
  return (await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, dataToUpdate)).data
}

//Column
export const updateColumnDetailsAPI = async (columnId, dataToUpdate) => {
  return (await axios.put(`${API_ROOT}/v1/columns/${columnId}`, dataToUpdate)).data
}

export const deleteColumnAPI = async (columnId) => {
  return (await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)).data
}

export const createNewColumnAPI = async (newColumnData) => {
  return (await axios.post(`${API_ROOT}/v1/columns/`, newColumnData)).data
}

//Card
export const createNewCardAPI = async (newCardData) => {
  return (await axios.post(`${API_ROOT}/v1/cards/`, newCardData)).data
}

export const deleteCardAPI = async (cardId) => {
  return (await axios.delete(`${API_ROOT}/v1/cards/${cardId}`)).data
}

export const updateCardDetailsAPI = async (cardId, dataToUpdate) => {
  return (await axios.put(`${API_ROOT}/v1/cards/${cardId}`, dataToUpdate)).data
}
