# wats1020-card-matching-game
A repository to help kickstart the card matching game final project.

The final project in this course is a project to build a card matching game. You might know this kind of game as "Memory". We will use slightly customized rules to build a solitaire version of the game. The base requirements define a basically playable in-browser game that can be built with Javascript, HTML and CSS

##Base Requirements
* Cards are shuffled.
* 12 cards are arranged in a grid face down.
* Player begins a play turn:
  * Player clicks a card to reveal the face.
  * Player clicks a second card to reveal the second card's face.
  * If the two cards match:
    * The player earns 5 points.
    * The cards disappear from the grid.
  * If the cards do not match:
    * The player loses 2 points.
    * The cards return to their original face-down position.
* Player repeats play turns until all the cards are removed from the grid.
* When no cards are left, a Game Over screen is shown displaying the following information:
  * Total score for the player
  * Star ranking based on this breakdown:
    * If score is zero (0) or less, no stars
    * If score is between 0 and 5, one star
    * If score is between 6 and 20, two stars
    * If score is between 21 and 30, three stars
  * Play again button; if clicked, game resets and starts again.
  * Note: There is no need to save scores over time in the base requirements

## Additional **base requirements**

* Must be playable in any modern web browser
* Should be responsive to major screen sizes (phone, tablet, and desktop)
* Use some animation to enhance interactivity and fun
* Present this in the context of a single-page mini-site hosted on Github Pages

## Stretch Requirements

* Add your own graphics and enhance the visual presentation
* Players enter their name when they start the first game.
  * Store this in localStorage for retrieval throughout the gameplay
  * Use this value to enhance messaging and information display during the game
* Players can share their score and a link to your game when they complete the game.
  * Add a button to "Share" the final results of the game alongside the "Play Again" button
  * Enable sharing to a social network (or multiple) of your choosing.
* Enhanced animations
  * There are many opportunities for animations throughout this game. Make them awesome.
* Deploy at a custom domain or subdomain. (This is especially good if allowing people to share your link.)
* Add Google Analytics so you can see how popular your card game is.

## Credits and Attributions

This project uses the images from the ["Notable Women in Computer Science Playing Card Deck"](http://www.cs.duke.edu/csed/wikipedia/).

This project uses background images from [Subtle Patterns](http://subtlepatterns.com).
