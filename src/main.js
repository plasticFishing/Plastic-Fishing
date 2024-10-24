import kaplay from "kaplay";
import "kaplay/global";

kaplay({
    buttons: {
        jump: {
            keyboard: ["space", "up"],
            gamepad: ["south"],
        },
    },
});
loadSprite("goober", "sprites/goober.png")

// City area
scene("city", () => {
    add([
        sprite("goober"),
		scale(4,4),
    ]);
});
go("city");