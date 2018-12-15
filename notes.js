const fs = require('fs');

var fetchNotes = () => {
    try{
        var temp = fs.readFileSync('./notes-data.json');
        return JSON.parse(temp);
    } catch(e){
        console.log(e);
        return [];
    }
}

var saveNotes = notes => fs.writeFileSync('./notes-data.json',JSON.stringify(notes))

var addNote = (title,body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    var duplicateNotes = notes.filter(note => title === note.title);

    if(!duplicateNotes.length){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

var getAll = () => {
    return fetchNotes();
}

var getNote = (title) => {
    var notes = fetchNotes();
    note = notes.filter(note => title === note.title);
    if(note.length) return note[0];
}

var removeNote = (title) => {
    var notes = fetchNotes();
    var removed = notes.filter(note => note.title !== title);
    saveNotes(removed);
    return removed.length !== notes.length;
}

var logNote = note => {
    console.log('==================');
    console.log(`Title : ${note.title}`);
    console.log(`Body : ${note.body}`);
    console.log('==================');
}

module.exports = {
    addNote,
    removeNote,
    getAll,
    getNote,
    logNote
};