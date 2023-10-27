import React, { useState } from 'react';

export default function AddNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [importance, setImportance] = useState(0);
  const [message, setMessage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImportanceChange = (e) => {
    setImportance(parseInt(e.target.value, 10));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title || !content) return alert('Please fill in all fields');
    try {
      const response = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, importance }),
      });

      if (response.status === 201) {
        setMessage('Note added successfully 👍');
        setTitle('');
        setContent('');
        setImportance(0);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      } else {
        setMessage('Note could not be added. Please try again. 😕');
      }
    } catch (error) {
      console.error(error.message);
      setMessage('Note could not be added. Please try again. 😕');
    }
  };

  return (
    <div className="add-note-container">
      <h1>Add Note</h1>
      <form className="add-note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Description"
          cols="30"
          rows="10"
          value={content}
          onChange={handleContentChange}
        />
        <div className='select-container'>
          <select id="importance" value={importance} onChange={handleImportanceChange}>
            <option value={0}>Not Important</option>
            <option value={1}>Slightly Important</option>
            <option value={2}>Very Important</option>
          </select>
        </div>
        <button type="submit">Add Note</button>
        {message && <p className='info'>{message}</p>}
      </form>
    </div>
  );
}
