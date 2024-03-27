import Box from '@mui/system/Box'
import ListColumns from './ListColumns/ListColumns'

function BoardContent() {

  return (
    <Box sx={{
      backgroundColor: 'primary.main',
      width: '100%',
      height: (theme) => theme.custom.boardContentHeight,
      padding: '10px 0 10px 0'
    }}>
      <ListColumns />
    </Box>
  )
}

export default BoardContent
