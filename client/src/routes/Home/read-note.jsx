import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

export default function ReadNote() {
    const { id } = useParams();
    const baseUrl = 'http://localhost:5000';
    const [note, setNote] = useState({});

    useEffect(() => {
        fetchNotes();
    }, []);

    const formatDateTime = (datetime) => {
        const date = new Date(datetime);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };    

    const fetchNotes = async () => {
        fetch(`${baseUrl}/api/notes/${id}`)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                throw new Error('Something went wrong fetching the data');
            })
            .then(data => {
                const dateCreated = formatDateTime(data.createdAt);
                const dateUpdated = formatDateTime(data.updatedAt);
                if (data.importance === 0) {
                    data.importance = 'Low';
                }
                else if (data.importance === 1) {
                    data.importance = 'Medium';
                }
                else if (data.importance === 2) {
                    data.importance = 'High';
                }
                setNote({
                    title: data.title,
                    content: data.content,
                    importance: data.importance,
                    createdAt: dateCreated,
                    updatedAt: dateUpdated,
                });
            })
            .catch(err => {
                console.error(err);
            })
    };
    return (
<div className="read-container">
    <h1>Read Note</h1>
    <div className="note-details">
        <div className="note-detail">
            <h3>Title</h3>
            <p className="note-title">{note.title}</p>
        </div>
        <div className="note-detail">
            <h3>Content</h3>
            <p className="note-content">{note.content}</p>
        </div>
        <div className="note-detail">
            <h3>Importance</h3>
            <p className="note-importance">{note.importance}</p>
        </div>
        <div className="note-detail">
            <h3>Created At</h3>
            <p className="note-date">{note.createdAt}</p>
        </div>
        <div className="note-detail">
            <h3>Updated At</h3>
            <p className="note-date">{note.updatedAt}</p>
        </div>
    </div>
</div>

    )
}
