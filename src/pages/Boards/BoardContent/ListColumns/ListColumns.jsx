import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/system/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumns({ columns, createNewColumn, createNewCard, deleteColumn }) {
  // DRAG SCREEN TO SCROLL HORIZONTALLY
  const myRef = useRef()
  const ele = myRef.current
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  const handleMouseDown = (event) => {
    setIsDown(true)
    setStartX(event.pageX)
    setScrollLeft(ele.scrollLeft)
  }
  const handleMouseUp = () => setIsDown(false)

  const handleMouseLeave = () => setIsDown(false)

  const handleMouseMove = (e) => {
    if (isDown) {
      // e.preventDefault()
      const x = e.pageX
      const dx = x - startX
      ele.scrollLeft = scrollLeft - dx
    }
  }
  // Add new list (column)
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  // về sau nhiều form có thể dùng react-hook-form
  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please enter list title')
      return
    }

    // Gọi API create new column
    const newColumnData = {
      title: newColumnTitle
    }
    /**
     * gọi lên props function createNewColumn nằm ở component cha cao nhất (boards/_id.jsx)
     * về sau có thể đưa dữ liệu Board ra ngoài Redux Global Store
     * và có thể gọi luôn API ở đây thay vì gọi ngược nhiều cấp lên component cao nhất
     */
    // dùng await khi nào cần hứng kết quả sau khi gọi để làm gì đấy
    // (hoặc .then .catch)
    // trong trg hợp này dùng để tránh flickering giao diện
    await createNewColumn(newColumnData)
    // clear input and close toggle
    toggleNewColumnForm()
    setNewColumnTitle('')
  }
  return (
    /**
     * SortableContext expects items props to be of the following type: ['id1','id2'],
     * not array of objects [{id: 'id1'}, {id: 'id2'}].
     * In the latter case it still works but there is no animation
     * https://github.com/clauderic/dnd-kit/issues/183#issuecomment-812569512
     */
    <SortableContext items={columns.map(c => c._id)}
      strategy={horizontalListSortingStrategy}>
      <Box sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}
      ref={myRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      >
        {/* Columns are displayed here */}
        {columns?.map(column =>
          <Column
            key={column._id}
            column_data={column}
            createNewCard={createNewCard}
            deleteColumn={deleteColumn}/>
        )}

        {/* Add new list button here */}
        {
          !openNewColumnForm
            ?
            <Box sx={{
              bgcolor: '#ffffff1d',
              mx: 2,
              minWidth: '200px',
              maxWidth: '200px',
              height: 'fit-content',
              borderRadius: '8px',
              '&:hover': { bgcolor: '#ffffff2d' }
            }} onMouseDown={(e) => e.stopPropagation()}>
              <Button
                sx={{
                  width: '100%',
                  color: 'white',
                  justifyContent: 'flex-start' }}
                startIcon={<AddIcon />}
                onClick={toggleNewColumnForm}
              >Add another list</Button>
            </Box>
            :
            <Box sx={{
              maxWidth: '250px',
              minWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: '8px',
              height: 'fit-content',
              bgcolor: '#ffffff1d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }} onMouseDown={(e) => e.stopPropagation()}>
              <TextField
                id="outlined-search"
                label="Enter list title..."
                variant="outlined"
                size='small'
                type='text'
                autoFocus
                multiline
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                sx={{
                  '& label': { color: 'white' },
                  '& input': { color: 'white' },
                  '& textarea': { color: 'white' },
                  '& label.Mui-focused': { color: 'white' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' }
                  }
                }} />
              {/* Dưới này là box chứa nút Add và nút X */}
              <Box sx={{
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
                  onClick={addNewColumn}>Add list
                </Button>
                <CloseIcon
                  // fontSize='medium'
                  sx={{
                    boxSizing: 'content-box',
                    color: 'white',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    padding: '4px',
                    '&:hover': {
                      bgcolor: 'primary.light'
                    } }}
                  onClick={() => {
                    toggleNewColumnForm(),
                    setNewColumnTitle('')
                  }}
                />
              </Box>
            </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns