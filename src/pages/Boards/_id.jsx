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
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { boardSelector } from '~/redux/selectors'

function Board() {
  const dispatch = useDispatch()
  // const boardId = '66138370b71c43201bb27685'
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const boardId = '66138370b71c43201bb27635' // wrong board ID to test error handling
  const board = useSelector(boardSelector)
  useEffect(() => {
    dispatch(fetchBoardThunk(boardId))
      .then(() => {
        setLoading(false)
      })
      .catch((error) => {
        // console.log(error)
        setErrorMessage(error.message)
        setLoading(false)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{
      height: '100vh'
    }}>
      <AppBar />
      {loading
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
        : errorMessage
          ?
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            height: '100%',
            width: '100%'
          }}>
            <Typography variant='h6' sx={{ textAlign: 'center', mt: '100px', mx: '50px' }}>{errorMessage}</Typography>
            <Typography sx={{ textAlign: 'center', mx: '50px' }}>This board may be private. If someone gave you this link,
              they may need to share the
             board with you or invite you to their Workspace.</Typography>
          </Box>
          :
          <>
            <BoardBar />
            <BoardContent board={board} />
          </>
      }
    </Container>
  )
}

export default Board
