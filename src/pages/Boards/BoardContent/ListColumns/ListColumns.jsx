import { useState, useRef } from 'react'
import Box from '@mui/system/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumns({ columns }) {
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
      e.preventDefault()
      const x = e.pageX
      const dx = x - startX
      ele.scrollLeft = scrollLeft - dx
    }
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
          <Column key={column._id} column_data={column}/>
        )}

        <Box sx={{
          bgcolor: '#ffffff1d',
          mx: 2,
          minWidth: '200px',
          maxWidth: '200px',
          height: 'fit-content',
          borderRadius: '8px'
        }}>
          <Button sx={{
            width: '100%',
            color: 'white',
            justifyContent: 'flex-start' }} startIcon={<AddIcon />}>Add another list</Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns