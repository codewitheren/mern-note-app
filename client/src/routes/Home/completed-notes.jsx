import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function CompletedNotes() {
    const baseUrl = 'http://localhost:5000';
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        fetch(`${baseUrl}/api/notes`)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                throw new Error('Something went wrong fetching the data');
            })
            .then(data => {
                setNotes(data.reverse());
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err);
            })
    };

    const truncateContent = (content, maxLength) => {
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + '...';
        }
        return content;
    };

    const deleteNote = (id) => {
        fetch(`http://localhost:5000/api/notes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => {
            alert("Deleted");
            fetchNotes();
        }).catch((err) => {
            console.error(err);
        });
    };
    
    const markIncomplete = (id) => {
        fetch(`http://localhost:5000/api/notes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: 0 }),
        }).then(() => {
            alert("Marked Incomplete");
            fetchNotes();
        }).catch((err) => {
            console.error(err);
        });
    }
    
    return (
        <div className='note-container'>
                {isLoading ? (<p>Loading ...</p>) : (
                    <div>
                        <h2 className='title'>Completed Notes</h2>
                        <ul className='notes'>
                            {notes.filter(note => note.status === 1).map(note => (
                                <li key={note._id} className='note'>
                                    <h3>{note.title}</h3>
                                    <p>{truncateContent(note.content, 30)}</p>
                                    <div className='note-btn'>
                                        <Link to={`/read/${note._id}`}><button className='read-btn'>Read</button></Link>
                                        <button className='edit-btn' onClick={() => markIncomplete(note._id)}>Mark Incomplete</button>
                                        <button className='del-btn' onClick={() => deleteNote(note._id)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
    )
}
