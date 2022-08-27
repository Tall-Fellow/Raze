function createHiPPICanvas(w, h) {
    let cv    = document.createElement("canvas");
    cv.width  = w * ratio;
    cv.height = h * ratio;
    cv.style.width  = w + "px";
    cv.style.height = h + "px";
    cv.getContext("2d").scale(ratio, ratio);
    return cv;
}

// Global vars
var ratio        = window.devicePixelRatio;
var cW           = 800;
var cH           = 600;
var canvas       = createHiPPICanvas(cW, cH);
var ctx          = canvas.getContext("2d");
var refreshRate  = 10;
var lengthOfDay  = 5;
var gameTime;
var gameRunning;
var game;
var time;
var dayTime;
var ground;
var characters;
var projectiles;
var spawner;
var hero;
var upPressed    = false;
var downPressed  = false;
var leftPressed  = false;
var rightPressed = false;
var spacePressed = false;
// End global vars

function startGame() {
    gameRunning = true;
    gameTime    = 1;
    dayTime     = true;

    ground      = new Ground(75, 2);
    characters  = new Array();
    projectiles = new Array();
    spawner     = new Spawner(canvas, ctx, ground, charClasses, projClasses, characters, projectiles);

    spawner.spawnChar(0, cW / 3, cH / 2);
    hero = characters[0];

    game = setInterval(draw, refreshRate);
    time = setInterval(updateTime, 1000);
}

function resetGame() {
    gameRunning = false;
    clearInterval(game);
    clearInterval(time);
    ctx.clearRect(0, 0, cW, cH);
}

function draw() {
    // Clears whole canvas
    ctx.clearRect(0, 0, cW, cH);

    // Position updates
    updatePlayerPos();
    ground.updatePosition();
    characters.forEach(char => {
        char.updatePosition();
    });
    projectiles.forEach(projectile => {
        projectile.updatePosition();
    });

    // Collision checks
    characters.forEach(char => {
        char.checkBounds();
    });

    projectiles.forEach(projectile => {
        if (projectile.collision(hero) && projectile.impact == false) {
            if (hero.takeDamage(projectile)) {
                playerDeath();
            }

            projectile.setImpact();
        }
    });

    // Projectile management
    var delOffset = 0;
    for (let i = 0; i < projectiles.length; i++) {
        if (projectiles[i].updateLifeTime() || projectiles[i].isOutOfBounds()) {
            projectiles.splice(i - delOffset);
            delOffset++;
        }
    }
    
    // Render
    if (gameRunning) {
        ground.draw();
        characters.forEach(char => {
            char.draw();
        });
        projectiles.forEach(projectile => {
            projectile.draw();
        });
    }
}

function scaleCoeff(maxW, maxH, imgW, imgH) { return Math.min(maxW/imgW, maxH/imgH); }

function updateTime() { 
    if (gameTime % lengthOfDay == 0) {
        ground.toggleTimeOfDay();
        
        //spawner.spawnChar(1, cW-90, ground.getFloor()); // Temp
        //spawner.spawnChar(1, cW-80, ground.getFloor()); // Temp
        //spawner.spawnChar(1, cW-70, ground.getFloor()); // Temp
        //spawner.spawnChar(1, cW-60, ground.getFloor()); // Temp
        spawner.spawnChar(1, cW-50, ground.getFloor()); // Temp

        spawner.spawnProj(0, cW-50, cH/2); // Temp
        spawner.spawnProj(0, cW-50, cH/3); // Temp
    }

    gameTime++; 
}

// Create canvas in DOM
document.getElementById("canvas").appendChild(canvas);

function playerDeath() {
    resetGame();

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cW, cH);
    
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    
    ctx.font = "40px monospace"
    ctx.fillText("You died...", cW / 2, cH / 2);
    
    ctx.font = "18px monospace";
    ctx.fillText("Press enter to play again", cW / 2, cH / 2 + 35);
}

// Starting screen
ctx.fillStyle = "white";
ctx.fillRect(0, 0, cW, cH);

ctx.textAlign = "center";
ctx.fillStyle = "black";

ctx.font = "40px monospace"
ctx.fillText("Raze", cW / 2, cH / 2);

ctx.font = "18px monospace";
ctx.fillText("Press enter to play...", cW / 2, cH / 2 + 35);