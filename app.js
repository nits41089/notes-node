/*jshint esversion: 6 */
const fs = require( 'fs' );
const _ = require( 'lodash' );
const yargs = require( 'yargs' );

const notes = require( './notes.js' );

const title = {
	describe: ' Title of note. ',
	demand: true,
	alias: 't'
};

const body = {
	describe: ' Body of the note. ',
	demand: true,
	alias: 'b'
};

const argv = yargs
	.command( 'add', 'Add a new note', {
		title,
		body
	} )
	.command( 'list', 'List all notes' )
	.command( 'read', 'Read a note', {
		title
	} )
	.command( 'remove', 'Remove a note', {
		title
	} )
	.help()
	.argv;

var command = argv._[ 0 ];

if ( command === 'add' ) {

	var note = notes.addNote( argv.title, argv.body );

	if ( typeof note !== "undefined" && note.hasOwnProperty( "title" ) && note.hasOwnProperty( "body" ) ) {

		console.log( `${note.title} note added successfully.` );

	} else {

		console.log( 'This is a duplicate note, Please save the note with different title.' );

	}


} else if ( command === 'list' ) {

	var allNotes = notes.getAll();
	console.log( `Printing ${allNotes.length} note(s).` );
	allNotes.forEach( ( note ) => {

		console.log( `${note.title}.` );
		console.log( '----' );
		console.log( `${note.body}.` );

	} );

} else if ( command === 'read' ) {

	var note = notes.getNote( argv.title )[ 0 ];
	if ( typeof note !== "undefined" && note.hasOwnProperty( "title" ) && note.hasOwnProperty( "body" ) ) {

		console.log( `${note.title}.` );
		console.log( '----' );
		console.log( `${note.body}.` );

	} else {

		console.log( 'Note not found.' );

	}

} else if ( command === 'remove' ) {

	var noteRemoved = notes.removeNote( argv.title );
	var message = ! noteRemoved ? "Note was removed." : "Note not found.";
	console.log( message );

} else {

	console.log( 'Command not recognized.' );

}
