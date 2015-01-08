var test = require( 'tape' );
var tick = require( './..' );

test( 'tick returns a value in milliseconds', function( t ) {

	t.plan( 3 );

	var ticker = tick();
	var cb = function( value ) {

		t.ok( typeof value == 'number', 'value returned was a number' );	

		ticker.unwatch( cb );
		tick.stop();

		ticker.watch( cb2 );

		setTimeout( function() {

			t.pass( 'Should\'t have run after stop call' );

			ticker.unwatch( cb2 );

			ticker.watch( cb3 );

			cb3Timeout = setTimeout( function() {

				t.fail( 'Should tick after start' );
			}, 200 );

			tick.start();
		}, 200 );
	};

	var cb2 = function( value ) {

		t.fail( 'Should\'t have run after stop call' );
	};

	var cb3Timeout = null;
	var cb3 = function( value ) {

		t.pass( 'Should tick after start' );

		clearTimeout( cb3Timeout );

		ticker.unwatch( cb3 );
		tick.stop();
	};

	ticker.watch( cb );
});