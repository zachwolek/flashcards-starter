const chai = require('chai');
const expect = chai.expect;

const { createCard, evaluateGuess, createDeck, createRound, takeTurn, calculatePercentCorrect, endRound} = require('../src/card');
// const {} = require('../src/deck');
// let card1, card2, card3, card4, card5, deck;

describe('card', function() {
  it('should be a function', function() {
    expect(createCard).to.be.a('function');
  });

  it('should create a card and its properties', function() {
    const card = createCard(1, 'What is Mario\'s primary occupation?', ['Plumber', 'Chef', 'Carpenter'], 'Plumber')
    
    expect(card.id).to.equal(1);
    expect(card.question).to.equal('What is Mario\'s primary occupation?');
    expect(card.answers).to.deep.equal(['Plumber', 'Chef', 'Carpenter']);
    expect(card.correctAnswer).to.equal('Plumber');
  });  

  it('should evaluate if a guess to a flashcard question is correct or incorrect', function () {
    const card = createCard(1, 'What is Mario\'s primary occupation?', ['Plumber', 'Chef', 'Carpenter'], 'Plumber')
    let correctGuess = evaluateGuess("Plumber", card.correctAnswer);
    let wrongGuess = evaluateGuess("Chef", card.correctAnswer);

    expect(correctGuess).to.equal('correct!');
    expect(wrongGuess).to.equal('incorrect!');
  });
});

describe('deck', function() {
  beforeEach(function(){
    card1 = createCard(1, 'What is Mario\'s primary occupation?', ['Plumber', 'Chef', 'Carpenter'], 'Plumber');
    card2 = createCard(2, 'What is the name of Link\'s legendary sword?', ['Excalibur', 'Master Sword', 'Frostmourne'], 'Master Sword');
    card3 = createCard(3, 'What species is Yoshi?', ['Dinosaur', 'Turtle', 'Dragon'], 'Dinosaur');
    card4 = createCard(4, 'Who is the main antagonist in the Legend of Zelda series?', ['Ganondorf', 'Bowser', 'King Dedede'], 'Ganondorf');
    card5 = createCard(5, 'What is the name of the main character in the Metroid series?', ['Samus Aran', 'Daisy', 'Zelda'], 'Samus Aran');
    deck = createDeck([card1, card2, card3, card4, card5])})
  
  it('should be a function', function() {
    expect(createDeck).to.be.a('function');
  });

  it('should create a deck', function (){
    deck = createDeck(card1, card2, card3, card4, card5)

    expect(deck[0]).to.deep.equal(card1);
    expect(deck[1]).to.deep.equal(card2);
    expect(deck[2]).to.deep.equal(card3);
    expect(deck[3]).to.deep.equal(card4);
    expect(deck[4]).to.deep.equal(card5);
  });
})


describe('round', function() {
  beforeEach(function(){
    card1 = createCard(1, 'What is Mario\'s primary occupation?', ['Plumber', 'Chef', 'Carpenter'], 'Plumber');
    card2 = createCard(2, 'What is the name of Link\'s legendary sword?', ['Excalibur', 'Master Sword', 'Frostmourne'], 'Master Sword');
    card3 = createCard(3, 'What species is Yoshi?', ['Dinosaur', 'Turtle', 'Dragon'], 'Dinosaur');
    card4 = createCard(4, 'Who is the main antagonist in the Legend of Zelda series?', ['Ganondorf', 'Bowser', 'King Dedede'], 'Ganondorf');
    card5 = createCard(5, 'What is the name of the main character in the Metroid series?', ['Samus Aran', 'Daisy', 'Zelda'], 'Samus Aran');
    deck = createDeck(card1, card2, card3, card4, card5)})

  it('should be a function that creates a round', function() {
      expect(createRound).to.be.a('function');
    });

  it('should have the round hold onto the deck property', function(){
    const round = createRound(deck)
    expect(round.deck).to.deep.equal(deck)
  })

  it('should identify the first card as the current card', function(){
    const round = createRound(deck)
    expect(round.currentCard).to.equal(deck[0])
  })

  it('should have a turns property that starts as 0', function(){
    const round = createRound(deck)
    expect(round.turns).to.equal(0)
  })

  it('should incorrectGuesses property that starts as an empty array', function(){
    const round = createRound(deck)
    expect(round.incorrectGuesses).to.deep.equal([])
  })

  it('should store the incorrectly guessed cards during a round into the incorrectGuesses array', function(){
    const round = createRound(deck)
    expect(round.incorrectGuesses).to.deep.equal([])
  })

})

