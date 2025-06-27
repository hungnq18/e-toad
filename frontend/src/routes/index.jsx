import { createBrowserRouter } from 'react-router-dom'
import QuizList from '../features/quiz/QuizList'
import MainLayout from '../layouts/MainLayout'
import AboutEToad from '../pages/AboutEtoad'
import AboutFPT from '../pages/AboutFPT'
import Blog from '../pages/Blog'
import BlogDetail from '../pages/BlogDetail'
import EtoadShop from '../pages/EtoadShop'
import HomePage from '../pages/HomePage'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import Tour360 from '../pages/Tour360'
import AboutFPT2 from '../pages/AboutFPT2'

// import Dashboard from '../pages/dashboard/Dashboard'
// import NotFound from '../pages/NotFoundPage'

// Public routes - accessible to all users
const publicRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        path: '/',
        element: <HomePage />
      },
      {
        path: 'about-fpt',
        element: <AboutFPT2 />
      },
      {
        path: 'about-etoad',
        element: <AboutEToad />
      },
      {
        path: 'lop-hoc-ao',
        element: <Tour360 />
      },
      {
        path: 'quiz',
        element: <QuizList />
      },
      {
        path:'blog',
       element: <Blog />
      },
      {
        path: '/blog/:slug',
        element: <BlogDetail />
      },
      {
        path: '/shop',
        element: <EtoadShop />
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <NotFound /> }
    ]
  },
  // {
  //   path: '/login',
  //   element: <Login />
  // },
  // {
  //   path: '/register',
  //   element: <Register />
  // }
]

// Private routes - only accessible to authenticated users
const privateRoutes = [
  {
    // path: '/dashboard',
    // element: <Dashboard />
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'profile', element: <Profile /> },
    ]
  }
]

// Combine all routes
const router = createBrowserRouter([
  ...publicRoutes,
  ...privateRoutes,
  {
    // path: '*',
    // element: <NotFound />
  }
])

export default router 