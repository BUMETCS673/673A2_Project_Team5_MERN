import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BasePage } from './pages/BasePage';
import Home from './pages/home/main';
import Document from './pages/document/main';
import Login from './pages/login/main';
import RequireAuth from './components/RequireAuth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasePage />,
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
