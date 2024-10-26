import kaplay from "kaplay";
import "kaplay/global";

kaplay();

// Load sprites
loadSprite("goober", "sprites/goober.png");

// City area
scene("city", () => {
  const SPEED = 320;

  // Player
  const player = add([sprite("goober"), pos(center()), scale(4, 4)]);

  // Player movement in city area
  onKeyDown("d", () => {
    player.move(SPEED, 0);
  });
  onKeyDown("a", () => {
    player.move(-SPEED, 0);
  });
  onKeyDown("w", () => {
    player.move(0, -SPEED);
  });
  onKeyDown("s", () => {
    player.move(0, SPEED);
  });
});

// Load area
go("city");
