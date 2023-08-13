import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout';
import AllBooks from '../pages/AllBooks';
import BookDetails from '../pages/BookDetails';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

const router = createBrowserRouter([
  {
    id: 'index',
    path: '/',
    element: <Layout />,
    children: [
      {
        id: 'home',
        path: '/',
        element: <Home />
      },
      {
        id: 'all-books',
        path: '/all-books',
        element: <AllBooks />
      },
      {
        id: 'book-details',
        path: '/books/:id',
        element: <BookDetails />
      }
    ]
  },
  {
    id: '/login',
    path: '/login',
    element: <Login />
  },
  {
    id: 'register',
    path: '/register',
    element: <Register />
  }
]);

export default router;
