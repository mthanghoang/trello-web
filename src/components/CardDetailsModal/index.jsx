import { useState } from 'react'
import Box from '@mui/material/Box'
import PaymentIcon from '@mui/icons-material/Payment'
import DescriptionIcon from '@mui/icons-material/Description'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'

import { Button, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { boardSlice } from '~/redux/Board/boardSlice'
import { updateCardDetailsAPI } from '~/apis'
import { removeExtraSpaces } from '~/utils/formatters'

function CardDetailsModal({ card_data, column_data }) {
  const dispatch = useDispatch()
  // Edit Card
  const [cardTitle, setCardTitle] = useState(card_data?.title)
  const [cardDescription, setCardDescription] = useState(card_data?.description)
  const [openEditDescription, setOpenEditDescription] = useState(false)

  const handleEditCardTitle = async () => {
    const title = removeExtraSpaces(cardTitle)
    if (!title) {
      setCardTitle(card_data.title)
      return
    }

    setCardTitle(title)

    if (title !== card_data.title) {
      // Update Redux store
      dispatch(boardSlice.actions.updateCard({
        card: card_data,
        title: title
      }))
      // API call
      await updateCardDetailsAPI(card_data._id, {
        title: title
      })
      return
    }
  }

  const toggleEditDescription = () => setOpenEditDescription(!openEditDescription)
  const handleEditCardDescription = () => {
    if (!cardDescription) {
      setCardDescription(card_data?.description)
      return
    }

    if (cardDescription !== card_data?.description) {
      // Update Redux store
      dispatch(boardSlice.actions.updateCard({
        card: card_data,
        description: cardDescription
      }))
      return
    }
  }


  return (
    <Box onClick={(e) => e.stopPropagation()} sx={{
      bgcolor: '#f1f2f4',
      padding: 2,
      width: '70%',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    }}>
      {/* TITLE */}
      <Box sx={{
        display: 'flex',
        width: '100%'
      }}>
        <PaymentIcon fontSize='medium' sx={{ color: '#44546f' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <TextField
            id="outlined-search"
            variant="outlined"
            size='small'
            type='text'
            multiline
            inputProps={{ maxLength: 256 }}
            onBlur={() => {
              handleEditCardTitle()
            }}
            data-no-dnd="true"
            value={cardTitle}
            // onChange={(e) => setColumnTitle(e.target.value)}
            onInput={(e) => setCardTitle(e.target.value)}
            sx={{
              width: '100%',
              ml: '4px',
              '& .MuiOutlinedInput-root': {
                px: '4px',
                pt: '2px',
                pb: '4px',
                '& textarea': { color: 'grey.700', fontWeight: 'bold', fontSize: '1.25rem' },
                '& fieldset': {
                  border: 'none'
                  // borderRadius: '8px'
                },
                '&.Mui-focused fieldset': { border: '2px solid #3498db !important', borderRadius: '8px' }
              }
            }} />
          <Typography
            sx={{ color: '#000', ml: 1, overflowWrap: 'anywhere' }}
            variant='body1'>in list <b>{column_data?.title}</b></Typography>
        </Box>
      </Box>

      {/* DESCRIPTION */}
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DescriptionIcon fontSize='medium' sx={{ color: '#44546f' }} />
          <Typography sx={{
            fontWeight: 500,
            color: 'grey.600',
            ml: 1
          }} variant='subtitle1'>
          Description</Typography>
        </Box>
        {!card_data.description && (
          <>
            <Button sx={{
              display: openEditDescription ? 'none' : 'inline-flex',
              height: '56px',
              flexGrow: 1,
              bgcolor: '#bdc3c7',
              '&:hover': { bgcolor: 'grey.300' }
            }}
            onClick={toggleEditDescription}
            >
              Add a more detailed description...
            </Button>
            {openEditDescription && (
              <>
                <TextField
                  size='small'
                  type='text'
                  autoFocus
                  multiline
                  value={cardDescription}
                  onChange={(e) => setCardDescription(e.target.value)}
                  sx={{
                    width: '100%',
                    '& label': { color: 'grey.500' },
                    '& label.Mui-focused': { color: 'grey.500' },
                    '& textarea': { color: theme => theme.palette.mode === 'light' ? 'text.primary' : 'primary.main' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'grey.500' },
                      '&:hover fieldset': { borderColor: 'grey.500' },
                      '&.Mui-focused fieldset': { borderColor: 'grey.500' }
                    }
                  }} />

                {/* Box chứa nút Save và Cancel */}
                <Box sx={{
                  mt: '4px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
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
                    // data-no-dnd="true"
                    variant='outlined'
                    onClick={() => {
                      handleEditCardDescription()
                      toggleEditDescription()
                    }}>Save
                  </Button>
                  <CloseIcon
                    sx={{
                      boxSizing: 'content-box',
                      color: 'grey.600',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      padding: '4px',
                      '&:hover': {
                        bgcolor: 'grey.400'
                      } }}
                    onClick={() => {toggleEditDescription()}}
                  />
                </Box>
              </>
            )}
          </>
        )}

        {card_data.description && (
          <>
            <Box sx={{ }}>
              <Typography
                sx={{
                  // bgcolor: 'red',
                  display: openEditDescription ? 'none' : 'block',
                  color: '#000', overflowWrap: 'anywhere',
                  ml: 4
                }}
              >{cardDescription}</Typography>
              <Button
                sx={{
                  display: openEditDescription ? 'none' : 'inline-flex',
                  ml: '30px'
                }}
                variant='contained'
                size='small'
                onClick={toggleEditDescription}
              >Edit</Button>
            </Box>
            {openEditDescription && (
              <>
                <TextField
                  variant="outlined"
                  size='small'
                  type='text'
                  autoFocus
                  multiline
                  value={cardDescription}
                  onChange={(e) => setCardDescription(e.target.value)}
                  sx={{
                    width: '100%',
                    '& label': { color: 'grey.500' },
                    '& label.Mui-focused': { color: 'grey.500' },
                    '& textarea': { color: theme => theme.palette.mode === 'light' ? 'text.primary' : 'primary.main' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'grey.500' },
                      '&:hover fieldset': { borderColor: 'grey.500' },
                      '&.Mui-focused fieldset': { borderColor: 'grey.500' }
                    }
                  }} />

                {/* Box chứa nút Save và Cancel */}
                <Box sx={{
                  mt: '4px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
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
                    onClick={() => {
                      handleEditCardDescription()
                      toggleEditDescription()
                    }}>Save
                  </Button>
                  <CloseIcon
                    sx={{
                      boxSizing: 'content-box',
                      color: 'grey.600',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      padding: '4px',
                      '&:hover': {
                        bgcolor: 'grey.400'
                      } }}
                    onClick={() => {toggleEditDescription()}}
                  />
                </Box>
              </>
            )}
          </>
        )}
      </Box>

    </Box>
  )
}

export default CardDetailsModal