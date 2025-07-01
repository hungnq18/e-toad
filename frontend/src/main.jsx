import 'antd/dist/reset.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { BlogProvider } from './contexts/BlogContext'
import './index.css'
import router from './routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BlogProvider>
        <RouterProvider router={router} />
      </BlogProvider>
    </AuthProvider>
  </React.StrictMode>
)
