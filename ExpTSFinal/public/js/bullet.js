import { space } from "./space.js";

export class Bullet {
  constructor(x, y) {
    this.element = document.createElement("img");
    this.element.src = "assets/png/laserGreen.png";
    this.element.className = "bullet";
    this.element.style.position = "absolute";
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
    this.alive = true;

    space.element.appendChild(this.element);
  }

  move() {
    if (!this.alive) return;
    const top = parseInt(this.element.style.top);
    if (top <= 0) {
      this.remove();
      return;
    }
    this.element.style.top = `${top - 2}px`;
  }

  hit(targetElement) {
    this.alive = false;
    this.element.src = "assets/png/laserGreenShot.png";
    setTimeout(() => {
      this.remove();
      targetElement.remove();
    }, 500);
  }

  remove() {
    if (this.element.parentNode) this.element.remove();
  }
}

export const bullets = [];

export const moveBullets = () => {
  bullets.forEach((b, i) => {
    b.move();
    if (!b.alive && b.element.parentNode === null) {
      bullets.splice(i, 1);
    }
  });
};
