import { FPS } from "./config.js"
import { space } from "./space.js"
import { ship } from "./ship.js"
import { score } from "./score.js"
import { createRandomEnemyShip, moveEnemyShips, enemyShips } from "./enemyShip.js"
import { createLife, removeLife, getLives } from "./life.js"
import { isColliding } from "./utils.js"
import { TAMX, TAMY } from "./config.js"
import { createEnemyMeteor, moveEnemyMeteors, enemyMeteors } from "./enemyMeteor.js"
import { createRandomEnemyUFO, moveEnemyUFOs, enemyUFOs } from "./enemyUFO.js"
import { moveBullets, bullets } from "./bullet.js"

let isRunning = false
let isPaused = false
let gameOver = false

function init() {
  setInterval(run, 1000 / FPS)
}

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    if (!isRunning) {
      isRunning = true
      isPaused = false
      init()
    }
  }

  if (e.key === "p") {
    if (isRunning) {
      isPaused = !isPaused
    }
  }

  if (e.key === " ") {
    console.log("????")
    ship.shot();
  }

  if (!isRunning || isPaused) return

  if (e.key === "ArrowLeft") ship.changeDirection(-1)
  if (e.key === "ArrowRight") ship.changeDirection(+1)
})


function checkBulletHits() {
  bullets.forEach((bullet) => {
    if (!bullet.alive) return;

    const checkHit = (enemyList, points) => {
      for (let i = 0; i < enemyList.length; i++) {
        const enemy = enemyList[i];
        if (isColliding(bullet.element, enemy.element)) {
          bullet.alive = false;
          bullet.element.src = "assets/png/laserGreenShot.png";
          score.updatePoints(points)
          if (enemy.element.parentNode) enemy.element.remove();
          setTimeout(() => {
            if (bullet.element.parentNode) bullet.element.remove();
          }, 500);
          enemyList.splice(i, 1);
          return true;
        }
      }
      return false;
    };

    let smallMeteors = []
    let bigMeteors = []

    enemyMeteors.forEach((meteor) => {
      if(meteor.size == 0){
        bigMeteors.push(meteor);
      }else{
        smallMeteors.push(meteor);
      }
    })

    checkHit(bigMeteors, 10)
    checkHit(enemyUFOs, 20)
    checkHit(enemyShips, 50)
    checkHit(smallMeteors, 100)
  });
}

function colllisionsEnemies() {
  enemyShips.forEach((enemy, index) => {
    if (isColliding(ship.element, enemy.element)) {
      ship.isDamaged = true;
      ship.damaged();
      enemy.element.remove();
      removeLife();
      enemyShips.splice(index, 1);
      console.log("colidiu com um enemy ship\n")
    }
  });

  enemyMeteors.forEach((enemy, index) => {
    if (isColliding(ship.element, enemy.element)) {
      ship.isDamaged = true;
      ship.damaged();
      enemy.element.remove();
      removeLife();
      enemyMeteors.splice(index, 1);
      console.log("colidiu com um enemy meteor\n")
    }
  });

  enemyUFOs.forEach((enemy, index) => {
    if (isColliding(ship.element, enemy.element)) {
      ship.isDamaged = true;
      ship.damaged();
      enemy.element.remove();
      removeLife();
      enemyUFOs.splice(index, 1);
      console.log("colidiu com um enemy UFO\n")
    }
  });
}


function reset(){
  if (getLives() < 0) {
    gameOver = true;
    alert("Game Over! :(");
    
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Reiniciar Jogo";
    restartBtn.style.position = "fixed";
    restartBtn.style.top = `${TAMY / 2 - 50}px`
    restartBtn.style.left = `${TAMX / 2 - 70}px`
    restartBtn.style.padding = "10px 20px";
    restartBtn.style.fontSize = "18px";
    restartBtn.style.zIndex = "10000";
    
    space.element.appendChild(restartBtn);
    
    restartBtn.addEventListener("click", () => {
      window.location.reload();
      isRunning = false;
      isPaused = false;
      gameOver = false;
    });
  }
}

function start(){
  if(!isRunning && !isPaused){
    createLife()
    console.log("init\n")
  }
}

function run() {
  start()

  if (!isRunning || isPaused || gameOver) return

  space.move()
  ship.move()

  createRandomEnemyShip()
  createEnemyMeteor()
  createRandomEnemyUFO()
  moveEnemyMeteors()
  moveEnemyShips()
  moveEnemyUFOs()
  moveBullets()
  colllisionsEnemies()
  checkBulletHits()

  
  reset();
  console.log("Ue\n");
}

init()