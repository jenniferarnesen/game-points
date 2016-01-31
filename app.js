/*global game, colorizer*/

$(document).ready(function () {
	var items = game.init();

	Object.keys(items).forEach(function (item) {
		var buttonMarkup = 
			'<button value="' + item + '" \
    			class="game-button" \
                style="background-color:' + colorizer.get() + ';"> \
    			' + item + ' \
            </button>';
		$('#button-container').append(buttonMarkup);
	});

	Object.keys(items).forEach(function (item) {
		var trMarkup =
			'<tr> \
				<td>' + item + '</td> \
				<td class="' + item + '-quantity"></td> \
				<td class="' + item + '-score"></td> \
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
