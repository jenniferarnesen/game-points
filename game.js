var game = (function () {
	var reds = 0,
		greens = 0,
		blues = 0,

		incrementReds = function () {
			reds += 1;
			return reds;
		},

		incrementGreens = function () {
			greens += 1;
			return greens;
		},

		incrementBlues = function () {
			blues += 1;
			return blues;
		};

		return {
			incrementReds: incrementReds,
			incrementGreens: incrementGreens,
			incrementBlues: incrementBlues
		};
}());

$(document).ready(function () {
	console.log('game is ready');

	$('.red').click(function () {
		var reds = game.incrementReds();
  		$('.red-score').text(reds);
	});

	$('.green').click(function () {
		var greens = game.incrementGreens();
  		$('.green-score').text(greens);
	});

	$('.blue').click(function () {
		var blues = game.incrementBlues();
  		$('.blue-score').text(blues);
	});
});
