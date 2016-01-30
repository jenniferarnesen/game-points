var colorRandomizer = (function () {
	return {
		get: function () {
			var letters = '789ABCD',
				color = '#';
		    for (var i = 0; i < 6; i++ ) {
		        color += letters[Math.floor(Math.random() * 6)];
		    }
		    return color;
		}
	};
}());
