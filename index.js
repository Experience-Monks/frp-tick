var frp = require( 'frp' ),
		raf = require( 'raf' ),
		now = require( 'right-now' ),
		lookups = require( 'lookups' );

var pipeToRafLoop = lookups();

function frpTick() {

	var rafPipe = frp.event.pipe(),
			timeLast = now();

	var rafLoop = function() {

		var timeNow = now();

		rafPipe.fire( timeNow -  timeLast );

		timeLast = timeNow;

		if( rafLoop.handle !== null ) {

			rafLoop.handle = raf( rafLoop );
		}
	};

	rafLoop();

	pipeToRafLoop.set( rafPipe, rafLoop );

	return rafPipe;
}

frpTick.start = function( event ) {

	var loopFunc = pipeToRafLoop.get( event ),
			started = loopFunc && loopFunc.handle === null;

	if( started ) {

		loopFunc();
	}

	return started;
};

frpTick.stop = function( event ) {

	var loopFunc = pipeToRafLoop.get( event ),
			stopped = loopFunc && loopFunc.handle !== null;

	if( stopped ) {

		raf.cancel( loopFunc.handle );
		loopFunc.handle = null;	
	}

	return stopped;
};

frpTick.kill = function( event ) {

	frpTick.stop( event );
	pipeToRafLoop.remove( event );
};



module.exports = frpTick;