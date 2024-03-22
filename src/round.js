const card1 = createCard(1, 'What is Mario\'s primary occupation?', ['Plumber', 'Chef', 'Carpenter'], 'Plumber');
const card2 = createCard(2, 'What is the name of Link\'s legendary sword?', ['Excalibur', 'Master Sword', 'Frostmourne'], 'Master Sword');
const card3 = createCard(3, 'What species is Yoshi?', ['Dinosaur', 'Turtle', 'Dragon'], 'Dinosaur');
const card4 = createCard(4, 'Who is the main antagonist in the Legend of Zelda series?', ['Ganondorf', 'Bowser', 'King Dedede'], 'Ganondorf');
const card5 = createCard(5, 'What is the name of the main character in the Metroid series?', ['Samus Aran', 'Daisy', 'Zelda'], 'Samus Aran');
const deck = createDeck(card1, card2, card3, card4, card5)
const round = createRound(deck)

function createCard(id, question, answers, object){
    let card = {
        id: id,
        question: question,
        answers: answers,
        correctAnswer: object
    }
    return card
}

function evaluateGuess(guess, correctAnswer){
    if (guess === correctAnswer){
        return 'correct!'
    } else return 'incorrect!'
}

function createDeck(card1, card2, card3, card4, card5){
    let deck = [card1, card2,card3, card4, card5];
    return deck
}

function createRound(deck){
    let round = {
        deck: deck,
        currentCard: deck[0],
        turns: 0,
        incorrectGuesses: []
    }
    return round
}

function takeTurn(guess, round){
    var evaluation = evaluateGuess(guess, round.currentCard.correctAnswer);
    if(evaluation === "incorrect!"){
        round.incorrectGuesses.push(round.currentCard.id)
    }
    round.turns += 1;
    round.currentCard = deck[round.turns]
    return evaluation
}

function calculatePercentCorrect(round){
    let percent = (1 - (round.incorrectGuesses.length / round.turns)) * 100
    return +percent.toFixed(0)
}

function endRound(round){
    let results = calculatePercentCorrect(round)
    console.log(`** Round over! ** You answered ${results}% of the questions correctly!`)
    return `** Round over! ** You answered ${results}% of the questions correctly!`
}

function countCards(deck){
    return deck.length
}
module.exports = {
    createCard,
    evaluateGuess,
    createDeck,
    createRound,
    takeTurn, 
    calculatePercentCorrect,
    endRound,
    countCards
}