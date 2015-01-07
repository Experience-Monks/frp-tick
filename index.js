var frp = require( 'frp' ),
	raf = require( 'raf' );

module.exports = function() {

	var rafPipe = frp.event.pipe(),
		timeLast = Date.now();

	var rafLoop = function() {

		var timeNow = Date.now();

		rafPipe.fire( timeNow -  timeLast );

		timeLast = timeNow;

		raf( rafLoop );
	};

	rafLoop();

	return rafPipe;
};