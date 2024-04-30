import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchBoardThunk } from './redux/Board/boardSlice'
import Board from '~/pages/Boards/_id'
// import theme from './theme'

function App() {
  const dispatch = useDispatch()
  const boardId = '66138370b71c43201bb27685'
  useEffect(() => {
    dispatch(fetchBoardThunk(boardId))
  }, [])
  return (
    <>
      {/* React Router Dom /boards /boards/{board_id} */}
      <Board />
    </>
  )
}

export default App
