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
			$(event.target.parentElement).find('.back').fadeOut(3000);
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
		console.log(matchedCards.length);
		gameState.cardsLeft -= 2;
		console.log(gameState.cardsLeft);

		if (gameState.cardsLeft <= 0) {
			gameOver();
		}
	}

	function gameOver() {
		var starRating;

		// Calculate player's star rating
		if (gameState.score >= 21) {
			starRating = "3";
		}
		else if (gameState.score >= 6 && gameState.score <= 20) {
			starRating = "2";
		}
		else if (gameState.score >= 1 && gameState.score <= 5) {
			starRating = "1";
		}else{
			starRating = "no";
		}

		// Wipe out gameboard to display gameover screen
		gameBoard.empty();

		/* Create info display for gameover content */
		
		// Game over title
		var gameOverTitle = $('<h2 class="page-header text-center">');
		gameOverTitle.text("GAME OVER");
		gameOverTitle.css({
			'font-family': 'Permanent Marker',
			'font-size': '400%'
		});
		gameOverTitle.appendTo(gameBoard);

		// Player score text
		var playerRating = $('<p class="text-center">');
		playerRating.text(starRating + " stars fo' you!");
		playerRating.css({
			'font-family': 'Permanent Marker',
			'font-size': '300%',
			'color': '#E2F22E'
		});
		playerRating.appendTo(gameBoard);
		
		// Lebron...
		var lebron = $('<iframe src="http://gfycat.com/ifr/AdeptEvergreenBluebottlejellyfish" frameborder="0" scrolling="no" width="500" height="500" style="-webkit-backface-visibility: hidden;-webkit-transform: scale(1);">');
		lebron.addClass('center-block');
		lebron.appendTo(gameBoard);
		
		// Play again button
		var buttonContainer = $('<p class="text-center">');
		buttonContainer.css({
			'margin': '2rem 0'
		});
		var playAgainButton = $('<button class="play-again hvr-pulse btn btn-lg">');
		playAgainButton.appendTo(buttonContainer);
		
		$(playAgainButton).on('click', function(event) {
			initializeGame();
		});
		playAgainButton.text('Play Again');
		playAgainButton.css({
			'font-family': 'Rock Salt',
			'background': '#E2F22E',
			'color': 'black',
			'box-shadow': '3px 3px 5px 6px rgba(0, 0, 0, 0.4)',
		});
		buttonContainer.appendTo(gameBoard);
	}

	/* Button event handlers */

	// Start game
	$('.btn-start').on('click', function(event) {
		event.preventDefault();
		
		// Hide rules
		var ruleBox = $('#rules');
		ruleBox.toggle();
		// Show scoreboard in its place
		var scoreBoard = $('#scoreboard');
		scoreBoard.toggle();
		initializeGame();
	});

});
