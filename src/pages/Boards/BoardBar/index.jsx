import Box from '@mui/system/Box'

function BoardBar() {
  return (
    <Box sx={{
      backgroundColor: 'primary.dark',
      width: '100%',
      height: (theme) => theme.custom.boardBarHeight,
      display: 'flex',
      alignItems: 'center'
    }}>
      BOARD BAR
    </Box>
  )
}

export default BoardBar
