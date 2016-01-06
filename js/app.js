jQuery('document').ready(function() {
	"use strict";

	var keys = [{
		time: 0,
		action: function() {
			$('#ctrl-counter').css('background-color', '#EEE');
		}
	}, {
		time: 3,
		action: function() {
			$('#ctrl-counter').css('background-color', 'red');
		}
	}, {
		time: 6.5,
		action: function(t) {
			$('#ctrl-counter').css('background-color', 'green');
			t.stop();
		}
	}, {
		time: 8,
		action: function(t) {
			$('#ctrl-counter').css('background-color', 'orange');
		},
		replay: true
	}, {
		time: 10,
		action: function(t) {
			$('#ctrl-counter').css('background-color', 'grey');
		}
	}, {
		time: 12,
		action: function(t) {
			$('#ctrl-counter').css('background-color', 'yellow');
			t.stop();
		}
	}, {
		time: 14,
		action: function(t) {
			$('#ctrl-counter').css('background-color', 'blue');
		}
	}];

	var myTime = new Timeline();

	myTime.addKeyList(keys);

	myTime.addKey(17, function(t) {
		$('#ctrl-counter').css('color', '#FFF');
		t.reverse();
	})

	/* CONTROLS **************************************/
	$('#ctrl-home').click(function(e) {
		e.preventDefault();
		myTime.gotoAndStop(0);
	});
	$('#ctrl-replay').click(function(e) {
		e.preventDefault();
		myTime.replay();
	});
	$('#ctrl-rev').click(function(e) {
		e.preventDefault();
		myTime.reverse();
	});
	$('#ctrl-stop').click(function(e) {
		e.preventDefault();
		myTime.stop();
	});
	$('#ctrl-play').click(function(e) {
		e.preventDefault();
		myTime.play();
	});
});