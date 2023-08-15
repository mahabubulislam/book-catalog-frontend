import { createBrowserRouter } from 'react-router-dom';
import Protected from '../HOC/Protected';
import Layout from '../Layout';
import AddNewBook from '../pages/AddNewBook';
import AllBooks from '../pages/AllBooks';
import BookDetails from '../pages/BookDetails';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ReadingList from '../pages/ReadingList';
import Register from '../pages/Register';
import Wishlist from '../pages/Wishlist';

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
        id: 'add-book',
        path: '/add-new-book',
        element: (
          <Protected>
            <AddNewBook />
          </Protected>
        )
      },
      {
        id: 'wishlist',
        path: '/wishlist',
        element: (
          <Protected>
            <Wishlist />
          </Protected>
        )
      },
      {
        id: 'reading-list',
        path: '/reading-list',
        element: (
          <Protected>
            <ReadingList />
          </Protected>
        )
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
