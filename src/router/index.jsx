import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom'
import ListBoards from '~/pages/Boards'
import Board from '~/pages/Boards/_id'
import Authentication from '~/pages/Authentication/Authentication'

const ProtectedRoutes = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user) {
    return <Navigate to="/login" replace={true} />
  }
  return <Outlet />
}

const UnauthorizedRoutes = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    return <Navigate to="/boards" replace={true} />
  }
  return <Outlet />
}

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace={true} />
  },
  {
    element: <ProtectedRoutes />, children: [
      { path: '/boards', element: <ListBoards /> },
      { path: '/boards/:id', element: <Board /> }
    ]
  },
  {
    element: <UnauthorizedRoutes />, children: [
      { path: '/login', element: <Authentication /> }
    ]
  },
  { path: '/login', element: <Authentication /> }
])

export default Router