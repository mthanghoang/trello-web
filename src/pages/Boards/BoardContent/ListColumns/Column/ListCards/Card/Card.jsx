import GroupIcon from '@mui/icons-material/Group'
import AttachmentIcon from '@mui/icons-material/Attachment'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

function Card({ noMedia }) {
  if (noMedia) {
    return (
      <MuiCard sx={{
        cursor: 'pointer',
        boxShadow: '0 2px 2px rgba(0, 0, 0, 0.3)',
        overflow: 'unset'
      }}>
        <CardContent sx={{
          p: 1.5,
          '&:last-child': { p: 1.5 }
        }}>
          <Typography>Card 01</Typography>
        </CardContent>
      </MuiCard>
    )
  }
  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 2px 2px rgba(0, 0, 0, 0.3)',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="green iguana"
      />
      <CardContent sx={{
        p: 1.5,
        '&:last-child': { p: 1.5 }
      }}>
        <Typography>MERN Stack</Typography>
      </CardContent>
      <CardActions sx={{
        p: '0 4px 8px 4px'
      }}>
        <Button sx={{ color: 'text.primary' }} size="small" startIcon={<GroupIcon />}>12</Button>
        <Button sx={{ color: 'text.primary' }} size="small" startIcon={<ModeCommentIcon />}>15</Button>
        <Button sx={{ color: 'text.primary' }} size="small" startIcon={<AttachmentIcon />}>10</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card