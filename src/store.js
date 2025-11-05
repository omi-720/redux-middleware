import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import usersReducer from './slices/usersSlice'
import postsReducer from './slices/postsSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer
  }
})
