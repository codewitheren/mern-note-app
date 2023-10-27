import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

export default function UpdateNote() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [importance, setImportance] = useState(0);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchNote();
    }, []);

    const fetchNote = async () => {
        fetch(`http://localhost:5000/api/notes/${id}`)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                throw new Error('Something went wrong fetching the data');
            })
            .then(data => {
                setTitle(data.title);
                setContent(data.content);
                setImportance(data.importance);
            })
            .catch(err => {
                setMessage('Note could not be updated. Please try again. 😕');
                console.error(err);
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title || !content) return alert('Please fill in all fields');
        fetch(`http://localhost:5000/api/notes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title, content, importance}),
        }).then(() => {
            alert("Updated");
            setTitle('');
            setContent('');
            setImportance(0);
            setMessage("Note updated successfully 👍");
            setTimeout(() => {
                setMessage(null);
            }, 2000);
            fetchNote();
        }).catch((err) => {
            console.error(err);
        })
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const handleImportanceChange = (e) => {
        setImportance(parseInt(e.target.value, 10));
    }

    return (
        <div className="add-note-container">
        <h1>Update Note</h1>
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
            <button type="submit">Update Note</button>
            {message && <p className='info'>{message}</p>}
        </form>
        </div>
    )
}
