import { createBrowserRouter } from 'react-router-dom'
import QuizList from '../features/quiz/QuizList'
import MainLayout from '../layouts/MainLayout'
import AboutEToad from '../pages/AboutEtoad'
import AboutFPT2 from '../pages/AboutFPT2'
import AdminDashboard from '../pages/AdminDashboard'
import AdminLogin from '../pages/AdminLogin'
import AdminPage from '../pages/AdminPage'
import AdminProducts from '../pages/AdminProducts'
import AdminProfile from '../pages/AdminProfile'
import AdminUsers from '../pages/AdminUsers'
import Blog from '../pages/Blog'
import BlogDetail from '../pages/BlogDetail'
import EtoadShop from '../pages/EtoadShop'
import ForgotPassword from '../pages/ForgotPassword'
import HomePage from '../pages/HomePage'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import PaymentFailed from '../pages/PaymentFailed'
import PaymentSuccess from '../pages/PaymentSuccess'
import ProductDetail from '../pages/ProductDetail'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import ResetPassword from '../pages/ResetPassword'
import Tour360 from '../pages/Tour360'

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
        path: '/blog/:id',
        element: <BlogDetail />
      },
      {
        path: '/shop',
        element: <EtoadShop />
      },
      {
        path: '/payment/success',
        element: <PaymentSuccess />
      },
      {
        path: '/payment/failed',
        element: <PaymentFailed />
      },
      {
        path: '/product/:id',
        element: <ProductDetail />
      },
      { path: 'login', element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password/:token', element: <ResetPassword /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <NotFound /> }
    ]
  },
  // Route admin đặt ngoài MainLayout
  { path: '/admin/login', element: <AdminLogin /> },
  { path: '/admin/dashboard', element: <AdminDashboard /> },
  { path: '/admin', element: <AdminPage /> },
  { path: '/admin/users', element: <AdminUsers /> },
  { path: '/admin/products', element: <AdminProducts /> },
  { path: '/admin/profile', element: <AdminProfile /> },
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