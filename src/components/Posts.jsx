import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addPost, editPost, deletePost } from '../slices/postsSlice'
import Modal from './Modal'

export default function Posts() {
  const { posts, loading, error } = useSelector(s => s.posts)
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [edit, setEdit] = useState(null)

  const handleAdd = () => {
    if (!title.trim() || !body.trim()) return
    dispatch(addPost({ title, body }))
    setTitle(''); setBody('')
  }

  return (
    <div>
      <h3>Posts</h3>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Body" rows={4} value={body} onChange={e => setBody(e.target.value)} />
      <button className="primary" onClick={handleAdd}>Add Post</button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {posts.map(p => (
        <div key={p.id} className="post">
          <h4>{p.title}</h4>
          <p>{p.body}</p>
          <button onClick={() => setEdit(p)}>Edit</button>
          <button onClick={() => dispatch(deletePost(p.id))}>Delete</button>
        </div>
      ))}

      {edit && <Modal post={edit} onClose={() => setEdit(null)} onSave={(id, t, b) => { dispatch(editPost({ id, title: t, body: b })); setEdit(null) }} />}
    </div>
  )
}
