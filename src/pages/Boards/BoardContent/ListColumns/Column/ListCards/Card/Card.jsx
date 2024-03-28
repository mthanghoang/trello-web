import GroupIcon from '@mui/icons-material/Group'
import AttachmentIcon from '@mui/icons-material/Attachment'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

function Card({ card_data }) {
  const renderCardActions = () => {
    return !!card_data?.memberIds?.length || !!card_data?.comments?.length || !!card_data?.attachments?.length
  }
  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 2px 2px rgba(0, 0, 0, 0.3)',
      overflow: 'unset'
    }}>
      {card_data?.cover &&
        <CardMedia
          sx={{ height: 140 }}
          image={card_data?.cover}
        />
      }
      <CardContent sx={{
        p: 1.5,
        '&:last-child': { p: 1.5 }
      }}>
        <Typography>{card_data?.title}</Typography>
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
  )
}

export default Card