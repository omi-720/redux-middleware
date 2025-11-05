import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPosts } from './postsSlice'

export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }, { getState, dispatch, rejectWithValue }) => {
  const { users } = getState().users
  const found = users.find(u => u.username === username && u.password === password)
  if (!found) return rejectWithValue('Invalid credentials')
  await dispatch(fetchPosts())
  return { id: found.id, username: found.username }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuth: false, currentUser: null, error: null },
  reducers: {
    logout: (state) => { state.isAuth = false; state.currentUser = null; state.error = null }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true
        state.currentUser = action.payload
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
