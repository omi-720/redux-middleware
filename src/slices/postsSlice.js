import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    if (!res.ok) throw new Error('Network response was not ok')
    return await res.json()
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

const postsSlice = createSlice({
  name: 'posts',
  initialState: { posts: [], loading: false, error: null },
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift({ id: Date.now(), ...action.payload })
    },
    editPost: (state, action) => {
      const { id, title, body } = action.payload
      const idx = state.posts.findIndex(p => p.id === id)
      if (idx !== -1) state.posts[idx] = { ...state.posts[idx], title, body }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(p => p.id !== action.payload)
    },
    clearPosts: (state) => {
      state.posts = []
      state.loading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => { state.loading = true })
      .addCase(fetchPosts.fulfilled, (state, action) => { state.loading = false; state.posts = action.payload })
      .addCase(fetchPosts.rejected, (state, action) => { state.loading = false; state.error = action.payload })
  }
})

export const { addPost, editPost, deletePost, clearPosts } = postsSlice.actions
export default postsSlice.reducer
