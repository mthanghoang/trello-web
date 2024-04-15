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
import TextField from '@mui/material/TextField'
import Backdrop from '@mui/material/Backdrop'
import PaymentIcon from '@mui/icons-material/Payment'
import DescriptionIcon from '@mui/icons-material/Description'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useConfirm } from 'material-ui-confirm'
import { useState } from 'react'

function Card({ card_data, column_data, deleteCard }) {
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

  // Edit Card
  const [openEditCardModal, setOpenEditCardModal] = useState(false)
  const handleOpenEditCard = () => {
    setOpenEditCardModal(true)
  }
  const handleCloseEditCard = () => {
    setOpenEditCardModal(false)
  }

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
        <Box onClick={(e) => e.stopPropagation()} sx={{
          bgcolor: '#f1f2f4',
          padding: 2,
          width: '70%',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}>
          {/* TITLE */}
          <Box sx={{
            display: 'flex',
            width: '100%'
          }}>
            <PaymentIcon fontSize='medium' sx={{ color: '#44546f' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{
                fontWeight: 'bold',
                color: 'grey.600',
                ml: 1,
                overflowWrap: 'anywhere',
                lineHeight: '1.25'
              }} variant='h6'>
                {card_data.title}</Typography>
              <Typography
                sx={{ color: '#000', ml: 1, overflowWrap: 'anywhere' }}
                variant='body1'>in list <b>{column_data?.title}</b></Typography>
            </Box>
          </Box>

          {/* DESCRIPTION */}
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DescriptionIcon fontSize='medium' sx={{ color: '#44546f' }} />
              <Typography sx={{
                fontWeight: 500,
                color: 'grey.600',
                ml: 1,
                overflowWrap: 'anywhere',
                lineHeight: '1.25'
              }} variant='subtitle1'>
              Description</Typography>
            </Box>
            {!card_data.description
              ?
              <Box sx={{
                ml: 4,
                p: 1,
                borderRadius: '8px',
                cursor: 'pointer',
                bgcolor: '#202930',
                // '&:hover': {bgcolor: }
              }}>
                Add a more detailed description...</Box>
              : null}
          </Box>
          <Box></Box>
          <Box></Box>
        </Box>
      </Backdrop>
    </>
  )
}

export default Card