// // state
// let state;

// function buildInitialState() {

// }

// // render
// function renderState() {

// }

// // maybe a dozen or so helper functions for tiny pieces of the interface

// // listeners
// function onBoardClick() {
//   // update state, maybe with another dozen or so helper functions...

//   renderState() // show the user the new state
// }
// const board = document.getElementById('board');
// board.addEventListener('click', onBoardClick); // etc

// // add to above
// function tick() {
//     // this is an incremental change that happens to the state every time you update...
  
//     renderState()
//   }
  
//   setInterval(tick, 1000 / 30) // as close to 30 frames per second as possible
  
//   // now you might have things like
//   document.addEventListener('keydown', function (event) {
//     // here you might read which key was pressed and update the state accordingly
//   })

//   Code that I've made without tutorial guidance^^
let gameBoard = document.getElementById('board');
let startButton = document.getElementById('start_button');
let title = document.getElementById('game_title');
let tryAgain = document.getElementById('try_again_button');
let currentScoreDisplay = document.getElementById('score');
let currentScore = currentScoreDisplay.value;
let highScoreDisplay = document.getElementById('high_score');
let highScore = highScoreDisplay.value;
let gameRow = document.getElementsByClassName('game_row');
let gameSpace = document.getElementsByClassName('game_space');
let direction = 1;
let snake = [143, 142, 141, 140];

function makeSnake () {
  for (let i = 0; i < snake.length; ++i) {
    let snakeSpace = snake[i];
    gameSpace[snakeSpace].classList.add('snake');
  }
}


function startingState () {
  title.classList.toggle('post_start_title');
  startButton.classList.add('nodisplay');
  gameBoard.classList.remove('nodisplay');
  gameBoard.classList.add('yesdisplay');
  currentScore = 0;
    if (highScore === undefined) {
      highScore = currentScore;
    }
  currentScoreDisplay.classList.remove('nodisplay');
  highScoreDisplay.classList.remove('nodisplay');
    let div = document.createElement('div');
    gameBoard.appendChild(div);
    div.classList.add('game_row');
    for (let j = 0; j < 289; ++j) {
      let divChild = document.createElement('div');
      div.appendChild(divChild); 
      divChild.classList.add('game_space');
    }
  makeSnake ();
  newApple ();
  }

function newApple () {
  function appleSpaceFinder () {
    let appleSpaceLocal = Math.floor(Math.random() * gameRow.length);
    return appleSpaceLocal;
  }
  for (let i = 0; i !== -1; ++i) {
    let appleElem = document.getElementsByClassName('apple');
    console.log(appleElem);
    let appleSpace = appleSpaceFinder();
    if (!gameRow[appleSpace].classList.contains('snake')) {
      let newApple = gameRow[appleSpace];
      console.log(newApple);
      console.log(gameRow);
      newApple.classList.add('apple');
      console.log('Apple added!');
      return;
    } else {
      continue;
    }
 }
}

startButton.addEventListener('click', startingState);
// On keydowns, change the direction
document.addEventListener('keydown', function (event) {
  // here you might read which key was pressed and update the state accordingly
  if(event.code === 'ArrowLeft' || event.code === 'KeyA') {
    direction = -1;
  };
  if(event.code === 'ArrowUp' || event.code === 'KeyW') {
    direction = -17;
  };
  if(event.code === 'ArrowRight' || event.code === 'KeyD') {
    direction = 1;
  };
  if(event.code === 'ArrowDown' || event.code === 'KeyS') {
    direction = 17;
  };
});
setInterval (function gameplayState () {
  currentScoreDisplay.innerText = `Score: ${currentScore}`
  highScoreDisplay.innerText = `High Score: ${highScore}`;
  // Log previous highScore here instead;

}, 
300);
