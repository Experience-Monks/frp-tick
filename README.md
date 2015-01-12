# frp-tick

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A function which will return an Event. The event will fire when requestAnimationFrame evaluates. The event will return the difference in milliseconds since the last call.

## Usage

[![NPM](https://nodei.co/npm/frp-tick.png)](https://www.npmjs.com/package/frp-tick)

## Example

```javascript
var tick = require( 'frp-tick' );

var event = tick(); // created a new requestAnimation loop

event.watch( function( elapsed ) {
	
	console.log( elapsed );
});

tick.stop( event ); // this will stop the Event from firing
tick.start( event ); // this will start it up again 
tick.kill( event ); // this will stop the raf loop and clear all memory associated
```

## License

MIT, see [LICENSE.md](http://github.com/jam3/frp-raf/blob/master/LICENSE) for details.
