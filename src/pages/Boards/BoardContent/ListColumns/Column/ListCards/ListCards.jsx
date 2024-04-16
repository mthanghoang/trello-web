import Box from '@mui/system/Box'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

function ListCards({ cards, column, deleteCard, updateCard }) {
  return (
    <SortableContext items={cards.map(card => card._id)} strategy={verticalListSortingStrategy}>
      <Box sx={{
        p: '0 5px',
        m: '0 2px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        paddingBottom: '2px',
        // flexGrow: 1,
        // maxHeight: (theme) => `calc(
        //   ${theme.custom.boardContentHeight}
        //   - ${theme.spacing(4)}
        //   - ${theme.custom.columnHeaderMaxHeight}
        //   - ${theme.custom.columnFooterMaxHeight})`,
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ced0da',
          borderRadius: '8px'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#bfc2cf'
        }
      }}>
        {/* <Card />
        <Card noMedia /> */}
        {cards.map((card) => (
          <Card key={card._id} card_data={card} column_data={column} deleteCard={deleteCard} updateCard={updateCard}/>
        ))}
      </Box>
    </SortableContext>
  )
}

export default ListCards