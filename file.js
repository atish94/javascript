function displayAge(){
    var yearBorn = prompt("What year were you born in?");
    var ageCalc = (2022 - yearBorn) * 365;
    var h2 = document.createElement("h2");
    var msg = document.createTextNode("You are" +" "+ ageCalc +" "+ "days old!");
    h2.setAttribute('id','display');
    h2.appendChild(msg);
    document.getElementById("flex-box-result").appendChild(h2);
}

function clearText(){;
    document.getElementById("display").remove();
    window.location.reload();
}


function generateCat(){
    var img = document.createElement("img");
    var div = document.getElementById("flex-box-generate");
    img.src = "https://static.scientificamerican.com/sciam/cache/file/9CAE9C60-8BC5-4CA3-95C180EFACDD99FD_source.jpg?w=390&h=520&5DC00F08-F74F-402B-811CEE0D33E933CB";
    img.setAttribute('style', 'width:200px; height:150px');
    div.appendChild(img);
}

function clearImg(){;
    document.getElementById("flex-box-generate").remove();
    window.location.reload();
}


function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = this.botChoice();
    console.log('Computer Choice: ', botChoice);
    results = decideWinner(humanChoice, botChoice);
    console.log(results);
    message = finalMessage(results);
    console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function botChoice(outcome){
    let options = ['rock', 'paper', 'scissors'];
    return outcome = options[Math.floor(Math.random()*options.length)];
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        'rock':{'scissors':1,'rock':0.5, 'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0}
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
    if (yourScore === 0){
        return {'message': "You lost!", 'color': 'red'};
    } else if (yourScore === 0.5){
        return {'message': "You tie!", 'color': 'yellow'};
    } else {
        return {'message': "You won!", 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    };

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanChoiceDiv = document.createElement('div');
    var botChoiceDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanChoiceDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 11)'>";
    document.getElementById('flex-box-rps').appendChild(humanChoiceDiv);

    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1"; 
    document.getElementById('flex-box-rps').appendChild(messageDiv);

    botChoiceDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(255, 0, 0)'>";
    document.getElementById('flex-box-rps').appendChild(botChoiceDiv);
}


var all_btns = document.getElementsByTagName("button");
var copyAllBtns = [];

for (let i=0; i<all_btns.length; i++){
    copyAllBtns.push(all_btns[i].classList[1]);
}

function changeColor(btnThingy){
    if (btnThingy.value === "red"){
        buttonsRed();
    } else if (btnThingy.value === "green"){
        buttonsGreen();
    } else if (btnThingy.value === "reset"){
        buttonsReset();
    } else if (btnThingy.value === "random"){
        buttonsRandom();
    }
}


function buttonsRed(){
    for (let i=0; i<all_btns.length; i++){
        all_btns[i].classList.remove(all_btns[i].classList[1]);
        all_btns[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for (let i=0; i<all_btns.length; i++){
        all_btns[i].classList.remove(all_btns[i].classList[1]);
        all_btns[i].classList.add('btn-success');
    }
}

function buttonsReset(){
    for (let i=0; i<all_btns.length; i++){
        all_btns[i].classList.remove(all_btns[i].classList[1]);
        all_btns[i].classList.add(copyAllBtns[i]);
    }
}

function buttonsRandom(){
    var rndomColor = ['btn-primary','btn-danger','btn-warning','btn-success'];

    for (let i=0; i<all_btns.length; i++){
        var rndomNumber = Math.floor(Math.random()*rndomColor.length);
        all_btns[i].classList.remove(all_btns[i].classList[1]);
        all_btns[i].classList.add(rndomColor[rndomNumber]);
    }
}


let blackjackGame = {
    'you': {'scoreSpan': '#your-result', 'div': '#your-box', 'score':0},
    'dealer': {'scoreSpan': '#dealer-result', 'div': '#dealer-box', 'score':0},
    'cards': ['2','3','4','5','6','7','8','9','10','J','Q', 'K', 'A'],
    'cardsMap': {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, 'J':10, 'Q':10, 'K':10, 'A':[1, 11]},
    "Wins": 0,
    "Losses": 0,
    "Draws": 0,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio('./sounds/swish.m4a');

document.querySelector('#blackjack-hit').addEventListener('click', hitMe);
document.querySelector('#blackjack-deal').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand').addEventListener('click', dealerLogic);


function hitMe(){
    r = document.querySelector('#h3-result').textContent;
    if (YOU['score'] <= 21) {
        card = randomCard();
        showCard(YOU);
        updateCard(card, YOU);
        updateScore(YOU);
    } else {
        alert('Sorry! Cannot pick card after bust.');
    }
}

function showCard(activePlayer) {
    displayCard(card, activePlayer);
}

function displayCard(card, activePlayer){
    let cardImage = document.createElement('img');
    cardImage.src = `./images/${card}.png`;
    cardImage.style = 'width:51px; height:55; padding:2px;';
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}

function blackjackDeal(){
    document.querySelector('#h3-result').textContent = 'Let\'s Play';
    document.querySelector('#h3-result').style.color = '#212529'
    updateTable();
    hitSound.play();
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (let i=0; i<yourImages.length; i++){
        yourImages[i].remove();
    }

    for (let i=0; i<dealerImages.length; i++){
        dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-result').textContent = 0;
    document.querySelector('#dealer-result').textContent = 0;

    document.querySelector('#your-result').style.color = 'white';
    document.querySelector('#dealer-result').style.color = 'white';
    
}

function randomCard(){
    return blackjackGame['cards'][Math.floor(Math.random()*13)];
}

function updateCard(card, activePlayer){
    if (card == 'A') {
        if (activePlayer['score'] + 11 <= 21) {
            activePlayer['score'] += 11;
        } else {
            activePlayer['score'] += 1;
        }
    } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function updateScore(activePlayer){
    if (activePlayer['score'] <= 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
}

function dealerLogic() {
    while (DEALER['score'] < 15) {
        let card = randomCard();
        displayCard(card, DEALER);
        updateCard(card, DEALER);
        updateScore(DEALER);
    }

    showResult(computeWinner());
}

function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            winner = DEALER;
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        winner = DEALER;
    }
    return winner;
}

function showResult(result) {
    resultSpan = document.querySelector('#h3-result');
    if (result == YOU) {
        resultSpan.textContent = 'You won! :D';
        resultSpan.style.color = 'green';
        const cashing = new Audio('sounds/cash.mp3');
        cashing.play();
        blackjackGame['Wins']++;
    } else if (result == DEALER) {
        resultSpan.textContent = 'You lost! :-(';
        resultSpan.style.color = 'red';
        const awwSound = new Audio('sounds/aww.mp3');
        awwSound.play();
        blackjackGame['Losses']++;
    } else {
        resultSpan.textContent = 'You drew! :|';
        blackjackGame['Draws']++;
    }
}

function blackjackReset() {
    document.querySelector('#h3-result').textContent = 'Let\'s Play!'
    document.querySelector('#h3-result').style.color = 'black';
}

function updateTable() {
    let wins = document.querySelector('#wins');
    let losses = document.querySelector('#losses');
    let draws = document.querySelector('#draws');

    wins.textContent = blackjackGame['Wins'];
    losses.textContent = blackjackGame['Losses'];
    draws.textContent = blackjackGame['Draws'];
}