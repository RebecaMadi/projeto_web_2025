import { space } from "./space.js"

class Score {
    constructor() {
      this.points = 0;
      this.element = document.createElement("div");
      this.element.id = "score";
      this.element.style.position = "absolute";
      this.element.style.top = "20px";
      this.element.style.right = "10px";
      this.element.style.fontSize = "24px";
      this.element.style.color = "white";
      this.element.innerHTML = ` ${this.points}`;
      this.element.style.fontFamily = "sans-serif";
      this.element.style.fontWeight="bold"
      space.element.appendChild(this.element)
    }

    updatePoints(points) {
      this.points += points;
      const formattedScore = String(this.points).padStart(6, '0');
      this.element.innerHTML = ` ${formattedScore}`;
    }
  }
  
export const score = new Score();
  