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
			autoAttach: true,
			threshold: 100 // px to the edge (top or bottom)
		}, options),
		lastScroll = 0,
		attached = false;
		if(opts.autoAttach)
			attach();
		function handler(e) {
			var direction = window.scrollY > lastScroll ? 'down' : 'up',
				overThreshold = opts.threshold > document.body.clientHeight - window.innerHeight - window.scrollY || opts.threshold < window.scrollY;
			e.lastScroll = lastScroll;
			e.currentScroll = window.scrollY;
			if(typeof callback === 'function' && overThreshold)
				callback.apply(this, [direction]);
			if(direction === 'down' && overThreshold) {
				opts.downScroll.apply(this, [e]);
			}
			if(direction === 'up' && overThreshold) {
				opts.upScroll.apply(this, [e]);
			}
			lastScroll = window.scrollY;
		}
		function attach() {
			if(attached)
				window.removeEventListener('scroll', handler);
			window.addEventListener('scroll', handler, false);
			attached = true;
		}
		function dettach() {
			window.removeEventListener('scroll', handler);
			attached = false; 
		}
		return {
			attached: attached,
			attach: attach, 
			dettach: dettach
		}; 
	}; 
	window.Scroll = everScroll; 
}(window));
