const fs = require('fs');
const _ = require('lodash');

/** Fetch Notes */ 
const fetchNotes = () => {
    try {
        if (fs.existsSync('notes-data.json')){
            const notesString = fs.readFileSync('notes-data.json');
            return JSON.parse(notesString);    
        }else {
            return [];
        }    
    } catch (error) {
        return [];
    }
};

/** Save Notes */
const saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

const addNote = (title, body) => {
    let notes = fetchNotes();
    const note = {
        title: title,
        body: body
    };
    
    const filteredNotes = notes.filter((note) => note.title === title);
    if (filteredNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

const removeNote = (title) => {
    let notes = fetchNotes();
    const filteredNotes = _.filter(notes, (note) => note.title !== title);
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length
};

const getNote = (title) => {
    let notes = fetchNotes();
    return _.find(notes, {'title': title});
};

const logNote = (note) => {
    debugger;
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

const getAll = () => {
    return fetchNotes();
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    getNote: getNote,
    getAll: getAll,
    logNote: logNote
};