import { TAMX, PROB_ENEMY_METEOR, TAMY } from "./config.js"
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
  }
  move() {
    this.element.style.top = `${parseInt(this.element.style.top) + 1}px`
    if(this.element.style.top > TAMY) this.element.remove();
  }
}

export const enemyMeteors = [] 

export const createEnemyMeteor = () => {
  if (Math.random() < PROB_ENEMY_METEOR) enemyMeteors.push(new EnemyMeteor())
} 

export const moveEnemyMeteors = () => {
  enemyMeteors.forEach(e => e.move()) 
} 