import GroupIcon from '@mui/icons-material/Group'
import AttachmentIcon from '@mui/icons-material/Attachment'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Card({ card_data }) {
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

  return (
    // <div ref={setNodeRef}>
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
        '&:hover svg': { display: 'inline-block' }
      }}>
        <Typography sx={{ overflowWrap: 'break-word' }}>{card_data?.title}</Typography>
        <ModeEditOutlineIcon sx={{
          display: 'none',
          fontSize: 'large',
          position: 'absolute',
          top: '8px',
          right: '8px',
          bgcolor: theme => theme.palette.mode === 'light' ? '#fff' : '#1e1e1e',
          // bgcolor: 'red',
          boxSizing: 'content-box',
          borderRadius: '13px',
          padding: '4px',
          '&:hover': {
            bgcolor: theme => theme.palette.mode === 'light' ? 'grey.200' : 'grey.700'
          }
        }}></ModeEditOutlineIcon>
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
    // </div>
  )
}

export default Card