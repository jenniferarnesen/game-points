var game = (function () {
	var colors = {
			red: 0,
			green: 0,
			blue: 0 
		},

		scoring = {
			red: {
				unit: 20,
				bonus: {
					num: 2,
					total: 50
				}
			},
			green: {
				unit: 30,
				bonus: {
					num: 3,
					total: 150
				}
			},
			blue: {
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
			Object.keys(colors)
				.map(function (color) {
					colors[color] = 0;
				});
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

	$('.game-button').click(function () {
		var color = $(this).attr('value'),
			quantity = game.increment(color);
  		$('.'+ color + '-quantity').text(quantity);
  		$('.' + color + '-score').text(game.score(color));

  		updateTotals();
	});

	$('#new-game').click(function () {
		game.reset();
		clearBoard();
	})
});
