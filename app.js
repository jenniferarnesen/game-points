/*global game, colorizer*/

$(document).ready(function () {

	var buttons = game.init();

	Object.keys(buttons).forEach(function (btn) {
		var buttonMarkup = 
			'<button value="' + btn + 
			'" class="game-button" style="background-color:' + colorizer.get() + ';">'
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