describe('takeTurn', () => {
  it('should be a function takeTurn', function() {
      expect(takeTurn).to.be.a('function');
  });

  it('should update the turncount after the first', function() {
      const round = createRound(deck);
      takeTurn("Plumber", round)
      expect(round.turns).to.equal(1)
  })

  it('should update the turncount after every round', function() {
      const round = createRound(deck);
      takeTurn("Plumber", round);
      expect(round.turns).to.equal(1);
      takeTurn("Master Sword", round);
      expect(round.turns).to.equal(2);
  })

  it('should have next card aadvance the current id', function() {
      const round = createRound(deck);
      takeTurn("Plumber", round);
      expect(round.currentCard.id).to.equal(2)
  })  

  it('should have the next card advance the current id after every guess', function() {
      const round = createRound(deck);
        takeTurn("Plumber", round);
        expect(round.currentCard.id).to.equal(2)
        takeTurn("Master Sword", round);
        expect(round.currentCard.id).to.equal(3)
  }) 

  it('should have currentCard move to the next deck index position', function(){
      const round = createRound(deck);
      takeTurn("Plumber", round);
      expect(round.currentCard).to.equal(deck[1])
  })

  it('should have currentCard move to the next deck index position after every guess', function(){
      const round = createRound(deck);
      takeTurn("Plumber", round);
      expect(round.currentCard).to.equal(deck[1]);
      takeTurn("Master Sword", round);
      expect(round.currentCard).to.equal(deck[2])
  })

  it('should store incorrect guesses of the card\'s id', function (){
      const round = createRound(deck);
      takeTurn("Chef", round);
      expect(round.incorrectGuesses).to.deep.equal([1])
  })
    
  it('should not store correct guesses of the card\'s id', function (){
      const round = createRound(deck);
      takeTurn("Plumber", round);
      expect(round.incorrectGuesses).to.deep.equal([])
  })

  it('should store incorrect guesses of the card\'s id after every guess', function (){
      const round = createRound(deck);
      takeTurn("Plumber", round);
      expect(round.incorrectGuesses).to.deep.equal([])
      takeTurn("Stabby", round);
      expect(round.incorrectGuesses).to.deep.equal([2])
  })

  it('should return feedback if the guess is incorrect', function(){
      const round = createRound(deck);
      const output = takeTurn("Chef", round);
      expect(output).to.equal("incorrect!")
  })

    it('should return feedback if the guess is correct', function(){
      const round = createRound(deck);
      const output = takeTurn("Plumber", round);
      expect(output).to.equal("correct!")
    })

  it('should create a function calculatePercentCorrect', function(){
      expect(calculatePercentCorrect).to.be.a('function');
  })

  it('should return 100 on the first correct answer', function (){
      const round = createRound(deck);
      takeTurn("Plumber", round);
      const percentage = calculatePercentCorrect(round)
      expect(percentage).to.equal(100)
  })

  it('should return 33 on the second and third guess being incorrect', function (){
      const round = createRound(deck);
      takeTurn("Plumber", round);
      let percentage = calculatePercentCorrect(round)
      expect(percentage).to.equal(100);
      takeTurn("Stabby", round)
      percentage = calculatePercentCorrect(round)
      expect(percentage).to.equal(50)
      takeTurn("als;kdjf", round)
      percentage = calculatePercentCorrect(round)
      expect(percentage).to.equal(33)
  })

  it('should create a function endRound', function(){
      expect(endRound).to.be.a('function');
  })

  it('should print a statement showing the current percentage', function(){
      const round = createRound(deck);

      takeTurn("Plumber", round);
      let percentage = calculatePercentCorrect(round)
      let status = endRound(percentage)
      expect(status).to.equal(`** Round over! ** You answered 100% of the questions correctly!`)

      takeTurn("Stabby", round)
      percentage = calculatePercentCorrect(round)
      status = endRound(percentage)
      expect(status).to.equal(`** Round over! ** You answered 50% of the questions correctly!`)
  })
})  


//YOU CAN add tests to this file.
//YOU CAN also add more test files. 
//IF YOU DO, just make sure to import the new test files
