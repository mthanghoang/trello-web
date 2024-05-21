import { RouterProvider } from 'react-router-dom'
import Router from './router'
import { Container } from '@mui/material'

function App() {
  return (
    <>
      {/* React Router Dom /boards /boards/{board_id} */}
      {/* <Board /> */}
      {/* <ListBoards /> */}
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <RouterProvider router={Router} />
      </Container>
    </>
  )
}

export default App
