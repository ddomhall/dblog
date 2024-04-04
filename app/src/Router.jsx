import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Feed from './Feed.jsx'
import Search from './Search.jsx'
import User from './User.jsx'
import Post from './Post.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import Create from './Create.jsx'
import Comment from './Comment.jsx'
import Conversations from './Conversations.jsx'

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'search',
          element: <Search />
        },
        {
          path: 'users/:id',
          element: <User />
        },
        {
          path: 'posts/:id',
          element: <Post />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'signup',
          element: <Signup />
        },
        {
          path: 'create',
          element: <Create />
        },
        {
          path: 'comments/:id',
          element: <Comment />
        },
        {
          path: 'conversations/:id',
          element: <Conversations />
        },
        {
          path: 'conversations',
          element: <Conversations />
        },
        {
          index: true,
          element: <Feed />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

