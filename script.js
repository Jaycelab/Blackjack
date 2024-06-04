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

  //score status
  wins: 0,
  losses: 0,
  draws: 0,

  //status of the game
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
const loseSound = new Audio("sounds/aww.mp3");

//card dynamic size for all screens
let windowWidth = window.screen.width;
let windowHeight = window.screen.height;
let winner;

// Hit event listener
document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);

// Stand event listener
document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", blackjackStand);

//checks if blackjackGame status is false. If true, it will draw a random card from the cards array with the randomCard function
function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();

    //active player card
    showCard(card, YOU);
    updateScore(card, YOU);

    //passing YOU as the active player
    showScore(YOU);
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

//hiding newWidthSize for now until I can figure out how to make it work
//reduce width size if over 1000
function widthSize() {
  if (windowWidth > 1000) {
    //let newWidthSize = window.screen.width * 0.12;
    //return newWidthSize;
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
//Score function
function updateScore(card, activePlayer) {
  if (card === "A") {
    //if adding 11 keeps me below 21, add 11. Otherwise, add 1
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      //add 11
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      //add 1 (0 index)
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
    //if card is not an ace, add value to score
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

// Show Score
function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    //display bust if score is over 21 by targeting the score span id
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    //display score
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

// Stand button function
function blackjackStand() {
  if (blackjackGame.pressOnce === false) {
    // stands === true if play has not made a move yet
    blackjackGame["isStand"] = true;
    //helps assign the equal number of cards given to both computer and player
    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");

    for (let i = 0; i < yourImages.length; i++) {
      let card = randomCard();
      showCard(card, DEALER);
      updateScore(card, DEALER);
      showScore(DEALER);
    }

    //tells computer that the player has already made a move (stand)
    blackjackGame["isTurnsOver"] = true;

    //computes and shows the winner
    computeWinner();
    showWinner(winner);
  }
  //ends turn
  blackjackGame.pressOnce = true;
}

//Score tracker
function computeWinner() {
  //First if statement
  //if player is 21 or less
  if (YOU["score"] <= 21) {
    //condition: higher score than dealer or when dealer busts but you're 21 or under
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      winner = YOU;
    }
    //condition if less than dealer
    else if (YOU["score"] < DEALER["score"]) {
      winner = DEALER;
    }
    //condition if both players have the same score
    else if (YOU["score"] === DEALER["score"]) {
      winner = "draw";
    }
    //condition if player busts but dealer doesn't
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    winner = DEALER;
    //condition if both player and dealer bust. No winner is chosen
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    winner = "None";
  }
  //return winner
  return winner;
}

//Show Winner Display tracker with dynamic color
function showWinner() {
  let message, messageColor;

  if (winner === YOU) {
    message = "You won!";
    messageColor = "#00e676";
    //dyanmic score tracker
    document.querySelector("#wins").textContent = blackjackGame["wins"] += 1;
    winSound.play();
  }

  if (winner === DEALER) {
    message = "You lost!";
    messageColor = "red";
    //dyanmic score tracker
    document.querySelector("#losses").textContent = blackjackGame[
      "losses"
    ] += 1;
    loseSound.play();
  }

  if (winner === "Draw") {
    message = "Draw Game!";
    messageColor = "yellow";
    //dyanmic score tracker
    document.querySelector("#draws").textContent = blackjackGame["draws"] += 1;
    loseSound.play();
  }

  if (winner === "None") {
    message = "Both busted!";
    messageColor = "orange";
    loseSound.play();
  }

  //targeting DOM element for winner message
  document.querySelector("#blackjack-result").textContent = message;
  document.querySelector("#blackjack-result").style.color = messageColor;
}
