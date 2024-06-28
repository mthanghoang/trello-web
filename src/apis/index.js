import { axiosInstance } from '~/utils/interceptor'

/*
* Về sau catch lỗi tập trung bằng axios Interceptors
*/

//User Auth
export const loginAPI = async (loginData) => {
  return (await axiosInstance.post('/v1/authentication/login', loginData)).data
}

export const logoutAPI = async () => {
  return (await axiosInstance.delete('/v1/authentication/logout'))
}

//Board
export const fetchBoardDetailsAPI = async (boardId) => {
  return (await axiosInstance.get(`/v1/boards/${boardId}`)).data
}

export const updateBoardDetailsAPI = async (boardId, dataToUpdate) => {
  return (await axiosInstance.put(`/v1/boards/${boardId}`, dataToUpdate)).data
}

export const moveCardToDifferentColumnAPI = async (boardId, dataToUpdate) => {
  return (await axiosInstance.put(`/v1/boards/${boardId}/moving_card`, dataToUpdate)).data
}
export const getListBoardsAPI = async () => {
  return (await axiosInstance.get('/v1/boards')).data

}

//Column
export const updateColumnDetailsAPI = async (columnId, dataToUpdate) => {
  return (await axiosInstance.put(`/v1/columns/${columnId}`, dataToUpdate)).data
}

export const deleteColumnAPI = async (columnId) => {
  return (await axiosInstance.delete(`/v1/columns/${columnId}`)).data
}

export const createNewColumnAPI = async (newColumnData) => {
  return (await axiosInstance.post('/v1/columns/', newColumnData)).data
}

//Card
export const createNewCardAPI = async (newCardData) => {
  return (await axiosInstance.post('/v1/cards/', newCardData)).data
}

export const deleteCardAPI = async (cardId) => {
  return (await axiosInstance.delete(`/v1/cards/${cardId}`)).data
}

export const updateCardDetailsAPI = async (cardId, dataToUpdate) => {
  return (await axiosInstance.put(`/v1/cards/${cardId}`, dataToUpdate)).data
}
