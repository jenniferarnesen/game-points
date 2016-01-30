/*global randomizer*/

var game = (function () {
	var items = {},

		scoring = {},

		/**
		 * Calculate the bonus for a given item
		 *
		 * @param  {String} item Item name
		 * @return {Integer}
		 */
		itemBonus = function (item) {
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

		/**
		 * Calculate the total score for a given item
		 *
		 * @param  {String} item Item name
		 * @return {Integer}
		 */
		score = function (item) {
			return (items[item] * scoring[item].unit) + itemBonus(item);
		},

		/**
		 * Increment the quantity for a given item
		 * and return the quantity
		 *
		 * @param  {String} item Item name
		 * @return {Integer}
		 */
		increment = function (item) {
			items[item] += 1;

			return items[item];
		},

		/**
		 * Return the total bonus for the game
		 *
		 * @return {Integer}
		 */
		bonus = function () {
			return Object.keys(items)
				.reduce(function (previous, current) {
					return previous + itemBonus(current);
			}, 0);
		},

		/**
		 * Return the total score for the game
		 *
		 * @return {Integer}
		 */
		total = function () {
			return Object.keys(items)
				.reduce(function (previous, current) {
					return previous + score(current);
			}, 0);
		},

		/**
		 * Clear the quantities of all the items
		 */
		reset = function () {
			Object.keys(items)
				.forEach(function (item) {
					items[item] = 0;
				});
		},

		/**
		 * Initialize a new game and return
		 * the items in the game
		 *
		 * @return {Object}
		 */
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
