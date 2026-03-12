import { useState } from 'react'

export default function CommentSection({ comments, onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <div className="comment-section">
      {comments.length > 0 && (
        <ul className="comment-list">
          {comments.map((c) => (
            <li key={c.id} className="comment-item">{c.text}</li>
          ))}
        </ul>
      )}
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          className="form-input comment-input"
          placeholder="Add a comment…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-sm" type="submit">Post</button>
      </form>
    </div>
  )
}
