var Timeline = (function($) {
	"use strict";

	var timeline = function(options) {
		return this.init(options);
	};
	timeline.prototype = {
		init: function(options) {
			this.config = $.extend({
				initial: 0,
				fps: 24
			}, options);

			this.temp = $('#ctrl-counter');

			this.currentFrame = this.config.initial;
			this.maxFrame = 0;
			this.replayFrame = 0;

			this.fromReverse = false;

			this.direction = 1;
			this.playing = false;

			this.keyframes = {};

			this.gotoAndStop(this.config.initial);

			return this.run(this);
		},
		addKeyList: function(keys) {
			var l = keys.length;
			for (var i = 0; i < l; i++) {
				var s = keys[i].time,
					callback = (typeof keys[i].action !== 'undefined') ? keys[i].action : function() {};
				this.addKey(s, callback, keys[i].replay);
			}
			this.gotoAndStop(this.config.initial);
			return this;
		},
		toFrame: function(s) {
			return Math.round(s * this.config.fps);
		},
		addKey: function(s, callback, replay) {
			var frame = this.toFrame(s);

			if (frame > this.maxFrame) {
				this.maxFrame = frame;
			}

			this.keyframes[frame] = {
				action: callback,
				replay: false
			};

			if (replay) {
				this.keyframes[frame].replay = true;
			}

			return this;
		},
		deleteKey: function(s) {
			var frame = this.toFrame(s);
			this.keyframes[frame] = undefined;
			return this;
		},
		play: function() {
			this.direction = 1;
			this.playing = true;
			return this;
		},
		reverse: function() {
			if (this.currentFrame > 1) {
				this.currentFrame -= 2;
				this.direction = -1;
				this.playing = true;
			}
			return this;
		},
		stop: function() {
			this.playing = false;
			return this;
		},
		gotoAndStop: function(s) {
			this.currentFrame = this.toFrame(s);
			if(this.replayFrame > this.currentFrame){
				this.replayFrame = this.currentFrame;
			}
			this.stop().executeFrame(this.currentFrame);
			return this;
		},
		gotoAndPlay: function(s) {
			this.currentFrame = this.toFrame(s);
			if(this.replayFrame > this.currentFrame){
				this.replayFrame = this.currentFrame;
			}
			this.executeFrame(this.currentFrame).play();
			return this;
		},
		gotoAndReverse: function(s) {
			this.currentFrame = this.toFrame(s);
			this.executeFrame(this.currentFrame).reverse();
			return this;
		},
		replay:function(){
			if(this.currentFrame < this.replayFrame){
				this.replayFrame = 0;
			}
			this.currentFrame = this.replayFrame;
			this.executeFrame(this.currentFrame).play();
			return this;
		},
		executeFrame: function(frame) {

			/* TEMP */
			this.temp.text(Math.round(10 * this.currentFrame / this.config.fps) / 10 + ' s.');

			if (this.keyframes[frame] !== undefined) {
				this.keyframes[frame].action.apply(null, [this]);
				if(this.keyframes[frame].replay){
					this.replayFrame = frame;
				}
			}
			return this;
		},
		run: function(self) {
			var f_time = Math.round(1000 / this.config.fps);
			setInterval(function() {
				if (self.playing) {
					self.executeFrame(self.currentFrame);
					self.currentFrame += self.direction;

					if (self.currentFrame < 0 || self.currentFrame > self.maxFrame) {
						self.stop();
					}


				}
			}, f_time);
			return this;
		}
	};

	return timeline;
})(jQuery);