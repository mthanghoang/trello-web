// Board detail
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
// import { mockData } from '~/apis/mock_data'
import { useEffect, useState } from 'react'
import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sorters'

function Board() {
  const [board, setBoard] = useState(null)
  // Tạm thời fix cứng boardId, về sau dùng react-router-dom sau
  const boardId = '66138370b71c43201bb27685'
  useEffect(() => {
    //Call API
    fetchBoardDetailsAPI(boardId).then(board => {

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
      setBoard(board)
    })
  }, [])

  // Function for calling API create column and update state board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    //Khi mới tạo column thì nó rỗng, thêm dummy card cho nó để kéo thả
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    // Cập nhật state board
    const updatedBoard = { ...board }
    updatedBoard.columns.push(createdColumn)
    updatedBoard.columnOrderIds.push(createdColumn._id)
    setBoard(updatedBoard)
  }

  // Function for calling API create card and update state board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    // Cập nhật state board
    const updatedBoard = { ...board }
    const columnToUpdate = updatedBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(updatedBoard)
    // console.log('set xong van chay')
  }

  // API call for updating column order after drag and drop columns
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map(column => column._id)

    // Cập nhật state board
    const updatedBoard = { ...board }
    updatedBoard.columns = dndOrderedColumns
    updatedBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(updatedBoard)

    // Gọi API update board
    // ko dùng await (khi nào cần hứng kết quả sau khi gọi để làm gì đấy
    // mới cần await hoặc là .then .catch)
    /**
     * Khác với create
     * Create phải lấy kết quả của api trả về rồi hiển thị
     * Update hiển thị trước (dòng setBoard ở trên) rồi mới gửi updated
     * board đến DB
     */
    updateBoardDetailsAPI(updatedBoard._id, {
      columnOrderIds: updatedBoard.columnOrderIds
    })
  }

  // API call for update card order after dnd cards in the same column
  const moveCardsInSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    // Cập nhật state board
    const updatedBoard = { ...board }
    const columnToUpdate = updatedBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(updatedBoard)

    // Gọi API update board
    updateColumnDetailsAPI(columnId, {
      cardOrderIds: dndOrderedCardIds
    })
  }

  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2, width: '100vw', height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading Board</Typography>
      </Box>
    )
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board}/>
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardsInSameColumn={moveCardsInSameColumn}/>
      {/* <BoardBar board={mockData?.board}/>
      <BoardContent board={mockData?.board}/> */}
    </Container>
  )
}

export default Board
