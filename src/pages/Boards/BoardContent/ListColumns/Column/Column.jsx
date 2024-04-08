import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
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
import { Button, ListItemIcon, ListItemText } from '@mui/material'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorters'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import theme from '~/theme'


function Column({ column_data }) {

  // DRAG AND DROP
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column_data._id,
    data: { ...column_data } //bỏ dòng này đi vẫn chạy được
  })

  const dndKitColumnStyle = {
    // transform: CSS.Transform.toString(transform),
    //dùng transform hình dáng cột sẽ bị stretched hoặc shrinked
    // https://github.com/clauderic/dnd-kit/issues/117
    transform: CSS.Translate.toString(transform),
    transition,
    userSelect: 'none',
    height: '100%',
    opacity: isDragging ? 0.2 : undefined
  }

  // CARDS ORDERING
  const orderedCards = mapOrder(column_data?.cards, column_data?.cardOrderIds, '_id')

  // MENU DROPDOWN
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  // Add new card
  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
  const [newCardTitle, setNewCardTitle] = useState('')
  const addNewCard = () => {
    if (!newCardTitle) return
    // Gọi API dưới đây
    // ....
    console.log(newCardTitle)
    // clear input and close toggle
    setNewCardTitle('')
    toggleNewCardForm()
  }
  return (
    <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
      <Box
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: 'grey.100',
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.custom.boardContentHeight} - ${theme.spacing(5)})`
        }}
        onMouseDown={(e) => {e.stopPropagation()}}
      >
        {/* HEADER */}
        <Box {...listeners} sx={{
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
            {column_data?.title}</Typography>
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
        <ListCards cards={orderedCards} openNewCardForm/>

        {/* FOOTER */}
        <Box sx={{
          height: (theme) => theme.custom.columnFooterHeight,
          // display: 'flex',
          // alignItems: 'center',
          // py: 2,
          px: '6px'
        }}>
          {!openNewCardForm
            ?
            <Box sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Button sx={{
                flexGrow: 1,
                justifyContent: 'flex-start'
              }}
              startIcon={<AddCardIcon />}
              onClick={toggleNewCardForm}>
                Add a card
              </Button>
              <DragHandleIcon {...listeners} sx={{
                cursor: 'grabbing',
                color: 'grey.700',
                borderRadius: '6px',
                '&:hover': { bgcolor: 'grey.300' } }} />
            </Box>
            :
            <Box sx={{
              // maxWidth: '250px',
              // minWidth: '250px',
              width: '100%',
              py: 1,
              // borderRadius: '8px',
              height: 'fit-content',
              bgcolor: '#ffffff1d',
              display: 'flex',
              justifyContent: 'space-between',
              // flexDirection: 'column',
              gap: 1
            }} onMouseDown={(e) => e.stopPropagation()}>
              <TextField
                id="outlined-search"
                label="Enter card title..."
                variant="outlined"
                size='small'
                type='text'
                autoFocus
                // multiline
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{
                  width: '100%',
                  '& label': { color: 'grey.500' },
                  '& label.Mui-focused': { color: 'grey.500' },
                  '& input': { color: theme => theme.palette.mode === 'light' ? 'text.primary' : 'primary.main'},
                  // '& textarea': { color: 'white' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'grey.500' },
                    '&:hover fieldset': { borderColor: 'grey.500' },
                    '&.Mui-focused fieldset': { borderColor: 'grey.500' }
                  }
                }} />
              {/* Dưới này là box chứa nút Add và nút X */}
              <Box sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '4px'
              }}>
                <Button
                  sx={{
                    height: '32px',
                    color: 'white',
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark'
                    }
                  }}
                  variant='outlined'
                  onClick={addNewCard}>Add card
                </Button>
                <CloseIcon
                  // fontSize='medium'
                  sx={{
                    boxSizing: 'content-box',
                    color: 'grey.600',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    padding: '4px',
                    '&:hover': {
                      bgcolor: 'grey.400'
                    } }}
                  onClick={() => {
                    toggleNewCardForm(),
                    setNewCardTitle('')
                  }}
                />
              </Box>
            </Box>
          }
        </Box>
      </Box>
    </div>
  )
}

export default Column