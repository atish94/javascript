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
