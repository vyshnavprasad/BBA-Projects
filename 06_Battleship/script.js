
let reset = document.querySelector("#Reset");
let cardsSlider = document.querySelector("#cards");
let cardsInfo = document.querySelector("#cards-info")
let chancesSlider = document.querySelector("#chances");
let chancesInfo = document.querySelector("#chances-info");
let message = document.querySelector("#message");
let dialog = document.querySelector("#dialog");
let close = document.querySelector("#close");
let level = document.querySelector("#level");

var ship = "https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/battleship-image_e6bWCZ1w4.png";
var water = "https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/seamless-pattern-waves-various-shades-blue-vector-underwater-design-96891651_aSd5pmbaM.webp";
var cells = document.querySelectorAll(".cell");
let chance, cards=1, chances=1;
let lottedCards = [];
let shipCards = [];


function SetShipCards(limit) {
  let card = 0;
  lottedCards = [];
  shipCards = [];
  let cardsLeft  = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  while(card++ < cards) {
    let n = Math.floor(Math.random() * cardsLeft.length);
    shipCards.push((n===16) ? 15: cardsLeft[n]);
    cardsLeft.splice(n, 1);
  }
  console.log(shipCards);
}

function factorial(num) {
  if (num === 0 || num === 1) return 1;
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
}
function binomialProbability(n, m, x, p) {
  function binomialCoefficient(x, n) {
    return factorial(x) / (factorial(n) * factorial(x - n));
  }

  const q = 1 - p;
  const probability = binomialCoefficient(x, n) * Math.pow(p, n) * Math.pow(q, x - n);
  return probability;
}


function Level(){
  // let n = 16;
  // let r = cardsSlider.value;
  // let nCr = factorial(n)/(factorial(r)*factorial(n-r));
  // let probability = 1/nCr;

  probability = binomialProbability(cardsSlider.value, 16, chancesSlider.value ,1/2);
  level.innerText =  ((1/probability));
}

//GAME CONTROLERS

function StartGame() {
  chances = chancesSlider.value;
  cards = cardsSlider.value; 
  Level();

  chance = 0;
  SetShipCards();
  cells.forEach(function(child) {
    child.innerHTML = "";
  })
}

function WinGame() {
  console.log("WinGame");
  message.textContent = "YOU WIN!!!";
  dialog.show();
}

function LoseGame() {
  console.log("LoseGame");
  message.innerText = "YOU LOSE!!!";
  dialog.show();
}


function EndGame() {
  if(shipCards.every(element => lottedCards.includes(element))) {
    cells.forEach((cell, index) => {
      cell.innerHTML = shipCards.includes(index) ? `<img src=${ship}>`: `<img src=${water}>`;
    });
    WinGame();
  }
  else if(lottedCards.length >= chances){
    cells.forEach((cell, index) => {
      cell.innerHTML = shipCards.includes(index) ? `<img src=${ship}>`: `<img src=${water}>`;
    });
    LoseGame();
  }
}

function PlayGame(index) {
  cells[index].innerHTML = shipCards.includes(index) ? `<img src=${ship}>`: `<img src=${water}>`;
  lottedCards.push(index);
  EndGame();
}

//EVENT LISTENERS
close.addEventListener("click", () => {dialog.close()});

reset.addEventListener("click", () => StartGame());

cardsSlider.value = cards;
cardsInfo.innerText = `Ships = ${cardsSlider.value}`;
cardsSlider.oninput = function () {
  Level();
  cardsInfo.innerText = `Ships = ${cardsSlider.value}`;
  chancesSlider.min = cardsSlider.value;
  chancesSlider.value = (cardsSlider.value < chancesSlider.value) ? chancesSlider.value: chancesSlider.value;
  chancesInfo.innerText = `Chances = ${chancesSlider.value}`;
}

chancesSlider.value = chances;
chancesInfo.innerText = `Chances = ${chancesSlider.value}`
chancesSlider.oninput = function() {
  Level();
  chancesInfo.innerText = `Chances = ${chancesSlider.value}`;
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    PlayGame(index);
  });
})


//APPLICATION
StartGame();
PlayGame();
