import GroupIcon from '@mui/icons-material/Group'
import AttachmentIcon from '@mui/icons-material/Attachment'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Card as MuiCard } from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Backdrop from '@mui/material/Backdrop'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useConfirm } from 'material-ui-confirm'
import { useState } from 'react'
import CardDetailsModal from '~/components/CardDetailsModal'

function Card({ card_data, column_data, deleteCard, updateCard }) {
  const renderCardActions = () => {
    return !!card_data?.memberIds?.length || !!card_data?.comments?.length || !!card_data?.attachments?.length
  }

  // DRAG AND DROP
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card_data._id,
    data: { ...card_data } //bỏ dòng này đi vẫn chạy được
  })
  const dndKitCardStyle = {
    // transform: CSS.Transform.toString(transform),
    //dùng transform hình dáng draggable elements sẽ bị biến đổi
    // https://github.com/clauderic/dnd-kit/issues/117
    transform: CSS.Translate.toString(transform),
    transition,
    userSelect: 'none',
    opacity: isDragging ? 0.2 : undefined
  }

  // Edit card modal
  const [openEditCardModal, setOpenEditCardModal] = useState(false)
  const handleOpenEditCard = () => {
    setOpenEditCardModal(true)
  }
  const handleCloseEditCard = () => setOpenEditCardModal(false)

  // Delete card
  const confirmDeleteCard = useConfirm()
  const handleDeleteCard = () => {
    confirmDeleteCard({
      title: 'Remove card',
      description: 'Are you sure you want to remove this card?'
    }).then(() => {
      deleteCard(card_data)
    }).catch(() => {})
  }

  return (
    <>
      <MuiCard
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={dndKitCardStyle}
        sx={{
          cursor: 'pointer',
          boxShadow: '0 2px 2px rgba(0, 0, 0, 0.3)',
          overflow: 'unset',
          display: card_data?.FE_PlaceholderCard ? 'none' : 'block',
          // overflow: card_data?.FE_PlaceholderCard ? 'hidden' : 'unset',
          // height: card_data?.FE_PlaceholderCard ? '0px' : 'unset',
          '&:hover': { border: theme => theme.palette.mode === 'light'
            ? '2px solid #3498db'
            : '2px solid #d35400' },
          border: '2px solid transparent',
          borderRadius: '8px'
        }}
      >
        {card_data?.cover &&
          <CardMedia
            sx={{ height: 140 }}
            image={card_data?.cover}
          />
        }
        <CardContent sx={{
          p: 1.5,
          '&:last-child': { p: 1.5 },
          position: 'relative',
          '&:hover .MuiBox-root': { display: 'flex' }
        }}>
          <Typography sx={{ overflowWrap: 'break-word' }}>{card_data?.title}</Typography>
          <Box data-no-dnd='true' sx={{
            display: 'none',
            alignItems: 'center',
            position: 'absolute',
            bgcolor: theme => theme.palette.mode === 'light' ? '#fff' : '#1e1e1e',
            top: '8px',
            right: '8px'
          }}>
            <ModeEditOutlineIcon onClick={handleOpenEditCard} fontSize='small'
              sx={{
                boxSizing: 'content-box',
                borderRadius: '13px',
                padding: '4px',
                '&:hover': {
                  bgcolor: theme => theme.palette.mode === 'light' ? 'grey.200' : 'grey.700'
                }
              }} />
            <DeleteOutlineIcon onClick={handleDeleteCard} fontSize='small' sx={{
              boxSizing: 'content-box',
              borderRadius: '13px',
              padding: '4px',
              '&:hover': {
                bgcolor: theme => theme.palette.mode === 'light' ? 'grey.200' : 'grey.700'
              }
            }} />
          </Box>
        </CardContent>

        {renderCardActions() &&
          <CardActions sx={{
            p: '0 4px 8px 4px'
          }}>
            {!!card_data?.memberIds?.length &&
            <Button sx={{ color: 'text.primary' }} size="small" startIcon={<GroupIcon />}>{card_data?.memberIds?.length}</Button>}

            {!!card_data?.comments?.length &&
            <Button sx={{ color: 'text.primary' }} size="small" startIcon={<ModeCommentIcon />}>{card_data?.comments?.length}</Button>}

            {!!card_data?.attachments?.length &&
            <Button sx={{ color: 'text.primary' }} size="small" startIcon={<AttachmentIcon />}>{card_data?.attachments?.length}</Button>}
          </CardActions>
        }
      </MuiCard>
      <Backdrop
        data-no-dnd='true'
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openEditCardModal}
        onClick={handleCloseEditCard}>
        <CardDetailsModal card_data={card_data} column_data={column_data} updateCard={updateCard} />
      </Backdrop>
    </>
  )
}

export default Card