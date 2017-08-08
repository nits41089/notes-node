/*jshint esversion: 6 */
const fs = require( 'fs' );

var addNote = ( title, body ) => {

	var notes = fetchNotes();
	var note = {
		title,
		body
	};

	var duplicateNotes = notes.filter( ( note ) => note.title === title );

	if ( duplicateNotes.length ) {

		return;

	}

	notes.push( note );
	saveNotes( notes );
	return note;

};

var getAll = () => {

	var notes = fetchNotes();
	return notes;

};

var getNote = ( title ) => {

	var notes = fetchNotes();
	var filteredNotes =  notes.filter( ( note ) => note.title === title );
	return filteredNotes;

};

var removeNote = ( title ) => {

	var notes = fetchNotes();
	var filteredNotes =   notes.filter( ( note ) => note.title !== title );
	saveNotes( filteredNotes );
	return notes.length === filteredNotes.length;

};

var fetchNotes = () => {

	try {

		var notesString = fs.readFileSync( 'notes-data.json' );
		return JSON.parse( notesString );

	} catch ( e ) {

		return [];

	}

};

var saveNotes = ( notes ) => {

	fs.writeFileSync( 'notes-data.json', JSON.stringify( notes ) );

};

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote
};
