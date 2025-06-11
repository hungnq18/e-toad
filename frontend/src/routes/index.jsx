import { createBrowserRouter } from 'react-router-dom'
import QuizList from '../features/quiz/QuizList'
import MainLayout from '../layouts/MainLayout'
import AboutEToad from '../pages/AboutEtoad'
import AboutFPT from '../pages/AboutFPT'
import Blog from '../pages/Blog'
import BlogDetail from '../pages/BlogDetail'
import HomePage from '../pages/HomePage'
import LopHocAo from '../pages/LopHocAo'
import Shop from '../pages/Shop'
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
        element: <AboutFPT />
      },
      {
        path: 'about-etoad',
        element: <AboutEToad />
      },
      {
        path: 'lop-hoc-ao',
        element: <LopHocAo />
      },
      {
        path: 'Shop',
        element: <Shop />
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
      }
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