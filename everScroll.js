(function (window, undefined) {
	'use strict'; 
	function extend(destination, source) {
		var property;
		for (property in source) {
			if (source[property] && source[property].constructor && source[property].constructor === Object) {
    			destination[property] = destination[property] || {};
    			extend(destination[property], source[property]);
			} else {
				destination[property] = source[property];
			}
		}
	    	return destination;
	}
	var everScroll = function (options, callback) {
		var opts = extend({
			upScroll: null,
			downScroll: null,
			threshold: 100 // px to the edge (top or bottom)
		}, options),
		lastScroll = 0;
		function handler(e) {
			var direction = window.scrollY > lastScroll ? 'down' : 'up',
				overThreshold = opts.threshold > document.body.clientHeight - window.innerHeight - window.scrollY;
			if(typeof callback === 'function' && overThreshold)
				callback.apply(this, [direction]);
			if(direction === 'down' && overThreshold) {
				opts.downScroll.call(this);
			}
			if(direction === 'up' && overThreshold)
				opts.upScroll.call(this);
			lastScroll = window.scrollY;
		}
		return {
			attached: false,
			attach: function () {
				if(this.attached)
					window.removeEventListener('scroll', handler);
				window.addEventListener('scroll', handler);
				this.attached = true;
			}, 
			dettach: function () {
				window.removeEventListener('scroll', handler);
				this.attached = false; 
			} 
		}; 
	}; 
	window.Scroll = everScroll; 
}(window));
