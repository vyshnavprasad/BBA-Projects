let scoreCard, boardx, turn=0;

var gameStatus = document.querySelector("#game-status");
let play       = document.querySelector("#play");
let board      = document.querySelectorAll(".cell");
let game       = document.querySelector("board");

function CheckSet(i1, i2, i3) {
  let score = boardx[i1]+ boardx[i2] + boardx[i3];
  if (score===3)
    return 1;
  else if (score===-3)
    return -1;
  else
    return 0;
}

function StatusUpdate() {  
  scoreCard = CheckSet(0,1,2) + CheckSet(3,4,5) + CheckSet(6,7,8) + CheckSet(0,4,8) + CheckSet(2,4,6) + CheckSet(0,3,6) + CheckSet(1,4,7) + CheckSet(2,5,8);

  if(Math.abs(scoreCard) === 1){
    gameStatus.innerText = "X wins!!!";
  }else if(Math.abs(scoreCard) === -1){
    gameStatus.innerText = "O wins!!!";
  }else{
    gameStatus.innerText = "GAME ON";
  }
}

function StartGame(){
  turn = 0;
  boardx  = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  for(let child of board){
    child.innerText = "";
  };
  

  StatusUpdate();
}
StartGame()


function PlayGame(index, player){
  boardx[index] = (player? -1: 1);
  StatusUpdate();
  return (player? "O": "X");
}

//EVENTS

play.addEventListener("click", () => StartGame());

board.forEach(function(child, index) {
  child.addEventListener("click", (e) => {
    e.target.innerText = PlayGame(index, turn%2);
    turn++;
    child.removeEventListener("click");
  }); 
});
