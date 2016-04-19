/*
Radhika Mattoo, rm3485@nyu.edu
Applied Internet Tech Spring 2016
Homework 7
*/
document.addEventListener("DOMContentLoaded", start);

var pinned = [-1,-1,-1,-1,-1];
var pinnedCount = 0;
function start(){
    //hide game and error message
    document.getElementById("error-message").style.visibility = "hidden";
    document.getElementById("game").style.visibility = "hidden";

    //add event listener to start button to trigger game
  	var start = document.getElementById("intro").firstChild.nextSibling;
    start.addEventListener('click', game);
};

function game(){
  //add all necessary HTML elements to game div

  //hide start button and show game div
  document.getElementById("intro").style.visibility = "hidden";
  document.getElementById("game").style.visibility = "visible";

  //simulate computer's turn
  var compGame = computerScore();
  var compScore = compGame[0];
  var compString = compGame[1];

  //comp score element
  var compParagraph = document.createElement("p");
  compParagraph.setAttribute('id', 'computerScore');
  var compDisplay = document.createTextNode("Computer Score: " + compString + "\n");

  //user score element
  var score =  0;
  var playerParagraph = document.createElement("p");
  playerParagraph.setAttribute('id', 'playerScore');
  var scoreDisplay = document.createTextNode("Your Score: " + score);

  compParagraph.appendChild(compDisplay);
  playerParagraph.appendChild(scoreDisplay);

  //append to game div
  var gameDiv = document.getElementById("game");
  gameDiv.appendChild(compParagraph);
  gameDiv.appendChild(playerParagraph);


  //make die div
  var die = document.createElement('div');
  die.setAttribute('id', 'die');
  for(var i = 0; i < 5; i++){
    var ele = document.createElement('p');
    var text = document.createTextNode(" ");
    ele.appendChild(text);
    ele.setAttribute('class', "die");
    ele.setAttribute('id', i);
    die.appendChild(ele);
  }
  gameDiv.appendChild(die);

  //make buttons
  var rollButton = document.createElement('button');
  var rollText = document.createTextNode("Roll");
  rollButton.appendChild(rollText);
  rollButton.setAttribute('class', 'buttons');


  var pinButton = document.createElement('button');
  var pinText = document.createTextNode("Pin");
  pinButton.appendChild(pinText);
  pinButton.setAttribute('class', 'buttons');
  pinButton.setAttribute('disabled', 'disabled');

  //append to game div
  gameDiv.appendChild(rollButton);
  gameDiv.appendChild(pinButton);

  //DICE
  var dies = document.getElementsByClassName("die");
  for(var i = 0; i < dies.length; i++){
    (function () {
      //get die's value, classList, and id
      var die = dies[i];
      var value = die.firstChild.data;
      var classList = die.classList;
      var id = die.getAttribute('id');

      die.addEventListener('click', function(){
        if(!pinButton.disabled){
          die.classList.toggle('pinned');
          if(classList.contains('pinned')){
            pinnedCount++;
            pinned[i] = value;
          }else{
            pinnedCount--;
            pinned[i] = -1;
          }
        }
      });
    }()); // immediate invocation
  }

  //ROLL
  rollButton.addEventListener('click', function(){
      var rollValues =  roll(pinned);
      //display
      var die = document.getElementsByClassName("die");
      for(var i = 0; i < die.length; i++){
        var dieDOM = die[i];
        var textNode = dieDOM.firstChild;
        textNode.data = rollValues[i];
      }
      //now disable roll and enable pin
      rollButton.setAttribute('disabled', 'disabled');
      pinButton.removeAttribute('disabled');
  });


  //PIN
  pinButton.addEventListener('click', function(){
    //error handling
    if(pinCount === 0){
      //TODO
    }
  });


}


/*Simulates the game for the computer and returns an array w/ the score and its toString */
function computerScore(){
  var score = 0;
  var scoreString = "";
  for(var die = 5; die > 0; die--){
    var values = [];
    for(var i = 0; i < die; i++){
      values[i] = Math.floor((Math.random() * 6) + 1);
    }
    var min = Math.min.apply(Math, values);
    if(min === 3){
      scoreString += " 0 (3) +";
    }else{
      score += min;
      scoreString += " " + min + " +";
    }

  }

  scoreString = scoreString.slice(0, -1);
  scoreString += " = " + score;

  return [score, scoreString];

}

/*Simulates a die roll based on param, array of die values */
function roll(pinned){
  for(var i = 0; i < pinned.length; i++){
    if(pinned[i] !== -1){continue;}
    var value = Math.floor((Math.random() * 6) + 1);
    pinned[i] = value;
  }
  return pinned;

}
/*Calculates winner based on scores */
function findWinner(player, computer){

}
