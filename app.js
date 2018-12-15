const fs = require('fs');
const yargs = require('yargs');
const notes = require('./notes');

var titleOptions = {
    describe: "Title of note",
    demand: true,
    alias: 't'
};
var bodyOptions = {
    describe: "Body of note",
    demand: true,
    alias: 'b'
};


const argv = yargs
    .command('add','Add a new note',{
        title: titleOptions,
        body: bodyOptions
    })
    .command('list','List all notes')
    .command('read','Read a note',{
        title:titleOptions
    })
    .command('remove','Remove a note',{
        title:titleOptions
    })
    .help()
    .argv;

var command = argv._[0];

if(command === 'add'){
    var addedNote = notes.addNote(argv.title,argv.body);
    if(addedNote) {
        console.log('Note sucessfully added')
        notes.logNote(addedNote);
    }
    else console.log('Notes with given title already exists');
}
else if(command === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach(element => {
        notes.logNote(element);
    });
}
else if(command === 'read'){
    var note = notes.getNote(argv.title);
    if(note){
        console.log('Note Found');
        notes.logNote(note);
    }
    else console.log('Note with given title doesn\'t exist');
} 
else if(command === 'remove'){
    var deleted = notes.removeNote(argv.title);
    var message = deleted ? 'Note successfully deleted': 'Note with given title doesn\'t exist';
    console.log(message);
}


