// Boards list
import AppBar from '~/components/AppBar'
import Container from '@mui/material/Container'
import { Box, Typography } from '@mui/material'
import { listBoardsSelector } from '~/redux/selectors'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchListBoardsThunk } from '~/redux/ListBoards/listBoardsSlice'
import BoardCard from '~/components/BoardCard'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'

function ListBoards() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    dispatch(fetchListBoardsThunk())
      .then(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const listBoards = useSelector(listBoardsSelector)
  return (
    <Container disableGutters maxWidth={false} sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundImage: 'url(/eberhard-grossgasteiger-B8CmeqLpTO8-unsplash.jpg)'
    }}>
      <AppBar />
      <Box sx={{
        bgcolor: theme => theme.palette.mode === 'light' ? '#F9F6EE' : '#34495e',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '60%',
        my: 'auto',
        mx: 'auto',
        px: 2,
        pt: 2,
        pb: theme => `calc(${theme.custom.appBarHeight} + 32px)`,
        minWidth: 'fit-content',
        boxShadow: 2
      }}>
        <Typography variant='h6' sx={{
          color: 'text.primary'
        }}>
          Your Workspace
        </Typography>
        {loading ? (
          <Box sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 200px))'
          }}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton sx={{ borderRadius: 2 }} key={index} variant="rectangular" width={200} height={200} />
            ))}
          </Box>
        ) : (
          <Box sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 200px))'
          }}>
            {listBoards.map(board => (
              <BoardCard key={board._id} board={board} />
            ))}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Button variant="contained" size="large" sx={{ height: '96px' }}>
                Create new board
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default ListBoards
