// Board detail
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
import { mockData } from '~/apis/mock_data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'

function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    // Tạm thời fix cứng boardId, về sau dùng react-router-dom sau
    const boardId = '66138370b71c43201bb27685'
    //Call API
    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board}/>
      <BoardContent board={board}/>
      {/* <BoardBar board={mockData?.board}/>
      <BoardContent board={mockData?.board}/> */}
    </Container>
  )
}

export default Board
