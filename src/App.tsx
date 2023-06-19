import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import BlogPage from "./pages/BlogPage";
import RootLayout from "./pages/Root";
import UserPage from "./features/users/UserPage";
import UsersList from "./features/users/UsersList";
import NewPost from "./pages/AddNewPost";
import SinglePostPage from "./pages/SinglePostPage";

import EditPost from "./pages/EditPost";
import SearchPage from "./pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <BlogPage /> },
      { path: "/post/new", element: <NewPost /> },
      { path: "/post/:postId", element: <SinglePostPage /> },
      { path: "/post/edit/:postId", element: <EditPost /> },
      { path: "/search", element: <SearchPage /> },
      {
        path: "/users",
        element: <UsersList />,
      },
      { path: "/users/:userId", element: <UserPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
