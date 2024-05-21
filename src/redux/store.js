import { configureStore } from '@reduxjs/toolkit'
import { boardSlice } from './Board/boardSlice'
import { listBoardsSlice } from './ListBoards/listBoardsSlice'

const store = configureStore({
  reducer: {
    listBoards: listBoardsSlice.reducer,
    board: boardSlice.reducer
  }
})

export default store