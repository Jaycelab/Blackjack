//dictionary of cards
let blackjackGame = {
  you: {
    //accessing the span,id, flebox and score result
    scoreSpan: "#your-blackjack-result",
    div: "#your-box",
    boxSize: ".flex-blackjack-row-2 div",
    score: 0,
  },

  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    boxSize: ".flex-blackjack-row-2 div",
    score: 0,
  },
  //cards array
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "Q", "J", "A"],

  //access cards value
  //ace inside the array is 1 or 11
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    K: 10,
    Q: 10,
    J: 10,
    A: [1, 11],
  },

  //status
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  isTurnsOver: false,
  //prevent button from being clicked after card is drawn
  pressOnce: false,
};

//user
const YOU = blackjackGame["you"];

//dealer
const DEALER = blackjackGame["dealer"];

//audio
const hitSound = new Audio("sounds/swish.m4a");
const winSound = new Audio("sounds/cash.mp3");
const lossSound = new Audio("sounds/aww.mp3");

//card dynamic size for all screens
let windowWidth = window.screen.width;
let windowHeight = window.screen.height;
let winner;

document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);

//checks if blackjackGame status is false. If true, it will draw a random card from the cards array with the randomCard function
function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();

    //active player card
    showCard(card, YOU);
  }
}

//creates a random card from the cards array with 13 elements (13 cards total)
function randomCard() {
  //random number
  let randomIndex = Math.floor(Math.random() * 13);
  //points to the random card
  return blackjackGame["cards"][randomIndex];
}

//shows the card on the screen and adds the card value to the active player score
function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    //adds image tag to active player
    let cardImage = document.createElement("img");
    //source for dynamic card image
    cardImage.src = `images/${card}.png`;
    //dynamic card size depending on screen size
    cardImage.style = `width:${widthSize()}; height:${heightSize()}`;
    //selecting active player div and appending the card image
    document.querySelector(activePlayer["div"]).appendChild(cardImage);

    //plays hit sound
    hitSound.play();
  }
}

//reduce width size if over 1000
function widthSize() {
  if (windowWidth > 1000) {
    let newWidthSize = window.screen.width * 0.11;
  }
  //if width less than 1000
  else {
    return window.screen.width * 0.18;
  }
}

//reduce height size if over 1000
function heightSize() {
  if (windowHeight > 700) {
    let newHeightSize = window.screen.height * 0.1;
    return newHeightSize;
  }
  //if height less than 1000
  else {
    return window.screen.height * 0.15;
  }
}
