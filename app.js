let deckID;
let dealButton = document.querySelector(".start");
const API = "https://deckofcardsapi.com/api/deck/";
let deck = [];

const getDeck = async () => {
  const response = await fetch(API + "new/shuffle/?deck_count=1");
  const data = await response.json();
  deckID = data.deck_id;
  const responseCards = await fetch(API + deckID + "/draw/?count=52");
  const deckCards = await responseCards.json();
  deck = deckCards.cards;
  dealButton.innerHTML = "Play Again";
  dealButton.onclick = function() {
    location.reload();
  };
  delayEachCard = setInterval(dealCards, 1);
};

let index = 0;
dealButton.addEventListener("click", () => getDeck());

let hearts = [];
let spades = [];
let diamonds = [];
let clubs = [];
let queens = [];

const dealCards = () => {
  if (queens.length == 4) {
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
  diamonds.sort(sorter);
  hearts.sort(sorter);
  spades.sort(sorter);
  clubs.sort(sorter);

  const diamondsImages = saveImages(diamonds);
  printCards(diamondsImages, "diamonds");

  const heartsImages = saveImages(hearts);
  printCards(heartsImages, "hearts");

  const spadesImages = saveImages(spades);
  printCards(spadesImages, "spades");

  const clubsImages = saveImages(clubs);
  printCards(clubsImages, "clubs");

  clearInterval(delayEachCard);
};

const changeValue = (a, b) => {
  if (b.value == "10") {
    b.value = 10;
  } else if (b.value == "JACK") {
    b.value = 11;
  } else if (b.value == "QUEEN") {
    b.value = 12;
  } else if (b.value == "QUEEN") {
    b.value = 13;
  } else if (b.value == "ACE") {
    b.value = 14;
  } else if (a.value == "10") {
    a.value = 10;
  } else if (a.value == "JACK") {
    a.value = 11;
  } else if (a.value == "QUEEN") {
    a.value = 12;
  } else if (a.value == "QUEEN") {
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

const saveImages = suit => {
  let suitImages = [];
  suit.forEach(element => {
    suitImages.push(element.image);
  });
  return suitImages;
};

const printCards = (cards, suit) => {
  cards.forEach(element => {
    document.querySelector(
      "." + suit
    ).innerHTML += `<br> <img class = "img" src=${element} />`;
  });
};
