import { TAMX, PROB_ENEMY_METEOR, TAMY, MAX_SPEED, MIN_SPEED } from "./config.js"
import { space } from "./space.js"

const sizes = [
  "assets/png/meteorBig.png",
  "assets/png/meteorSmall.png",
]

class EnemyMeteor{
  constructor() {
    this.size = Math.floor(Math.random() * 2);
    this.element = document.createElement("img")
    this.element.style.position = "absolute"; 
    this.element.className = "enemy-meteor"
    this.element.src = sizes[this.size]
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

export const enemyMeteors = [] 

export const createEnemyMeteor = () => {
  if (Math.random() < PROB_ENEMY_METEOR) enemyMeteors.push(new EnemyMeteor())
} 

export const moveEnemyMeteors = (multiplier) => {
  enemyMeteors.forEach(e => e.move(multiplier)) 
} 