import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './components/Login'
import Posts from './components/Posts'
import ProtectedRoute from './components/ProtectedRoute'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from './slices/authSlice'
import { clearPosts } from './slices/postsSlice'

export default function App() {
  const isAuth = useSelector(s => s.auth.isAuth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearPosts())
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Mini Blog App</h2>
        {isAuth && <button onClick={handleLogout}>Logout</button>}
      </div>

      <Routes>
        <Route path="/" element={<Navigate to={isAuth ? '/posts' : '/login'} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}
