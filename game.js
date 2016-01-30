var randomizer = (function () {
	var 
		/**
		 * Generates a random integer
		 *
		 * @param  {Integer} min Minimum number
		 * @param  {Integer} max Maximum number
		 * @param  {Integer} factor Factor to multiply by
		 * @return {Integer}
		 */
		getRandomInt = function (min, max, factor) {
			return (Math.floor(Math.random() * (max - min)) + min) * factor;
		},

		/** 
		 * Generates randomized game scoring data including
		 * the points for each item, and the bonus scheme.
		 * Used by reduce.
		 *
		 * @param {String} item The item to append to
		 * @param {String} name The name of the next item
		 * @return {Object}
		 */
		getItemData = function (item, name) {
			var hasBonus = !(Math.random() + .5 | 0);
			item[name] = {
				unit: getRandomInt(1, 3, 10)
			};

			if (hasBonus) {
				item[name].bonus = {
					num: getRandomInt(2, 4, 1)
				}
				item[name].bonus.total = 
					item[name].bonus.num * item[name].unit + getRandomInt(1, 5, 10);
			}
			return item;
		},

		generate = function () {
			var numItems = getRandomInt(3, 8, 1),

				names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].slice(0, numItems),

				scoring = names.reduce(getItemData, {});

			return {
				names: names,
				scoring: scoring
			};
		};

	return {
		generate: generate
	};
}());

var game = (function () {
	var items = {},

		scoring = {},

		getBonus = function (item) {
			var bonus = 0,
				bonusNum = scoring[item].bonus ? scoring[item].bonus.num : 0;

			if (bonusNum > 0) {
				var numBonuses = Math.floor(items[item]/bonusNum);
				
				bonus =
					(numBonuses * scoring[item].bonus.total) -
					(numBonuses * scoring[item].bonus.num) * scoring[item].unit;
			}

			return bonus;
		},

		score = function (item) {
			return (items[item] * scoring[item].unit) + getBonus(item);
		},

		increment = function (item) {
			items[item] += 1;
			return items[item];
		},

		bonus = function () {
			return Object.keys(items)
				.reduce(function (previous, current) {
					return previous + getBonus(current);
			}, 0);
		},

		total = function () {
			return Object.keys(items)
				.reduce(function (previous, current) {
					return previous + score(current);
			}, 0);
		},

		reset = function () {
			Object.keys(items)
				.map(function (item) {
					items[item] = 0;
				});
		},

		init = function () {
			var randomGame = randomizer.generate();
			items = randomGame.names.reduce(function (obj, name) {
		  		obj[name] = 0;
		  		return obj;
			}, {});

			scoring = randomGame.scoring;

			return items;
		};

	return {
		increment: increment,
		score: score,
		bonus: bonus,
		total: total,
		reset: reset,
		init: init
	};
}());

var getRandomColor = function () {
    var letters = '789ABCD'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 6)];
    }
    return color;
};

$(document).ready(function () {

	var buttons = game.init();

	Object.keys(buttons).forEach(function (btn) {
		var buttonMarkup = 
				'<button value="' + btn + 
				'" class="game-button" style="background-color:' + getRandomColor() + ';">'
				+ btn + '</button>';
		$('#button-container').append(buttonMarkup);
	});

	Object.keys(buttons).forEach(function (btn) {
		var trMarkup =
			'<tr> \
				<td>' + btn + '</td> \
				<td class="' + btn + '-quantity"></td> \
				<td class="' + btn + '-score"></td> \
			</tr>';
		$('#score-table tbody').append(trMarkup);
	});

	updateTotals = function () {
		$('#total-points').text(game.total());
		$('#bonus-points').text(game.bonus());
	}

	clearBoard = function () {
		$('[class$=quantity], [class$=score]').text('');
  		updateTotals();
	}

	$('.game-button').click(function () {
		var item = $(this).attr('value'),
			quantity = game.increment(item);
  		$('.'+ item + '-quantity').text(quantity);
  		$('.' + item + '-score').text(game.score(item));

  		updateTotals();
	});

	$('#new-game-button').click(function () {
		game.reset();
		clearBoard();
	})
});
