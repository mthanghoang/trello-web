import ModeSelect from '~/components/ModeSelect'
import Box from '@mui/system/Box'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Profile from './Menus/Profile'
import More from './Menus/More'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'

function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.custom.appBarHeight,
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'space-between',
      // gap: 2,
      // overflowX: 'auto',
      backgroundColor: 'primary.dark',
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AppsIcon sx={{ color: 'white' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon
              component={TrelloIcon}
              inheritViewBox
              sx={{ color: 'white' }}
              fontSize='small' />
            <Typography
              variant='span'
              sx={{
                fontSize: '1.2rem',
                fontWeight: '500',
                color: 'white'
              }}>
            Trello</Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}><Workspaces /></Box>
          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}><Recent /></Box>
          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' } }}><Starred /></Box>
          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex' } }}><Templates /></Box>
          <Box sx={{ display: { lg: 'flex', xl: 'none' } }}>
            <More />
          </Box>
          <Button
            startIcon={<LibraryAddIcon />}
            variant='outlined'
            sx={{
              color: 'white',
              border: 'none',
              '&:hover': { border: 'none' },
              display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }
            }}>
            Create
          </Button>
          <IconButton sx={{ display: { md: 'flex', lg: 'none' } }}>
            <LibraryAddIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2
        }}>
          <TextField
            id="outlined-search"
            label="Search"
            variant="outlined"
            size='small'
            type='text'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon sx={{ color: 'white' }}/>
                </InputAdornment>
              ),
              endAdornment: (
                <CloseIcon
                  fontSize='small'
                  sx={{ display: searchValue ? 'inline-block' : 'none', color: 'white', cursor: 'pointer' }}
                  onClick={() => setSearchValue('')}
                />
              )
            }}
            sx={{
              minWidth: 120,
              maxWidth: 200,
              '& label': { color: 'white' },
              '& input': { color: 'white' },
              '& label.Mui-focused': { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              }
            }} />
          <ModeSelect />
          <Tooltip title="Notifications">
            <Badge sx={{ cursor: 'pointer' }} color="warning" variant="dot">
              <NotificationsNoneIcon sx={{ color: 'white' }}/>
            </Badge>
          </Tooltip>
          <Tooltip title='Help'>
            <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
          </Tooltip>
          <Profile />
        </Box>
      </Box>
    </Box>
  )
}

export default AppBar
