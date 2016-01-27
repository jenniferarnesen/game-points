var game = (function () {
	var colors = {
			reds: 0,
			greens: 0,
			blues: 0 
		},

		scoring = {
			reds: {
				unit: 20,
				bonus: {
					num: 2,
					total: 50
				}
			},
			greens: {
				unit: 30,
				bonus: {
					num: 3,
					total: 150
				}
			},
			blues: {
				unit: 15,
				bonus: {
					num: 2,
					total: 40
				}
			}
		},

		getBonus = function (color) {
			var bonus = 0,
				bonusNum = scoring[color].bonus.num;

			if (bonusNum > 0) {
				var numBonuses = Math.floor(colors[color]/bonusNum);
				
				bonus =
					(numBonuses * scoring[color].bonus.total) -
					(numBonuses * scoring[color].bonus.num) * scoring[color].unit;
			}

			return bonus;
		},

		incrementReds = function () {
			colors.reds += 1;
			return colors.reds;
		},

		incrementGreens = function () {
			colors.greens += 1;
			return colors.greens;
		},

		incrementBlues = function () {
			colors.blues += 1;
			return colors.blues;
		},

		redScore = function () {
			return (colors.reds * scoring.reds.unit) + getBonus('reds');
		},

		greenScore = function () {
			return (colors.greens * scoring.greens.unit) + getBonus('greens');
		},

		blueScore = function () {
			return (colors.blues * scoring.blues.unit) + getBonus('blues');
		},

		// score = function (color) {
		// 	return (colors[color] * scoring[color].unit) + getBonus(color);
		// },

		bonusPoints = function () {
			return getBonus('reds') + getBonus('greens') + getBonus('blues');
		},

		totalPoints = function () {
			return redScore() + greenScore() + blueScore();
		},

		reset = function () {
			colors.reds = 0;
			colors.greens = 0;
			colors.blues = 0;
		};

	return {
		incrementReds: 		incrementReds,
		incrementGreens: 	incrementGreens,
		incrementBlues: 	incrementBlues,
		redScore: 			redScore,
		greenScore: 		greenScore,
		blueScore: 			blueScore,

		bonusPoints: bonusPoints,
		totalPoints: totalPoints,
		reset: reset
	};
}());

$(document).ready(function () {

	updateTotals = function () {
		$('.total-points').text(game.totalPoints());
		$('.bonus-points').text(game.bonusPoints());
	}

	$('.red').click(function () {
		console.log('red clicked');
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

	$('.new-game').click(function () {
		game.reset();
		$('.red-quantity').text('');
  		$('.red-score').text('');
  		$('.green-quantity').text('');
  		$('.green-score').text('');
  		$('.blue-quantity').text('');
  		$('.blue-score').text('');

  		updateTotals();
	})
});
