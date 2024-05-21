import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

function BoardCard({ board }) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/boards/${board._id}`)
  }
  return (
    <Card sx={{
      transition: 'transform 0.3s ease-in-out, backgroundColor 0.3s ease-in-out', // add transition for backgroundColor
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        transform: 'scale(1.02)',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)'
      }
    }}
    onClick={() => handleClick()}
    >
      <CardMedia
        component="img"
        height="100"
        image="/eberhard-grossgasteiger-j1I4HP4y_qg-unsplash.jpg"
        sx={{ backgroundSize: 'cover' }}
      />
      <CardContent sx={{ p: 1 }}>
        <Typography variant="body1" component="div" sx={{
          fontWeight: 700,
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2
        }}>
          {board.title}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default BoardCard