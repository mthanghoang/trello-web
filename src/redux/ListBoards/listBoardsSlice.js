import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getListBoardsAPI } from '~/apis'

export const listBoardsSlice = createSlice({
  name: 'listBoards',
  initialState: {
    boards: []
    // loading: false,
    // error: null
  },
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchListBoardsThunk.fulfilled, (state, action) => {
      state.boards = action.payload
    })
      .addCase(fetchListBoardsThunk.rejected, (state, action) => {
        throw action.error
      })
  }
})

export const fetchListBoardsThunk = createAsyncThunk('listBoards/fetchListBoards', async () => {
  const response = await getListBoardsAPI()
  return response
})