$(document).on('ready', function() {

	/* Create necessary namestates */
	var gameState = {
		gameCards: [], // deck of cards for current game
		matched: [], // array for cards that have been matched this game
		currentTurn: [], // array to store two cards for each turn
		matches: 0,
		guesses: 0,
		score: 0,
		cardsLeft: 0
	};

	var deck = [
		{
			name: '1',
			fileName: '1.jpg'
		},
		{
			name: '2',
			fileName: '2.jpg'
		},
		{
			name: '3',
			fileName: '3.jpg'
		},
		{
			name: '4',
			fileName: '4.jpg'
		},
		{
			name: '5',
			fileName: '5.jpg'
		},
		{
			name: '6',
			fileName: '6.jpg'
		}
	];

	var cardBacks = {
		name: 'cardback design',
		fileName: 'skulls.png'
	};

	/* Create jQuery objects */
	var gameBoard = $('#gameboard');
	var scoreVisual = $('.score-visual');
	var matchesVisual = $('.matches-visual');
	var guessesVisual = $('.guesses-visual');

	/* Functions to setup each new game */
	function initializeGame() {
		// Reset gameState values for each new game
		gameState.matches = 0;
		gameState.guesses = 0;
		gameState.score = 0;
		gameState.cardsLeft = 12;
		gameState.matched = [];

		// Wipe out scoreboard for each new game
		scoreboardUpdate();

		// Create shuffled deck for current game
		var deck1 = shuffle(deck.slice()); // make copy of deck and shuffle
		var deck2 = shuffle(deck.slice()); // make another copy of deck and shuffle
		gameState.gameCards = [].concat(deck1, deck2); // combine decks so that there are 2 of each card

		// Empty out gameBoard for each new game
		gameBoard.empty();

		// Call buildGame function to create new gameBoard for each game
		buildGame();
	}

	function shuffle(array) {
		var temp = []; 
		var n = array.length;
		var i;

		// Loop through entire array
		while(n) {

			// Pick an element
			i = Math.floor(Math.random() * n--);

			// Move it to the temp array
			temp.push(array.splice(i, 1)[0]);
		}

		return temp;
	}

	function buildGame() {
		// Loop through gameCard array and create new div for each card
		$.each(gameState.gameCards, function(key, item){
			var cardFilePath = 'img/deck/' + item.fileName;
			var newCard = $('<div>').attr({
				class: 'card col-xs-6 col-sm-4 col-md-3 col-lg-3',
				style: 'background: url("' + cardFilePath + '") center no-repeat; background-size: contain;',
				'data-name': item.name,
				'data-file': item.fileName
			});
			
			// Add the cardBack effect to each new div
			var backing = $('<span class="back">');
			backing.appendTo(newCard);
			
			// Append new div to gameBoard
			newCard.appendTo(gameBoard);

			// Add event listener for each card
			addClickHandler(newCard);
		});	
	}

	function addClickHandler(newDiv) {
		newDiv.on('click', function(event) {
			$(event.target.parentElement).find('.back').fadeOut();
			checkUserGuess(event.target);
		});
	}

	function checkUserGuess(target) {
		var clickTarget = $(target.parentElement); // capture div element that was clicked

		// Create card object for element that was clicked
		var guessCard = {
			name: clickTarget.data('name'),
			file: clickTarget.data('file')
		};

		// Push newly created card object onto currentTurn array
		gameState.currentTurn.push(guessCard);

		// Check currentTurn array once length has reached 2 to see if player got the match
		if (gameState.currentTurn.length === 2){
			gameState.guesses += 1;

			if (gameState.currentTurn[0].name == gameState.currentTurn[1].name){
				gameState.matches += 1;
				gameState.matched.push(gameState.currentTurn[0]);

				// Recalculate score and update scoreboard
				calculateScore();
				scoreboardUpdate();
				deactivateCards(gameState.currentTurn[0]);

				// Empty out currentTurn array for next turn
				gameState.currentTurn = [];
			}else{
				calculateScore();
				scoreboardUpdate();
				resetGuess();
			}
		} else if (gameState.currentTurn.length > 2) {
			console.log("Shit got real");
		}
	}

	function calculateScore() {
		gameState.score = (gameState.matches * 5) - (gameState.guesses * 2);
	}

	function scoreboardUpdate() {
		// Fade out old values, update, and fade in new values
		matchesVisual.fadeOut().text(gameState.matches).fadeIn();
		guessesVisual.fadeOut().text(gameState.guesses).fadeIn();
		scoreVisual.fadeOut().text(gameState.score).fadeIn();
	}

	function resetGuess() {
		// Fade the card backs in and wipe out currentTurn array
		$('div[data-name="'+ gameState.currentTurn[0].name +'"] .back').fadeIn();
		$('div[data-name="'+ gameState.currentTurn[1].name +'"] .back').fadeIn();
		gameState.currentTurn = [];
	}

	function deactivateCards(correctCard) {
		var matchedCards = $('div[data-name="'+ correctCard.name +'"].card');
		matchedCards.off('click');
		matchedCards.removeClass('card').addClass('matchedCard');
		console.log(matchedCards.length);
		gameState.cardsLeft = gameState.cardsLeft - (gameState.matched.length * 2);
		console.log(gameState.cardsLeft);

		if (gameState.cardsLeft <= 0) {
			gameOver();
		}
	}

	function gameOver() {
		var starRating;

		// Calculate player's star rating
		if (gameState.score >= 21) {
			starRating = "3 STARS!";
		}
		else if (gameState.score >= 6 && gameState.score <= 20) {
			starRating = "2 STARS!";
		}
		else if (gameState.score >= 1 && gameState.score <= 5) {
			starRating = "1 STAR!";
		}else{
			starRating = "0 STARS!";
		}

		// Wipe out gameboard to display gameover screen
		gameBoard.empty();

		// Create info display for gameover content
		var gameOverTitle = $('<h2 class="page-header text-center">');
		gameOverTitle.text("GAME OVER");
		gameOverTitle.appendTo(gameBoard);

		var playerRating = $('<p class="text-center">');
		playerRating.text("Your star rating this game: " + starRating);
		playerRating.appendTo(gameBoard);

		var playAgainButton = $('<button class="play-again btn btn-md btn-success center-block">');
		
		$(playAgainButton).on('click', function(event) {
			initializeGame();
		});
		playAgainButton.text('Play Again');
		playAgainButton.appendTo(gameBoard);
	}

	/* Button event handlers */

	// Start game
	$('.btn-start').on('click', function(event) {
		event.preventDefault();
		
		var ruleBox = $('#rules');
		ruleBox.toggle();
		var scoreBoard = $('#scoreboard');
		scoreBoard.toggle();
		initializeGame();
	});

});