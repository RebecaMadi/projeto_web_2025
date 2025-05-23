import { TAMX } from "./config.js"
import { space } from "./space.js"
import { Bullet, bullets } from "./bullet.js";


const directions = [
  "assets/png/playerLeft.png",
  "assets/png/player.png",
  "assets/png/playerRight.png",
]

class Ship {
  constructor() {
    this.element = document.createElement("img")
    this.element.id = "ship"
    this.direction = 1
    this.element.src = directions[this.direction]
    this.element.style.bottom = "20px"
    this.isDamaged = false
    
    this.element.style.left = `${TAMX / 2 - 50}px`

    this.element.onload = () => { this.width = this.element.naturalWidth; }

    space.element.appendChild(this.element)
  }


  changeDirection(giro) { // -1 +1
    if (this.direction + giro >= 0 && this.direction + giro <= 2)
      this.direction = this.direction + giro
    this.element.src = directions[this.direction]
  }

  move() {
    const currentLeft = parseInt(this.element.style.left);

    if (this.direction === 0 && currentLeft > 0){
      this.element.style.left = `${currentLeft - 2}px`; // 2px para a esuqerda se estiver dentro dos limites
    }
    if (this.direction === 2 && currentLeft + this.width < TAMX) {
      this.element.style.left = `${currentLeft + 2}px`; // 2px para a direita se estiver dentro dos limites
    }
  }

  damaged() {
    if (!this.isDamaged) return

    this.element.src = "assets/png/playerDamaged.png"

    setTimeout(() => {
      this.isDamaged = false
      this.element.src = directions[this.direction]
    }, 5000)
  }

  shot() {
      const x = parseInt(this.element.style.left) + 50; 
      const y = this.element.offsetTop;
      bullets.push(new Bullet(x, y));
      console.log("shot")
    }
}

export const ship = new Ship()