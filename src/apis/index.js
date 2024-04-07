import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

/*
* Về sau catch lỗi tập trung bằng axios Interceptors
*/
export const fetchBoardDetailsAPI = async (boardId) => {
  return (await axios.get(`${API_ROOT}/v1/boards/${boardId}`)).data
}