import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './pages/home/main';
import Document from './pages/document/main';
import Login from './pages/login/main';
import RequireAuth from './components/RequireAuth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />, // Redirect the root path to /login
  },
  {
    path: '/home',
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: '/document/:docId',
    element: (
      <RequireAuth>
        <Document />
      </RequireAuth>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
