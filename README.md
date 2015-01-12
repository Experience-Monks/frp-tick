# frp-tick

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A function which will return an Event. The event will fire when requestAnimationFrame evaluates. The event will return the difference in milliseconds since the last call.

## Usage

[![NPM](https://nodei.co/npm/frp-tick.png)](https://www.npmjs.com/package/frp-tick)

## Example

```javascript
var tick = require( 'frp-tick' );

tick().watch( function( elapsed ) {
	
	console.log( elapsed );
});

tick.stop( tick ); // this will stop the Event from firing
tick.start( tick ); // this will start it up again 
```

## License

MIT, see [LICENSE.md](http://github.com/jam3/frp-raf/blob/master/LICENSE) for details.
