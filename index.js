var frp = require( 'frp' ),
	raf = require( 'raf' ),
	now = require( 'right-now' );

var rafPipe = frp.event.pipe(),
	timeLast = now(),
	rafHandle = null;

function rafLoop() {

	var timeNow = now();

	rafPipe.fire( timeNow -  timeLast );

	timeLast = timeNow;

	if( rafHandle !== null ) {

		rafHandle = raf( rafLoop );
	}
}

function frpTick() {

	return rafPipe;
}

frpTick.start = function() {

	if( rafHandle === null ) {

		rafHandle = raf( rafLoop );
	}
};

frpTick.stop = function() {

	if( rafHandle !== null ) {

		raf.cancel( rafHandle );
		rafHandle = null;
	}
};

frpTick.start();

module.exports = frpTick;