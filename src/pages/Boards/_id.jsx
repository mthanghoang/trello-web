// Board detail
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchBoardThunk } from '~/redux/Board/boardSlice'
import CircularProgress from '@mui/material/CircularProgress'
import { boardSelector } from '~/redux/selectors'

function Board() {
  const dispatch = useDispatch()
  const boardId = '66138370b71c43201bb27685'
  const board = useSelector(boardSelector)
  useEffect(() => {
    dispatch(fetchBoardThunk(boardId))
  }, [])
  // if (!loading) {
  //   return (
  //     <Box sx={{
  //       display: 'flex',
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //       gap: 2, width: '100vw', height: '100vh'
  //     }}>
  //       <CircularProgress />
  //       <Typography>Loading Board</Typography>
  //     </Box>
  //   )
  // }

  return (
    <Container disableGutters maxWidth={false} sx={{
      height: '100vh'
    }}>
      <AppBar />
      <BoardBar />
      {!board._id
        ?
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          width: '100%',
          height: theme => theme.custom.boardContentHeight
        }}>
          <CircularProgress />
          <Typography>Loading Board</Typography>
        </Box>
        :
        <BoardContent board={board} />
      }
      {/* <BoardBar board={mockData?.board}/>
      <BoardContent board={mockData?.board}/> */}
    </Container>
  )
}

export default Board
