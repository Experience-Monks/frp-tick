var test = require( 'tape' );
var tick = require( './..' );

test( 'tick', function( t ) {

	t.plan( 4 );

	var ticker = tick();
	var cb = function( value ) {

		t.equal( typeof value, 'number', 'value returned was a number' );	

		ticker.unwatch( cb );
		tick.stop( ticker );

		ticker.watch( cb2 );

		setTimeout( function() {

			t.pass( 'Should\'t have run after stop call' );

			ticker.unwatch( cb2 );

			ticker.watch( cb3 );

			cb3Timeout = setTimeout( function() {

				t.fail( 'Should tick after start' );
			}, 200 );

			tick.start( ticker );
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
		tick.kill( ticker );

		ticker.watch( cb4 );

		setTimeout( function() {

			t.pass( 'Didn\'t tick after kill' );
		}, 200 );
	};

	var cb4 = function( value ) {

		t.fail( 'Should\'t have run after stop call' );
	};

	ticker.watch( cb );
});