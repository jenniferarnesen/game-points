var randomizer = (function () {
	var MIN_GAME_ITEMS = 3,

		/**
		 * Generate a random integer
		 *
		 * @param  {Integer} min Minimum number (included)
		 * @param  {Integer} max Maximum number (excluded)
		 * @param  {Integer} factor Factor to multiply by
		 * @return {Integer}
		 */
		getRandomInt = function (min, max, factor) {
			return (Math.floor(Math.random() * (max - min)) + min) * factor;	
		},

		/** 
		 * Generate randomized scoring data including the unit
		 * points and the bonus scheme. Used by reduce.
		 *
		 * @param {String} item The item to append to
		 * @param {String} name The name of the next item
		 * @return {Object}
		 */
		getItemScoring = function (item, name) {
			var hasBonus = !(Math.random() + .5 | 0);

			item[name] = {
				unit: getRandomInt(1, 4, 10)
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

		/**
		 * Generate game data, including a list of
		 * letter-named items, and the scoring scheme
		 *
		 * @return {Object}
		 */
		generate = function () {
			var letters = 'ABCDEFGHIJKLM',
				numItems = getRandomInt(MIN_GAME_ITEMS, letters.length, 1),
				names = letters.split('').slice(0, numItems);

			return {
				names: names,
				scoring: names.reduce(getItemScoring, {})
			};
		};

	return {
		generate: generate
	};
}());