import kaplay from "kaplay";
import "kaplay/global";

kaplay();

// Load sprites
loadSprite("goober", "sprites/goober.png");

// City area
scene("city", () => {
  setCursor("none");
  const SPEED = 320;

  // Player
  const player = add([sprite("goober"), pos(center()), scale(4, 4)]);

  // Player movement in city area. In the final game this will be removed this was mostly a test.
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

  // Temp
  go("fishing");
});

// Fishing Mode
scene("fishing", () => {
  setBackground("#4557a5");
});

// Main Menu
scene("main_menu", () => {
  setBackground("#313238");
  add([
    text("Plastic Fishing"),
    pos(center().x - self.x / 2, center().y - self.y / 2 + 50),
  ]);
  add([
    //rect(200, 40),
    text("Start"),
    pos(center().x, center().y),
    area(),
    "play",
  ]);
  onClick("play", () => {
    go("city");
  });
});

// Load main menu
go("main_menu");
