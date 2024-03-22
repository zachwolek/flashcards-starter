const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');
const {
  createDeck,
  createRound,
  countCards
} = require('./card');



function printMessage(deck) {
  console.log(`Welcome to FlashCards! You are playing with ${countCards(deck)} cards.
  -----------------------------------------------------------------------`);
}

function printQuestion(round) {
  util.main(round);
}

function start(deck){
  createDeck(deck)
  const round = createRound(deck);
  printMessage(deck);
  printQuestion(round);
}

module.exports = { printMessage, printQuestion, start };
