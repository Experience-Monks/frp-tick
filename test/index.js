var test = require( 'prova' );
var tick = require( './..' );

test( 'tick returns a value in milliseconds', function( t ) {

	t.plan( 1 );

	tick().watch( function( value ) {

		t.ok( typeof value == 'number', 'value returned was a number' );
	});
});