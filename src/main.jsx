import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddPost, AllPost, AuthLayout, Home, Login, SignUp, Success, Failure, Profile } from './components/index.js';
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/",
        element: <Home />
      },
      {
        path : "/login",
        element: (
         <AuthLayout authentication={false}>
          <Login />
         </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element:(
          <AuthLayout authentication= {false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            {" "}
          <AllPost />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element:(
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost/>
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: (
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        )
      },

      {
        path: "/profile",
        element: (
          <AuthLayout authentication>   
            <Profile />                   
          </AuthLayout>
        ),
      },
       {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/failure",
        element: <Failure />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  // </StrictMode>
)
