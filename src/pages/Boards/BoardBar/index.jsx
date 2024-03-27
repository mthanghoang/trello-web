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
  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.custom.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      backgroundColor: 'primary.main',
      borderBottom: '1px solid white'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={CHIP_STYLES}
          icon={<DashboardIcon />}
          label='MERN Stack Board'
          clickable
        />
        <Chip
          sx={CHIP_STYLES}
          icon={<VpnLockIcon />}
          label='Public/Private Workspace'
          clickable
        />
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
  )
}

export default BoardBar
