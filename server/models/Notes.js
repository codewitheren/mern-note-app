const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    importance: {
        type: Number,
        default: 0,
        required: true
    },
    status:{
        type: Number,
        default: 0,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);