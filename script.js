/*
Game Rules:

-The game has two players, playing in rounds
-In each turn, a player rollsa dice as many times as he wishes. Each result gets added to his/her round score

-But, if the player rolls a 1, all his round scores get lost. After that his round score gets addedd to his GLBAL score.After that, it's thenext players turn.

-The first player to reach users input final score or the default final score(50) points to global score wins the game
*/

//create a roundscore and score to keep track and keep track of who is playing
var scores, Roundscores, activePlayer, gamePlaying, dice, last_dice;

init();

// want to change the dice with a click event
// 1. need two a random numbers
 // 2. Display the the dice image result
// 3. Check the result of the dice
document.querySelector('.btn-roll').addEventListener('click', function () {

    if(gamePlaying){
          
        var dice_1 = Math.floor(Math.random() * 6) + 1;
        var dice_2 = Math.floor(Math.random() * 6) + 1;
     
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';

        document.getElementById('dice-1').src = 'dice-' + dice_1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice_2 + '.png';

        dice = dice_1 + dice_2;
        
        if(last_dice === 6 && dice === 6){ //the current players overall score goes back to zero
          tempAlert("two values 6 rule score restarts", 2000);
          scores[activePlayer] = 0;
          document.querySelector('#current-' + activePlayer).textContent = '0';
          nextPlayer();
        }
        if(dice_1 !== 1 && dice_2 != 1)
            {
                //add score
                Roundscores+= dice_1 + dice_2;
                document.querySelector('#current-' + activePlayer).textContent = Roundscores;
            }
        else
            {
                tempAlert("Next dice rolls had a one!!",1000);
                nextPlayer();
            }
            last_dice = dice;
    }

});
//event listener for hold button
document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlaying)
        {
            //add current score to global score
            scores[activePlayer] += Roundscores;
            //update the User interface
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            var input = document.querySelector('.final-score').value;
            var winningScore;
            //make sure that the value is valid
            if(input){
              winningScore = input;
            } else{ //assign default
              winningScore = 50;
            }
        //check if user won the game
            if(scores[activePlayer] >= winningScore)
                {
                    document.getElementById('name-' + activePlayer).textContent = 'Winner!';
                    document.getElementById('dice-1').style.display = 'none';
                    document.getElementById('dice-2').style.display = 'none';
                    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                    gamePlaying = false;
                }
            else
                nextPlayer();
        }

});
function nextPlayer()
{
      if(activePlayer === 0)
                activePlayer = 1;
            else
                activePlayer = 0;

            Roundscores = 0;
            document.getElementById('current-0').textContent = 0;
            document.getElementById('current-1').textContent = 0;

            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');

            
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init()
{
    scores = [0,0];
    Roundscores = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

function tempAlert(msg,duration)
{
 var el = document.createElement("div");
 el.setAttribute("style","position:absolute;top:50%;left:45%;font-family:Arial;font-weight:300;fobackground-color:white;");
 el.innerHTML = msg;
 setTimeout(function(){
  el.parentNode.removeChild(el);
 },duration);
 document.body.appendChild(el);
}
