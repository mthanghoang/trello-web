// Board detail
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
// import CircularProgress from '@mui/material/CircularProgress'

function Board() {
  // if (!board) {
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
      height: '100vh',
      bgcolor: '#2ecc71' }}>
      <AppBar />
      <BoardBar />
      <BoardContent />
      {/* <BoardBar board={mockData?.board}/>
      <BoardContent board={mockData?.board}/> */}
    </Container>
  )
}

export default Board
