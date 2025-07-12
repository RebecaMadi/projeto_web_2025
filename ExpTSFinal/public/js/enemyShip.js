import { TAMX, PROB_ENEMY_SHIP, TAMY, MAX_SPEED, MIN_SPEED } from "./config.js"
import { space } from "./space.js"

class EnemyShip {
  constructor() {
    this.element = document.createElement("img")
    this.element.className = "enemy-ship"
    this.element.src = "assets/png/enemyShip.png"
    this.element.style.top = "-20px"
    this.element.style.left = `${parseInt(Math.random() * TAMX) - 50}px`
    space.element.appendChild(this.element)

    this.speed = Math.ceil(Math.random() * (MAX_SPEED - MIN_SPEED))
  }
  move(multiplier) {
    if(multiplier + this.speed <= MAX_SPEED) this.speed += multiplier
    else this.speed = MAX_SPEED
    this.element.style.top = `${parseInt(this.element.style.top) + this.speed}px`
    
    if (parseInt(this.element.style.top) > TAMY 
    || parseInt(this.element.style.top) < -20) {
      this.remove();
    }
  }

  remove() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

export const enemyShips = []

export const createRandomEnemyShip = () => {
  if (Math.random() < PROB_ENEMY_SHIP) enemyShips.push(new EnemyShip())
}

export const moveEnemyShips = (multiplier) => {
  enemyShips.forEach(e => e.move(multiplier))
}

