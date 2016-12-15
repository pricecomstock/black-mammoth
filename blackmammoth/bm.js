// randomizes the order of a deck
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Interprets cardset data from JSON and creates a deck object out of it,
// converting from specified amounts to actual items in an array.

// e.g. {"CARD_A": 2, "CARD_B": 1} --> ["CARD_A", "CARD_A", "CARD_B"]
function expandDeck(cardset) {
    console.log(cardset);
    var d = [];
    for (var card in cardset) {
        for (var i = 0; i < cardset[card]; i++) {
            d.push(card);
        }
    }
    return d;
}

// Picks the top card off the deck
function pickCard(deck){
    var pc = deck.pop();
    console.log(pc);
    return pc;
}

// Displays a passed card object on the page
function displayCard(cardObj) {
    console.log(cardObj);
    document.getElementById("cardtitle").innerHTML = cardObj.title;
    document.getElementById("cardtext").innerHTML = cardObj.description;
}

// Picks a card from the top and displays it. Also handles an empty deck by reshuffling.
function draw(deck, cardDefs, newDeckFunc) {
    if (deck.length === 0) {
        deck = newDeckFunc();
        console.log("Reshuffling!");
    }
    displayCard(cardDefs[pickCard(deck)]);
    console.log("Cards left: " + deck.length);
}

var runGame = function(data, mode, cards, twists) {
    console.log("GAMEMODE");
    console.log(mode);
    
    console.log("CARDS");
    console.log(cards);
    
    console.log("TWISTS");
    console.log(twists);
    
    var newDeckGift = function() {
        return shuffle(expandDeck(mode.cardset.gift));
    }
    var newDeckNoGift = function() {
        return shuffle(expandDeck(mode.cardset.nogift));
    }
    
    var deck_g = newDeckGift();
    var deck_ng = newDeckNoGift();
    console.log("GIFT DECK");
    console.log(deck_g);
    console.log("NONGIFT DECK");
    console.log(deck_ng);
    
    $('#drawgift').click(draw.bind(this,deck_g,cards,newDeckGift));
    $('#drawnogift').click(draw.bind(this,deck_ng,cards,newDeckNoGift));
}

var setupGame = function(data) {
    // Figure out which cardset to use
    // Temporarily just set to cutthroat
    var gamemode = data.gamemodes.merry_cutthroat;
    
    // Give whole cardset for definitions
    var cards = data.cards;
    
    // Give twists for definitions
    var twists = data.twists;
    
    runGame(data, gamemode, cards, twists);
}

$.ajax({
    url: "bm.json",
    dataType: "json",
    success: setupGame
});

