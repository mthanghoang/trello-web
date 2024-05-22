import { createBrowserRouter } from 'react-router-dom'
import ListBoards from '~/pages/Boards'
import Board from '~/pages/Boards/_id'
import Authentication from '~/pages/Authentication/Authentication'

const Router = createBrowserRouter([
  { path: '/boards', element: <ListBoards /> },
  { path: '/boards/:id', element: <Board /> },
  { path: '/', element: <Authentication /> }
])

export default Router