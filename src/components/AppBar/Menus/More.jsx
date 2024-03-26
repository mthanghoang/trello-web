import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/system/Box'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import React from 'react'
import Typography from '@mui/material/Typography'

function More() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Button sx={{ color: 'white' }}
        id="basic-button-recent"
        aria-controls={open ? 'basic-menu-recent' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        More
      </Button>
      <Menu
        id="basic-menu-recent"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-recent'
        }}
      >
        <MenuItem
          sx={{
            paddingX: 1,
            display: { lg: 'flex', xl: 'none' },
            justifyContent:'space-between'
          }}
          onClick={handleClose}>
          <Typography textAlign='left'>Templates</Typography>
          <ChevronRightIcon sx={{ ml: 1 }}/>
        </MenuItem>
        <MenuItem
          sx={{
            paddingX: 1,
            display: { md: 'flex', lg: 'none' },
            justifyContent: 'space-between'
          }}
          onClick={handleClose}>
          <Typography textAlign='left'>Starred</Typography>
          <ChevronRightIcon sx={{ ml: 1 }} />
        </MenuItem>
        <MenuItem
          sx={{
            paddingX: 1,
            display: { sm: 'flex', md: 'none' },
            justifyContent: 'space-between'
          }}
          onClick={handleClose}>
          <Typography textAlign='left'>Recent</Typography>
          <ChevronRightIcon sx={{ ml: 1 }} />
        </MenuItem>
        <MenuItem
          sx={{
            paddingX: 1,
            display: { xs: 'flex', sm: 'none' },
            justifyContent: 'space-between'
          }}
          onClick={handleClose}>
          <Typography textAlign='left'>Workspaces</Typography>
          <ChevronRightIcon sx={{ ml: 1 }} />
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default More