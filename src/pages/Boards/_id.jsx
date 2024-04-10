// Board detail
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
// import { mockData } from '~/apis/mock_data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI, updateBoardDetailsAPI } from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'

function Board() {
  const [board, setBoard] = useState(null)
  // Tạm thời fix cứng boardId, về sau dùng react-router-dom sau
  const boardId = '66138370b71c43201bb27685'
  useEffect(() => {
    //Call API
    fetchBoardDetailsAPI(boardId).then(board => {
      //Khi render lần đầu Column nào rỗng thì thêm dummy card cho nó để kéo thả
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
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
  }

  // API for updating column order after drag and drop columns
  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map(column => column._id)

    // Cập nhật state board
    const updatedBoard = { ...board }
    updatedBoard.columns = dndOrderedColumns
    updatedBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(updatedBoard)

    // Gọi API update board
    await updateBoardDetailsAPI(updatedBoard._id, {
      columnOrderIds: updatedBoard.columnOrderIds
    })
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board}/>
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}/>
      {/* <BoardBar board={mockData?.board}/>
      <BoardContent board={mockData?.board}/> */}
    </Container>
  )
}

export default Board
