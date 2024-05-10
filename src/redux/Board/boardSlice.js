import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchBoardDetailsAPI } from '~/apis'
import { mapOrder } from '~/utils/sorters'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    _id: null,
    title: null,
    description: null,
    type: null,
    slug: null,
    columnOrderIds: [],
    columns: [],
    createdAt: null,
    updatedAt: null,
    _destroyed: null
  },
  reducers: {
    moveColumn: (state, action) => {
      state.columns = action.payload
      state.columnOrderIds = action.payload.map(column => column._id)
    },
    moveCard: (state, action) => {
      state.columns = action.payload
    },
    editBoardTitle: (state, action) => {
      state.title = action.payload.title
    },
    addNewColumn: (state, action) => {
      state.columns.push(action.payload)
      state.columnOrderIds.push(action.payload._id)
    },
    editColumnTitle: (state, action) => {
      const targetColumn = state.columns.find(c => c._id === action.payload.columnId)
      targetColumn.title = action.payload.title
    },
    deleteColumn: (state, action) => {
      state.columns = state.columns.filter(c => c._id !== action.payload)
      state.columnOrderIds = state.columnOrderIds.filter(id => id !== action.payload)
    },
    addNewCard: (state, action) => {
      const columnToUpdate = state.columns.find(c => c._id === action.payload.columnId)
      if (columnToUpdate) {
        columnToUpdate.cards.push(action.payload)
        columnToUpdate.cardOrderIds.push(action.payload._id)
        // sau khi thêm card thì phải bỏ dummy card đi
        columnToUpdate.cards = columnToUpdate.cards.filter(card => !card.FE_PlaceholderCard)
        columnToUpdate.cardOrderIds = columnToUpdate.cardOrderIds.filter(cardId => !cardId.includes('placeholder-card'))
      }
    },
    updateCard: (state, action) => {
      const targetColumn = state.columns.find(c => c._id === action.payload.card.columnId)
      const targetCard = targetColumn.cards.find(c => c._id === action.payload.card._id)
      if (action.payload.title) {
        targetCard.title = action.payload.title
      }
      if (action.payload.description) {
        targetCard.description = action.payload.description
      }
    },
    deleteCard: (state, action) => {
      const targetColumn = state.columns.find(c => c._id === action.payload.columnId)
      targetColumn.cards = targetColumn.cards.filter(c => c._id !== action.payload._id)
      targetColumn.cardOrderIds = targetColumn.cards.filter(id => id !== action.payload._id)
      if (isEmpty(targetColumn.cards)) {
        targetColumn.cards = [generatePlaceholderCard(targetColumn)]
        targetColumn.cardOrderIds = [generatePlaceholderCard(targetColumn)._id]
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchBoardThunk.fulfilled, (state, action) => {
      state._id = action.payload._id
      state.title = action.payload.title
      state.description = action.payload.description
      state.type = action.payload.type
      state.slug = action.payload.slug
      state.columnOrderIds = action.payload.columnOrderIds
      state.columns = action.payload.columns
      state.createdAt = action.payload.createdAt
      state.updatedAt = action.payload.updatedAt
      state._destroyed = action.payload._destroyed
    })
      .addCase(fetchBoardThunk.rejected, (state, action) => {
        // console.log('fetchBoardThunk.rejected: ', action.error)
        throw action.error
      })
  }
})

// thunk actions
export const fetchBoardThunk = createAsyncThunk('board/fetchBoard', async (boardId) => {
  // try {
  const board = await fetchBoardDetailsAPI(boardId)

  // Sắp xếp lại mảng columns luôn ở đây trc khi truyền xuống component dưới
  board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

  //Khi render lần đầu Column nào rỗng thì thêm dummy card cho nó để kéo thả
  board.columns.forEach(column => {
    if (isEmpty(column.cards)) {
      column.cards = [generatePlaceholderCard(column)]
      column.cardOrderIds = [generatePlaceholderCard(column)._id]
    }
    else {
      // Sắp xếp lại mảng cards luôn ở đây trc khi truyền xuống component dưới
      column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
    }
  })
  return board
  // } catch (error) {
  //   throw error
  // }

})