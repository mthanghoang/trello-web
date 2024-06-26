import Box from '@mui/system/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PublicIcon from '@mui/icons-material/Public'
import { capitalizeFirstLetter } from '~/utils/formatters'
import { useSelector } from 'react-redux'
import { boardSelector } from '~/redux/selectors'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { boardSlice } from '~/redux/Board/boardSlice'
import { removeExtraSpaces } from '~/utils/formatters'
import { TextField } from '@mui/material'
import { updateBoardDetailsAPI } from '~/apis'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import CheckIcon from '@mui/icons-material/Check'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

const CHIP_STYLES = {
  color: 'white',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': { //'.MuiSvgIcon-root also works'
    color: 'white'
  },
  '&:hover': {
    backgroundColor: 'primary.dark'
  }
}
function BoardBar() {
  const board = useSelector(boardSelector)
  const dispatch = useDispatch()

  // MENU DROPDOWN for changing Board visibility
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleEditBoardVisibility = (type) => {
    dispatch(boardSlice.actions.editBoardInfo({
      type: type,
      title: board.title,
      description: board.description
    }))
    handleClose()
    // API CALL
    updateBoardDetailsAPI(board._id, { type: type })
  }

  // Edit Board Title
  const [isEditable, setIsEditable] = useState(false)
  const [boardTitle, setBoardTitle] = useState(board.title)
  const toggleClickToEdit = () => {
    setIsEditable(!isEditable)
  }
  const handleEditBoardTitle = async () => {
    const title = removeExtraSpaces(boardTitle)
    if (!title) {
      setBoardTitle(board.title)
      return
    }

    setBoardTitle(title)

    if (title !== board.title) {
      // Update redux store
      dispatch(boardSlice.actions.editBoardInfo({
        title: title,
        type: board.type,
        description: board.description
      }))

      // API CALL
      await updateBoardDetailsAPI(board._id, {
        title: title
      })
      return
    }
  }
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.custom.boardBarHeight,
      backgroundColor: 'primary.main',
      padding: '0 16px 2px 16px'
    }}>
      <Box sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {!isEditable
            ? <Chip
              sx={CHIP_STYLES}
              icon={<DashboardIcon />}
              label={board?.title}
              clickable
              onClick={toggleClickToEdit}
            />
            : <TextField
              variant="outlined"
              size='small'
              type='text'
              autoFocus
              inputProps={{ maxLength: 256 }}
              onFocus={e => e.target.select()}
              value={boardTitle}
              onInput={(e) => setBoardTitle(e.target.value)}
              onBlur={() => {
                toggleClickToEdit()
                handleEditBoardTitle()
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  e.target.blur()
                }
              }}
              sx={{
                minWidth: '200px',
                // '& input': { color: 'grey.700', fontWeight: 'bold', fontSize: '1rem' },
                '& .MuiOutlinedInput-root': {
                  // py: '8px',
                  py: '0px',
                  '& textarea': { color: 'white', fontSize: '0.8125rem' },
                  '& fieldset': { border: '1px solid #3498db !important', borderRadius: '8px' },
                  '&:hover fieldset': { border: '2px solid #3498db !important', borderRadius: '8px' },
                  '&.Mui-focused fieldset': { border: '2px solid #3498db !important', borderRadius: '8px' }
                }
              }}
            />}
          <Chip
            sx={CHIP_STYLES}
            icon={board?.type === 'public' ? <PublicIcon /> : <VpnLockIcon />}
            label={capitalizeFirstLetter(board?.type)}
            clickable
            aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={e => handleClick(e)}
          />
          <Menu
            id="basic-menu-column-dropdown"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-column-dropdown'
            }}
          >
            <MenuItem onClick={() => {
              handleEditBoardVisibility('public')
              handleClose()
            }}>
              {board.type === 'public'
              && <ListItemIcon><CheckIcon fontSize='small' /></ListItemIcon>}
              <ListItemText>Public</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => {
              handleEditBoardVisibility('private')
              handleClose()
            }}>
              {board.type === 'private'
              && <ListItemIcon><CheckIcon fontSize='small' /></ListItemIcon>}
              <ListItemText>Private</ListItemText>
            </MenuItem>
          </Menu>
          <Chip
            sx={CHIP_STYLES}
            icon={<AddToDriveIcon />}
            label='Add To Google Drive'
            clickable
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            sx={{
              color: 'white',
              borderColor: 'white',
              backgroundColor: 'transparent',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'primary.dark'
              }
            }}
            startIcon={<PersonAddIcon />}
            variant='outlined'>Invite</Button>
          <AvatarGroup
            max={4}
            sx={{
              '& .MuiAvatar-root': {
                width: 30,
                height: 30,
                fontSize: 14,
                border: 'none',
                color: 'white',
                cursor: 'pointer'
              }
            }}
          >
            <Tooltip title='Remi Sharp'>
              <Avatar
                src="https://img.freepik.com/free-psd/
                    3d-illustration-person-with-sunglasses_23-2149436188.jpg?
                    t=st=1711453365~exp=1711456965~hmac=
                    b755f36cad78bd33ca60b69bf1f14236890669ffb03e98677c
                    4d3d034eed5194&w=826" />
            </Tooltip>
            <Tooltip title='Remi Sharp'>
              <Avatar
                src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?t=st=1711453706~exp=1711457306~hmac=f25c32b1e7403805cf07788748aba47b44e022abf36bbe3a5cd86fc6f9b6fe7e&w=826" />
            </Tooltip>
            <Tooltip title='Remi Sharp'>
              <Avatar
                src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671134.jpg?t=st=1711453764~exp=1711457364~hmac=6d8800f7bc0933d45e020be63388d3c51abf09f0854d3175dbbd4e3300ccebeb&w=826" />
            </Tooltip>
            <Tooltip title='Remi Sharp'>
              <Avatar
                src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671134.jpg?t=st=1711453764~exp=1711457364~hmac=6d8800f7bc0933d45e020be63388d3c51abf09f0854d3175dbbd4e3300ccebeb&w=826" />
            </Tooltip>
            <Tooltip title='Remi Sharp'>
              <Avatar
                src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671134.jpg?t=st=1711453764~exp=1711457364~hmac=6d8800f7bc0933d45e020be63388d3c51abf09f0854d3175dbbd4e3300ccebeb&w=826" />
            </Tooltip>
          </AvatarGroup>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardBar
