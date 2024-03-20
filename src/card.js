function createCard(id, question, answers, object){
    card = {
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
    console.log(round)
    return `** Round over! ** You answered ${round}% of the questions correctly!`
}

module.exports = {
    createCard,
    evaluateGuess,
    createDeck,
    createRound,
    takeTurn, 
    calculatePercentCorrect,
    endRound
}