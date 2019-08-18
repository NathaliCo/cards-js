// Instanciate a deck with all cards
var deck = Deck();

// display it in a html container
var $container = document.getElementById('container');
deck.mount($container);
deck.shuffle();
deck.flip();
var card = deck.cards[0];
console.log(card)
