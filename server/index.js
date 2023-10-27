require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Note = require("./models/Notes"); 

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get all notes
app.get("/api/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        if (!notes) throw Error("No notes found");
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

// Get a note
app.get("/api/notes/:id", async (req, res) => {
    try {
        const noteID = req.params.id;
        const note = await Note.findById(noteID);
        if (!note) throw Error("No note found");
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a note
app.post("/api/notes", async (req, res) => {
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content,
        importance: req.body.importance
    });
    try {
        const note = await newNote.save();
        if (!note) throw Error("Something went wrong saving the note");
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a note
app.put("/api/notes/:id", async (req, res) => {
    const noteID = req.params.id;
    const { title, content, importance, status} = req.body;
    try {
        const note = await Note.findByIdAndUpdate(noteID, {
            title,
            content,
            importance,
            status: status
        });
        if (!note) throw Error("Something went wrong updating the note");
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

// Delete a note
app.delete("/api/notes/:id", async (req, res) => {
    const noteID = req.params.id;
    try {
        const note = await Note.findByIdAndDelete(noteID);
        if (!note) throw Error("No note found to delete");
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});