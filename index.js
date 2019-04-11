const yargs = require('yargs');
const notes = require('./notes');

const argv = yargs
    .command('add', 'Add a new note', {
        title: {
            describe: 'Title is required',
            demand: true,
            alias: 't'
        },
        body: {
            describe: 'body is required',
            demand: true,
            alias: 'b'
        }
    })
    .command('read', 'Read a new note', {
        title: {
            describe: 'Title is required',
            demand: true,
            alias: 't'
        }
    })
    .command('remove', 'Remove a new note', {
        title: {
            describe: 'Title is required',
            demand: true,
            alias: 't'
        }
    })
    .command('list', 'list of notes')
    .help()
    .argv;
var command = argv._[0];
console.log(command);
console.log('Yargs', argv);

if (command === 'add') {
    const note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note is created!');
        notes.logNote(note);
    } else {
        console.log('Note of this title already exists!')
    }
} else if (command === 'list') {
    const allNotes = notes.getAll();
    if (allNotes) {
        console.log(`Printing ${allNotes.length} note(s)`);
        allNotes.forEach(note => {
            notes.logNote(note);
        });
    }
} else if (command == 'read') {
    const note = notes.getNote(argv.title);
    if (note) {
        console.log('Note Found :)');
        notes.logNote(note);
    } else {
        console.log('Note of this title not found!')
    }
} else if (command === 'remove') {
    const noteRemoved = notes.removeNote(argv.title);
    const message = noteRemoved ? 'Note is removed.' : 'Note not found.';
    console.log(message);
} else {
    console.log('Command does not exists.')
}
