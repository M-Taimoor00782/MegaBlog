import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AddPost,
  AllPost,
  AuthLayout,
  Home,
  Login,
  SignUp,
  Success,
  Failure,
  Profile,
} from "./components/index.js";

import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import "./index.css";

import AboutUs from "./pages/footerPages/AboutUs.jsx";
import Features from "./pages/footerPages/Features.jsx";
import Careers from "./pages/footerPages/Careers.jsx";

import HelpCenter from "./pages/footerPages/HelpCenter.jsx";
import ContactUs from "./pages/footerPages/ContactUs.jsx";
import FAQ from "./pages/footerPages/FAQ.jsx";
import CustomerSupport from "./pages/footerPages/CustomerSupport.jsx";

import Terms from "./pages/footerPages/Terms.jsx";
import Privacy from "./pages/footerPages/Privacy.jsx";
import Guidelines from "./pages/footerPages/Guidelines.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },

      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },

      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },

      {
        path: "/forgot-password",
        element: (
          <AuthLayout authentication={false}>
            <ForgotPassword />
          </AuthLayout>
        ),
      },

      {
        path: "/reset-password",
        element: (
          <AuthLayout authentication={false}>
            <ResetPassword />
          </AuthLayout>
        ),
      },

      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            <AllPost />
          </AuthLayout>
        ),
      },

      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },

      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },

      {
        path: "/post/:slug",
        element: (
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        ),
      },

      {
        path: "/profile",
        element: (
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        ),
      },

      { path: "/success", element: <Success /> },
      { path: "/failure", element: <Failure /> },

      // ---------- FOOTER PAGES (PUBLIC) ----------

{ path: "/aboutus", element: <AboutUs /> },
{ path: "/features", element: <Features /> },
{ path: "/careers", element: <Careers /> },

{ path: "/help-center", element: <HelpCenter /> },
{ path: "/contact-us", element: <ContactUs /> },
{ path: "/faq", element: <FAQ /> },
{ path: "/customer-support", element: <CustomerSupport /> },

{ path: "/terms", element: <Terms /> },
{ path: "/privacy", element: <Privacy /> },
{ path: "/guidelines", element: <Guidelines /> },

    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
