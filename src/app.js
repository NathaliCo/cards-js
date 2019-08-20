let deckID;
let dealButton = document.querySelector(".start");
const API = "https://deckofcardsapi.com/api/deck/";
let deck = [];
let delay = "null";
let delayEachCard = null;

const getDeck = async () => {
  const response = await fetch(API + "new/shuffle/?deck_count=1");
  const data = await response.json();
  deckID = data.deck_id;
  const responseCards = await fetch(API + deckID + "/draw/?count=52");
  const deckCards = await responseCards.json();
  deck = deckCards.cards;
  dealButton.innerHTML = "Play Again";

  dealButton.onclick = function() {
    restart();
  };
  if (delayEachCard == null) {
    delayEachCard = setInterval(dealCards, 1000);
  }

  dealButton.style.visibility = "hidden";
};

dealButton.addEventListener("click", () => getDeck());

let index = 0;

const dealCards = () => {
  if (queens.length == 4) {
    clearInterval(delayEachCard);
    delayEachCard = null;
    results();
  } else {
    if (deck[index].value == "QUEEN") {
      queens.push(deck[index]);
    }
    saveSuits(deck[index], deck[index].suit);
    document.querySelector(".showCards").src = deck[index].image;
    index++;
  }
};

let hearts = [];
let spades = [];
let diamonds = [];
let clubs = [];
let queens = [];
const saveSuits = (card, key) => {
  switch (key) {
    case "DIAMONDS":
      diamonds.push(card);
      break;
    case "HEARTS":
      hearts.push(card);
      break;
    case "SPADES":
      spades.push(card);
      break;
    case "CLUBS":
      clubs.push(card);
    default:
      break;
  }
};

const results = () => {
  dealButton.style.visibility = "visible";
  diamonds.sort(sorter);
  hearts.sort(sorter);
  spades.sort(sorter);
  clubs.sort(sorter);

  printCards(diamonds, "diamonds");

  printCards(hearts, "hearts");

  printCards(spades, "spades");

  printCards(clubs, "clubs");

  const shownCards =
    diamonds.length + hearts.length + spades.length + clubs.length;
  document.querySelector(".shown").innerHTML = shownCards + " Shown cards // ";
  document.querySelector(".hidden").innerHTML =
    52 - shownCards + " Hidden cards";

  alerts(shownCards);
};

const alerts = shownCards => {
  const alert = document.querySelector(".alert");

  if (shownCards < 20) {
    alert.innerHTML = " Today is you lucky day";
  } else if (shownCards < 36) {
    alert.innerHTML = "Good game";
  } else {
    alert.innerHTML = "Try again";
  }
  alert.style.display = "block";
};

const changeValue = (a, b) => {
  if (b.value == "10") {
    b.value = 10;
  } else if (b.value == "JACK") {
    b.value = 11;
  } else if (b.value == "QUEEN") {
    b.value = 12;
  } else if (b.value == "KING") {
    b.value = 13;
  } else if (b.value == "ACE") {
    b.value = 14;
  } else if (a.value == "10") {
    a.value = 10;
  } else if (a.value == "JACK") {
    a.value = 11;
  } else if (a.value == "QUEEN") {
    a.value = 12;
  } else if (a.value == "KING") {
    a.value = 13;
  } else if (a.value == "ACE") {
    a.value = 14;
  }
};

function sorter(a, b) {
  changeValue(a, b);
  if (a.value < b.value) return -1;
  if (a.value > b.value) return 1;
  return 0;
}

const printCards = (cards, suit) => {
  cards.forEach(element => {
    document.querySelector(
      "." + suit
    ).innerHTML += `<br> <img class = "img" src=${element.image} />`;
  });
};

const restart = () => {
  deckID = "";
  hearts = [];
  spades = [];
  diamonds = [];
  clubs = [];
  queens = [];
  deck = [];
  index = 0;
  document.querySelector(".diamonds").innerHTML = "";
  document.querySelector(".hearts").innerHTML = "";
  document.querySelector(".clubs").innerHTML = "";
  document.querySelector(".spades").innerHTML = "";
  document.querySelector(".shown").innerHTML = "";
  document.querySelector(".hidden").innerHTML = "";
  document.querySelector(".alert").style.display = "none";
  getDeck();
};
