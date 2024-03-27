import Box from '@mui/system/Box'
import Card from './Card/Card'

function ListCards() {
  return (
    <Box sx={{
      p: '0 5px',
      m: '0 2px',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      overflowX: 'hidden',
      overflowY: 'auto',
      paddingBottom: '2px',
      maxHeight: (theme) => `calc(
        ${theme.custom.boardContentHeight} - ${theme.spacing(5)} -
        ${theme.custom.columnHeaderHeight} - ${theme.custom.columnFooterHeight})`,
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#ced0da',
        borderRadius: '8px'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#bfc2cf'
      }
    }}>
      <Card />
      <Card noMedia />
    </Box>
  )
}

export default ListCards