/*global randomizer*/

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
				.forEach(function (item) {
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
