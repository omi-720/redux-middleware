import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector(s => s.auth.error)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(loginUser({ username, password })).unwrap()
      navigate('/posts')
    } catch {}
  }

  return (
    <div className="form">
      <h3>Login</h3>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="primary" type="submit">Login</button>
      </form>
    </div>
  )
}
