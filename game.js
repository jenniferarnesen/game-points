var game = (function () {
	var self = this,
		reds = 0,
		greens = 0,
		blues = 0,

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
			var bonus = 0;
			if (color = 'reds') {
				var bonusNum = scoring.reds.bonus.num;
				if (bonusNum > 0) {
					var numBonuses = Math.floor(reds/bonusNum);
					
					bonus =
						(numBonuses * scoring.reds.bonus.total) -
						(numBonuses * scoring.reds.bonus.num) * scoring.reds.unit;
				}
			} else if (color == 'green') {

			} else if (color == 'blue') {

			}
			return bonus;
		},

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
			return (reds * scoring.reds.unit) + getBonus('reds');
		},

		greenScore = function () {
			return greens * scoring.greens.unit;
		},

		blueScore = function () {
			return blues * scoring.blues.unit;
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
