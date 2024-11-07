import kaplay from "kaplay";
import "kaplay/global";

kaplay({
  buttons: {
    offsetRight: {
      keyboard: ["right", "d"],
    },
    offsetLeft: {
      keyboard: ["left", "a"],
    },
  },
});

// Load sprites
loadSprite("goober", "sprites/goober.png");
loadSprite("bobber", "sprites/bobber.png");

// Inventory Stuff
let trashInventory = [];
let inventoryCap = 5;

// Gear Quality
let fishingRod = "old";
let scubaGear = "none";
let run = 0;

let day = 1;
let time = 600;

// Bind fullscreen to the f key
function fullscreen() {
  onKeyPress("f", () => {
    setFullscreen(true);
    if (isFullscreen) {
      setFullscreen(false);
    }
  });
}

// Spawn Trash
function spawnTrash(amount) {
  for (var x = 0; x < amount; x++) {
    add([
      rect(20, 20),
      color("#ff00ff"),
      rotate(rand(180)),
      pos(rand(width()), rand(height())),
      "trash",
    ]);
  }
}

// City area
scene("city", () => {
  fullscreen();

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
  spawnTrash(rand(12));
  fullscreen();
  // Variables
  let fishCap = 5;
  let bobberSpawn = 0;
  let bobberCasted = false;
  let bobberCooldown = 0;

  let bobberOffset = 0;
  // Set stuff
  setBackground("#4557a5");
  setCursor("crosshair");

  // Logic
  onClick(() => {
    if (!bobberCasted) {
      bobberSpawn = mousePos().x;
      bobberCasted = true;
      bobberCooldown = 30;
      add(hook); // add hook when line is cast
    }
    if (bobberCasted && !bobberCooldown) {
      bobberCasted = false;
      setCursor("crosshair");
      destroy(hook); // remove hook when line is not cast
    }
  });

  onKeyDown("offsetRight", () => {
    bobberOffset += 0.5;
  });

  onKeyDown("offsetLeft", () => {
    bobberOffset -= 0.5;
  });

  onKeyDown("space", () => {
    spawnTrash(10);
  });
  const hook = make([  // changed to make() so that hook is not in right corner
    sprite("bobber"),
    scale(3),
    pos(-10, -10),
    color("#ff0000"),
    "hook",
  ]);
  // Loop
  onUpdate(() => {
    if (bobberCooldown) {
      bobberCooldown--;
    }
    if (bobberCasted) {
      let pointX = bobberSpawn + bobberOffset;
      hook.moveTo(pointX - 25, mousePos().y - 10);

      setCursor("none");
      drawLine({
        p1: vec2(bobberSpawn, 0),
        p2: vec2(pointX, mousePos().y),
        width: 2,
        color: BLACK,
      });
    }

    
   onCollide("hook", "trash", () => {
     debug.log("there's no way this works");
  });
  });
});

// Main Menu
scene("main_menu", () => {
  fullscreen();
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
