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

		score = function (color) {
			return (colors[color] * scoring[color].unit) + getBonus(color);
		},

		increment = function (color) {
			colors[color] += 1;
			return colors[color];
		},

		bonus = function () {
			return Object.keys(colors)
				.reduce(function (previous, current) {
					return previous + getBonus(current);
			}, 0);
		},

		total = function () {
			return Object.keys(colors)
				.reduce(function (previous, current) {
					return previous + score(current);
			}, 0);
		},

		reset = function () {
			colors.reds = 0;
			colors.greens = 0;
			colors.blues = 0;
		};

	return {
		increment: increment,
		score: score,
		bonus: bonus,
		total: total,
		reset: reset
	};
}());

$(document).ready(function () {

	updateTotals = function () {
		$('.total-points').text(game.total());
		$('.bonus-points').text(game.bonus());
	}

	clearBoard = function () {
		$('[class$=quantity], [class$=score]').text('');
  		updateTotals();
	}

	$('.red').click(function () {
		var reds = game.increment('reds');
  		$('.red-quantity').text(reds);
  		$('.red-score').text(game.score('reds'));

  		updateTotals();
	});

	$('.green').click(function () {
		var greens = game.increment('greens');
  		$('.green-quantity').text(greens);
  		$('.green-score').text(game.score('greens'));

  		updateTotals();
	});

	$('.blue').click(function () {
		var blues = game.increment('blues');
  		$('.blue-quantity').text(blues);
  		$('.blue-score').text(game.score('blues'));

  		updateTotals();
	});

	$('.new-game').click(function () {
		game.reset();
		clearBoard();
	})
});
