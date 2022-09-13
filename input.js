function updateFromInput() {
    updatePlayerPos();
}

function keyDownHandler(e) {
    switch (e.code) {
        case "Enter":
            if (!gameRunning) {
                gameRunning = 1;
                startGame();
            }

            break;

        case "KeyW":
        case "ArrowUp":
            upPressed = true;
            break;

        case "KeyS":
        case "ArrowDown":
            downPressed = true;
            break;

        case "KeyA":
        case "ArrowLeft":
            leftPressed = true;
            break;

        case "KeyD":
        case "ArrowRight":
            rightPressed = true;
            break;

        case "Space":
            spacePressed = true;
            break;

        default:
            break;
    }
}

function keyUpHandler(e) {
    switch (e.code) {
        case "KeyW":
        case "ArrowUp":
            upPressed = false;
            break;

        case "KeyS":
        case "ArrowDown":
            downPressed = false;
            break;

        case "KeyA":
        case "ArrowLeft":
            leftPressed = false;
            break;

        case "KeyD":
        case "ArrowRight":
            rightPressed = false;
            break;

        case "Space":
            spacePressed = false;
            break;

        default:
            break;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);