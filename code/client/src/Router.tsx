import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BasePage } from './pages/BasePage';
import Home from './pages/home/main';
import Document from './pages/document/main';
import Login from './pages/login/main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasePage />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/document/:docId',
    element: <Document />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
