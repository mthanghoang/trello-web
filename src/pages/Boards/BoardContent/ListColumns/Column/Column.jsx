import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Divider from '@mui/material/Divider'
import Cloud from '@mui/icons-material/Cloud'
import AddIcon from '@mui/icons-material/Add'
import AddCardIcon from '@mui/icons-material/AddCard'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { Button, ListItemIcon, ListItemText, Tooltip } from '@mui/material'
import ListCards from './ListCards/ListCards'

// const COLUMN_HEADER_HEIGHT = '50px'
// const COLUMN_FOOTER_HEIGHT = '56px'

function Column() {
  // MENU DROPDOWN
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <Box sx={{
      minWidth: '300px',
      maxWidth: '300px',
      bgcolor: 'grey.100',
      ml: 2,
      borderRadius: '6px',
      height: 'fit-content',
      maxHeight: (theme) => `calc(${theme.custom.boardContentHeight} - ${theme.spacing(5)})`
    }}
    onMouseDown={(e) => e.stopPropagation()}
    >
      {/* HEADER */}
      <Box sx={{
        height: (theme) => theme.custom.columnHeaderHeight,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant='h7' sx={{
          fontWeight: 'bold',
          cursor: 'pointer',
          color: 'grey.700'
        }}>
          List Title</Typography>
        <Tooltip title='More options'>
          <MoreHorizIcon
            fontSize='small'
            sx={{
              color: 'grey.700',
              cursor: 'pointer',
              borderRadius: '6px',
              '&:hover': { bgcolor: 'grey.300' }
            }}
            id="basic-column-dropdown"
            aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick} />
        </Tooltip>
        <Menu
          id="basic-menu-column-dropdown"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-column-dropdown'
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <AddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add new card</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>Paste</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <DeleteForeverIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Remove this column</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Cloud fontSize="small" />
            </ListItemIcon>
            <ListItemText>Archive this column</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      {/* LIST CARDs */}
      <ListCards />

      {/* FOOTER */}
      <Box sx={{
        height: (theme) => theme.custom.columnFooterHeight,
        py: 2,
        px: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Button sx={{
          flexGrow: 1,
          justifyContent: 'flex-start'
        }}
        startIcon={<AddCardIcon />}>
          Add a card
        </Button>
        <Tooltip title='Drag to move'>
          <DragHandleIcon sx={{
            cursor: 'pointer',
            color: 'grey.700',
            borderRadius: '6px',
            '&:hover': { bgcolor: 'grey.300' } }} />
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Column