export function isColliding(ship, enemy) {
  const rect1 = ship.getBoundingClientRect();
  const rect2 = enemy.getBoundingClientRect();

  return !(
    rect1.top > rect2.bottom ||
    rect1.bottom < rect2.top ||
    rect1.right < rect2.left ||
    rect1.left > rect2.right
  );
}
