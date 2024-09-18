import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';
import SignUp from './Layouts/auth/routes/signup/SignUp';
import Login from './Layouts/auth/routes/login/Login';
import RootLayout from './Layouts/root/RootLayout';
import { useEffect } from 'react';
import { AppDispatch, RootState } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from './store/slices/authSlice';
import Loader from './ui/Loader';
import { AuthLayout } from './Layouts/auth/AuthLayout';
import { ThemeProvider } from './wrapppers/themeprovider';
import InitialLoader from './ui/InitialLoader';
import { setInnitialLoader } from './store/slices/loaderSlice';
import ForgotPassword from './Layouts/auth/routes/forgot-password/ForgotPassword';
import ResetPassword from './Layouts/auth/routes/reset-password/ResetPassword';
import VerifyOtp from './Layouts/auth/routes/verify-otp/VerifyOtp';

function App() {
  const isAuth = useSelector((state: RootState) => state.auth);
  const isInitialLoader = useSelector(
    (state: RootState) => state.loader.innitialLoader
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch(
        import.meta.env.VITE_API_BASE_URL +
          import.meta.env.VITE_AUTHSTATUS_ENDPOINT,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        }
      );
      const resData = await res.json();

      if (resData.error) {
        dispatch(clearUser());
        setTimeout(() => {
          redirect('/');
          dispatch(setInnitialLoader(false));
        }, 1000);

        return;
      }
      dispatch(setUser(resData.data));
      setTimeout(() => {
        redirect('/in');
        dispatch(setInnitialLoader(false));
      }, 1000);
    }

    checkAuth();
  }, [dispatch]);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: isAuth.isAuthenticated ? (
            <Navigate to="/in" />
          ) : (
            <Navigate to="/signup" />
          ),
        },
        {
          path: '/signup',
          element: isAuth.isAuthenticated ? <Navigate to="/in" /> : <SignUp />,
        },
        {
          path: '/login',
          element: isAuth.isAuthenticated ? <Navigate to="/in" /> : <Login />,
        },
        {
          path: '/forgot-password',
          element: isAuth.isAuthenticated ? (
            <Navigate to="/in" />
          ) : (
            <ForgotPassword />
          ),
        },
        {
          path: '/reset-password',
          element: isAuth.isAuthenticated ? (
            <Navigate to="/in" />
          ) : (
            <ResetPassword />
          ),
        },
        {
          path: '/verify-otp',
          element: isAuth.isAuthenticated ? (
            <Navigate to="/in" />
          ) : (
            <VerifyOtp />
          ),
        },
      ],
    },

    {
      path: '/in',
      element: isAuth.isAuthenticated ? <RootLayout /> : <Navigate to={'/'} />,
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark">
      <RouterProvider router={router}></RouterProvider>
      <Loader />
      {isInitialLoader && <InitialLoader />}
    </ThemeProvider>
  );
}

export default App;
