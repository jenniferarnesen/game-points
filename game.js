var game = (function () {
	var self = this,
		reds = 0,
		greens = 0,
		blues = 0,

		scoring = {
			reds: 20,
			greens: 30,
			blues: 15
		};

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
		},

		redScore = function () {
			return reds * scoring.reds;
		},

		greenScore = function () {
			return greens * scoring.greens;
		},

		blueScore = function () {
			return blues * scoring.blues;
		},

		bonusPoints = function () {
			return 0;
		},

		totalPoints = function () {
			return redScore() + greenScore() + blueScore();
		};

	return {
		incrementReds: 		incrementReds,
		incrementGreens: 	incrementGreens,
		incrementBlues: 	incrementBlues,
		redScore: 			redScore,
		greenScore: 		greenScore,
		blueScore: 			blueScore,

		bonusPoints: bonusPoints,
		totalPoints: totalPoints 
	};
}());

$(document).ready(function () {

	updateTotals = function () {
		$('.total-points').text(game.totalPoints());
		$('.bonus-points').text(game.bonusPoints());
	}

	$('.red').click(function () {
		var reds = game.incrementReds();
  		$('.red-quantity').text(reds);
  		$('.red-score').text(game.redScore());

  		updateTotals();
	});

	$('.green').click(function () {
		var greens = game.incrementGreens();
  		$('.green-quantity').text(greens);
  		$('.green-score').text(game.greenScore());

  		updateTotals();
	});

	$('.blue').click(function () {
		var blues = game.incrementBlues();
  		$('.blue-quantity').text(blues);
  		$('.blue-score').text(game.blueScore());

  		updateTotals();
	});
});
