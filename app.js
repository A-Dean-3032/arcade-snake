let gameBoard = document.getElementById('board');
let startButton = document.getElementById('start_button');
let title = document.getElementById('game_title');
let tryAgain = document.getElementById('try_again_button');
let currentScoreDisplay = document.getElementById('score');
let currentScore 
let highScoreDisplay = document.getElementById('high_score');
let highScore 
let gameRow = document.getElementsByClassName('game_row');
let gameSpace = document.getElementsByClassName('game_space');
let direction = 0;
let snake = [143, 142, 141, 140];
let intervalTime = 0;
let interval = 0;
let newSpace;

function makeSnake (life) {
  for (let i = 0; i < snake.length; ++i) {
    let snakeSpace = snake[i];
    if (life) {
      gameSpace[snakeSpace].classList.add('snake'); 
    } else {
      gameSpace[snakeSpace].classList.add('dead_snake'); 
    }
  }
}

function moveOnce () {
  let tail = snake[snake.length-1];
  let tailSpace = gameSpace[tail];
  tailSpace.classList.remove('snake');
  snake.pop();

  newSpace = snake[0] + direction;
  gameSpace[newSpace].classList.add('snake');
  snake.unshift(newSpace);
  eatApple(tail);
}

function slither () {
  if (checkHits()) {
    makeSnake(false);
    alert('You hit something!');
    tryAgain.classList.remove('nodisplay');
    return clearInterval(interval);
  } else {
    moveOnce();
  }
}

function eatApple (poppedTail) {
  if (gameSpace[snake[0]].classList.contains('apple')) {
    gameSpace[snake[0]].classList.remove('apple');
    snake.push(poppedTail);
    gameSpace[poppedTail].classList.add('snake');
    newApple();
    currentScore++;
    currentScoreDisplay.innerText = `Score: ${currentScore}`;
    if (highScore === currentScore - 1) {
      highScore = currentScore;
      highScoreDisplay.innerText = `High Score: ${highScore}`;
    }
  }
}

function checkHits () {
  if (
    // If snake hit top 
    (snake[0] - 17 < 0 && direction === -17) ||
    // or snake hit bottom
    (snake[0] + 17 > 288 && direction === 17) ||
    // or snake hit left 
    (snake[0] % 17 === 0 && direction === -1) ||    
    // or snake hit right
    (snake[0] % 17 === 16 && direction === 1) ||
    // or snake hit itself 
    (gameSpace[snake[0] + direction].classList.contains('snake'))
  ) {
    // snake hit something
    return true;
  } else {
    // snake hit nothing
    return false
  }
}

function startingState () {
  title.classList.add('post_start_title');
  startButton.classList.add('nodisplay');
  gameBoard.classList.remove('nodisplay');
  gameBoard.classList.add('yesdisplay');
  currentScore = 0;
  direction = 1;
  intervalTime = 250;
  snake = [143, 142, 141, 140];
  interval = setInterval(slither, intervalTime);
  currentScoreDisplay.classList.remove('nodisplay');
  currentScoreDisplay.innerText = `Score: ${currentScore}`;
  highScoreDisplay.classList.remove('nodisplay');
  if (highScore === undefined) {
    highScore = currentScore;
    highScoreDisplay.innerText = `High Score: ${currentScore}`;
  } else {
    highScoreDisplay.innerText = `High Score: ${highScore}`;
  }
    let div = document.createElement('div');
    gameBoard.appendChild(div);
    div.classList.add('game_row');
    for (let j = 0; j < 289; ++j) {
      let divChild = document.createElement('div');
      div.appendChild(divChild); 
      divChild.classList.add('game_space');
    }
    newApple();
    makeSnake(true);
  }

function newApple () {
  function appleSpaceFinder () {
    let appleSpaceLocal = Math.floor(Math.random() * 289);
    return appleSpaceLocal;
  }

  for (let i = 0; i !== -1; ++i) {
    let appleSpace = appleSpaceFinder();
    if (!gameSpace[appleSpace].classList.contains('snake')) {
      let newApple = gameSpace[appleSpace];
      newApple.classList.add('apple');
      return;
    } else {
      continue;
    }
 }
}

function restart () {
  for (let i = 0; i < 289; ++i) {
    let currentSpace = gameSpace[i];
    if (currentSpace.classList.contains('snake')) {
      currentSpace.classList.remove('snake');
    }
    if (currentSpace.classList.contains('dead_snake')) {
      currentSpace.classList.remove('dead_snake');
    }
    if (currentSpace.classList.contains('apple')) {
      currentSpace.classList.remove('apple');
    }
  }
  currentScore = 0;
  currentScoreDisplay.innerText = `Score: ${currentScore}`;
  direction = 1;
  intervalTime = 250;
  snake = [143, 142, 141, 140];
  interval = setInterval(slither, intervalTime);
  tryAgain.classList.add('nodisplay');
  newApple();
  makeSnake(true);
}

startButton.addEventListener('click', startingState);
tryAgain.addEventListener('click', restart);
document.addEventListener('keydown', function (event) {
  if((event.code === 'ArrowLeft' || event.code === 'KeyA') && direction !== 1) {
    direction = -1;
  };
  if((event.code === 'ArrowUp' || event.code === 'KeyW') && direction !== 17) {
    direction = -17;
  };
  if((event.code === 'ArrowRight' || event.code === 'KeyD') && direction !== -1) {
    direction = 1;
  };
  if((event.code === 'ArrowDown' || event.code === 'KeyS') && direction !== -17) {
    direction = 17;
  };
});
