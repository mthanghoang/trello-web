import { useState, useRef } from 'react'
import Box from '@mui/system/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

function ListColumns() {
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
      {/* Column 01*/}
      <Column />
      {/* Column 2 */}
      <Column />
      <Column />
      <Column />

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
  )
}

export default ListColumns