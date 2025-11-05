import React, { useState } from 'react'

export default function Modal({ post, onClose, onSave }) {
  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h4>Edit Post</h4>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <textarea rows={6} value={body} onChange={e => setBody(e.target.value)} />
        <div style={{display:'flex', justifyContent:'end', gap:8}}>
          <button onClick={onClose}>Cancel</button>
          <button className="primary" onClick={() => onSave(post.id, title, body)}>Save</button>
        </div>
      </div>
    </div>
  )
}
