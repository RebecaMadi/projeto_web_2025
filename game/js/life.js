import { space } from "./space.js"

class Life {
  constructor(index) {
    this.element = document.createElement("img")
    this.element.className = "life"
    this.element.src = "assets/png/life.png"
    this.element.style.position = "absolute"; 
    this.element.style.top = "20px"
    this.element.style.right = `${100 + index * 40}px`
    space.element.appendChild(this.element)
  }

  remove() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }

}

const lives = []
let contLves = 3;

export const createLife = () => {
  lives.forEach(life => life.remove());
  lives.length = 0;
  contLves = 3;

  for(let i=0; i<3; i++){
    const life = new Life(i);
    lives.push(life)
  }
}

export const removeLife = () => {
  console.log(lives)
  const lostLife = lives.pop(); 
  if (lostLife) lostLife.remove();
  contLves -= 1;
}

export function getLives() {
  return contLves;
}