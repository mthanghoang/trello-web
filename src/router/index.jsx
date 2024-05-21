import { createBrowserRouter } from 'react-router-dom'
import ListBoards from '~/pages/Boards'
import Board from '~/pages/Boards/_id'

const Router = createBrowserRouter([
  { path: '/boards', element: <ListBoards /> },
  { path: '/boards/:id', element: <Board /> }
])

export default Router