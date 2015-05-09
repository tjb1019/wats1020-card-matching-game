/* Game code goes here. */
$(document).on('ready', function(){
// Initial jQuery object creations
var gameContainer = $('.game-container');



/***************** Core Game Functions ****************************************/
var startGame = function(){
    console.log('starting new game');
    // Initialize Game State
    gameState.score = 0;
    gameState.cardsLeft = 12;
    gameState.cardsMatched = 0;
    gameState.matchesMade = 0;
    gameState.guessesMade = 0;

    // Load Cards
    gameState.cards = shuffle(deck);
    console.log('gameState initialized');

    gameContainer.empty();

    var cardList = $('<ul>').attr({
        id: 'card-list'
    }).appendTo(gameContainer);
    buildGameBoard();
};
var buildGameBoard = function(){
    console.log('building game board');
    var cardList = $('#card-list');
    $.each(gameState.cards, function(key, card){
        var cardImagePath = 'img/deck/' + card.file;
        var newCardItem = $('<li>').attr({
            class: 'card',
            style: 'background: url("' + cardImagePath + '") top left no-repeat;background-size:contain;',
            'data-slug': card.slug,
            'data-name': card.name,
            'data-file': card.file
        });
        // Append a block to give the "card back" effect over the card.
        $('<span>').attr({
            class: 'back'
        }).appendTo(newCardItem);
        newCardItem.appendTo(cardList);
    });
};

/***************** Event Listeners for Start Buttons **************************/
$('.btn-start').on('click', function(event){
    event.preventDefault();
    startGame();
});

}); // end of document ready //////////////////////////////



/***************** Initialized Data Objects and Arrays ************************/

// Define an object that will be used to store the game state during play.
var gameState = {
    score: 0, // Score is calculated with `calculateScore`
    cardsLeft: 12,
    cardsMatched: 0,
    matchesMade: 0, // Used to calculate score: +5x
    guessesMade: 0, // Used to calculate score: -2x
    cards: [] // Array of cards in the game; populated by `startGame`
}
var deck = [ // An Array of card objects that can be used in the game.
    {
        slug: '1',
        name: '1',
        file: '1.jpg'
    },
    {
        slug: '2',
        name: '2',
        file: '2.jpg'
    },
    {
        slug: '3',
        name: '3',
        file: '3.jpg'
    },
    {
        slug: '4',
        name: '4',
        file: '4.jpg'
    },
    {
        slug: '5',
        name: '5',
        file: '5.jpg'
    },
    {
        slug: '6',
        name: '6',
        file: '6.jpg'
    },
    {
        slug: '7',
        name: '7',
        file: '7.jpg'
    },
    {
        slug: '8',
        name: '8',
        file: '8.jpg'
    },
    {
        slug: '9',
        name: '9',
        file: '9.jpg'
    },
    {
        slug: '10',
        name: '10',
        file: '10.jpg'
    },
    {
        slug: '11',
        name: '11',
        file: '11.jpg'
    },
    {
        slug: '12',
        name: '12',
        file: '12.jpg'
    }
];
var cardBack = { // The default card backing.
    slug: 'default',
    name: 'Default Card Back',
    file: 'skulls.png'
};

/***************** Helper Functions That Don't Need jQuery *******************/
function shuffle(array) {
  var copy = [], n = array.length, i;

  // While there remain elements to shuffle…
  while (n) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * n--);

    // And move it to the new array.
    copy.push(array.splice(i, 1)[0]);
  }

  return copy;
}
