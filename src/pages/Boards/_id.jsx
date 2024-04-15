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
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI,
  deleteColumnAPI,
  deleteCardAPI
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { toast } from 'react-toastify'
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

      // sau khi thêm card thì phải bỏ dummy card đi
      columnToUpdate.cards = columnToUpdate.cards.filter(card => !card.FE_PlaceholderCard)
      columnToUpdate.cardOrderIds = columnToUpdate.cardOrderIds.filter(cardId => !cardId.includes('placeholder-card'))
    }
    setBoard(updatedBoard)
    // console.log('set xong van chay')
  }

  // API call for updating column order after drag and drop columns
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map(column => column._id)

    // Cập nhật state board
    // const updatedBoard = { ...board }
    // updatedBoard.columns = dndOrderedColumns
    // updatedBoard.columnOrderIds = dndOrderedColumnIds
    // setBoard(updatedBoard)

    // Gọi API update board
    // ko dùng await (khi nào cần hứng kết quả sau khi gọi để làm gì đấy
    // mới cần await hoặc là .then .catch)
    /**
     * Khác với create
     * Create phải lấy kết quả của api trả về rồi hiển thị
     * Update hiển thị trước (set lại state ở component con khi dnd) rồi mới gửi updated
     * data đến DB
     */
    updateBoardDetailsAPI(board._id, {
      columnOrderIds: dndOrderedColumnIds
    })
  }

  // API call for update card order after dnd cards in the same column
  const moveCardsInSameColumn = (dndOrderedCardIds, columnId) => {
    // Cập nhật state board
    // const updatedBoard = { ...board }
    // const columnToUpdate = updatedBoard.columns.find(column => column._id === columnId)
    // if (columnToUpdate) {
    //   columnToUpdate.cards = dndOrderedCards
    //   columnToUpdate.cardOrderIds = dndOrderedCardIds
    // }
    // setBoard(updatedBoard)

    // Gọi API update board
    // ko dùng await (khi nào cần hứng kết quả sau khi gọi để làm gì đấy
    // mới cần await hoặc là .then .catch)
    /**
     * Khác với create
     * Create phải lấy kết quả của api trả về rồi hiển thị
     * Update hiển thị trước (set lại state ở component con khi dnd) rồi mới gửi updated
     * data đến DB
     */
    updateColumnDetailsAPI(columnId, {
      cardOrderIds: dndOrderedCardIds
    })
  }

  // API call for update columns after dnd cards in different columns
  const moveCardToDifferentColumn = (activeCardId, activeColumnId, overColumnId, dndOrderedColumns) => {
    /**
     * B1: Cập nhật lại mảng cards và cardOrderIds của active column
     * B2: Cập nhật lại mảng cards và cardOrderIds của over column
     * B3: Cập nhật lại columnId của cái card bị kéo đi column khác
     */

    // API
    moveCardToDifferentColumnAPI({
      activeCardId,
      activeColumnId,
      activeCardOrderIds: dndOrderedColumns.find(c => c._id === activeColumnId)?.cardOrderIds.filter(cardId => !cardId.includes('placeholder-card')),
      overColumnId,
      overCardOrderIds: dndOrderedColumns.find(c => c._id === overColumnId)?.cardOrderIds.filter(cardId => !cardId.includes('placeholder-card'))
    })
  }

  // API call for deleting column
  const deleteColumn = (columnId) => {
    //cập nhật lại state board để hiển thị ko còn column nữa
    const updatedBoard = { ...board }
    updatedBoard.columns = updatedBoard.columns.filter(c => c._id !== columnId)
    updatedBoard.columnOrderIds = updatedBoard.columnOrderIds.filter(id => id !== columnId)
    setBoard(updatedBoard)
    //gọi API
    deleteColumnAPI(columnId).then(res => {
      toast.success(res?.deleteResult, {
        theme: 'colored'
      })
    })
  }

  // API call for editing column title
  const editColumnTitle = async (columnId, newTitle) => {
    // update board
    const updatedBoard = { ...board }
    const targetColumn = updatedBoard.columns.find(c => c._id === columnId)
    targetColumn.title = newTitle
    setBoard(updatedBoard)
    // gọi API
    updateColumnDetailsAPI(columnId, {
      title: newTitle
    })
  }

  // API call for deleting column
  const deleteCard = (card) => {
    //cập nhật lại state board để hiển thị ko còn card nữa
    const updatedBoard = { ...board }
    const targetColumn = updatedBoard.columns.find(c => c._id === card.columnId)
    targetColumn.cards = targetColumn.cards.filter(c => c._id !== card._id)
    targetColumn.cardOrderIds = targetColumn.cards.filter(id => id !== card._id)
    if (isEmpty(targetColumn.cards)) {
      targetColumn.cards = [generatePlaceholderCard(targetColumn)]
      targetColumn.cardOrderIds = [generatePlaceholderCard(targetColumn)._id]
    }
    setBoard(updatedBoard)
    //gọi API
    deleteCardAPI(card._id)
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
    <Container disableGutters maxWidth={false} sx={{
      height: '100vh',
      bgcolor: '#2ecc71' }}>
      <AppBar />
      <BoardBar board={board}/>
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardsInSameColumn={moveCardsInSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
        deleteColumn={deleteColumn}
        editColumnTitle={editColumnTitle}
        deleteCard={deleteCard}
      />
      {/* <BoardBar board={mockData?.board}/>
      <BoardContent board={mockData?.board}/> */}
    </Container>
  )
}

export default Board
