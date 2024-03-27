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
import GroupIcon from '@mui/icons-material/Group'
import AttachmentIcon from '@mui/icons-material/Attachment'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import { Button, ListItemIcon, ListItemText, Tooltip } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

function BoardContent() {
  const COLUMN_HEADER_HEIGHT = '50px'
  const COLUMN_FOOTER_HEIGHT = '56px'

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  return (
    <Box sx={{
      backgroundColor: 'primary.main',
      width: '100%',
      height: (theme) => theme.custom.boardContentHeight,
      padding: '0 0 10px 0'
    }}>
      <Box sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {/* Column 01*/}
        <Box sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: 'grey.100',
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.custom.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/* HEADER */}
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
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
              Column Title</Typography>
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

          {/* LIST CARD */}
          <Box sx={{
            p: '0 5px',
            m: '0 2px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            paddingBottom: '2px',
            maxHeight: (theme) => `calc(
              ${theme.custom.boardContentHeight} - ${theme.spacing(5)} -
              ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ced0da',
              borderRadius: '8px'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#bfc2cf'
            }
          }}>
            <Card sx={{
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
            </Card>
            <Card sx={{
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
            </Card>
            <Card sx={{
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
            </Card>
            <Card sx={{
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
            </Card>
            <Card sx={{
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
            </Card>
            <Card sx={{
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
            </Card>
            <Card sx={{
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
            </Card>
            <Card sx={{
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
            </Card>
            <Card sx={{
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
            </Card>
            <Card sx={{
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
            </Card>
            <Card sx={{
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
            </Card>
          </Box>

          {/* FOOTER */}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
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
              <DragHandleIcon sx={{ cursor: 'pointer', color: 'grey.700' }} />
            </Tooltip>
          </Box>
        </Box>

        {/* Column 02 */}
        <Box sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: 'grey.100',
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.custom.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/* HEADER */}
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
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
              Column Title</Typography>
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

          {/* LIST CARD */}
          <Box sx={{
            p: '0 5px',
            m: '0 5px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            paddingBottom: '2px',
            maxHeight: (theme) => `calc(
              ${theme.custom.boardContentHeight} - ${theme.spacing(5)} -
              ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ced0da',
              borderRadius: '8px'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#bfc2cf'
            }
          }}>
            <Card sx={{
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
            </Card>
            <Card sx={{
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
            </Card>
          </Box>

          {/* FOOTER */}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
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
              <DragHandleIcon sx={{ cursor: 'pointer', color: 'grey.700' }} />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardContent
