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
var gameTime     = 1;
var dayTime      = true;
var lengthOfDay  = 5;
var ground       = new Ground(75, 2);
var characters   = new Array();
var projectiles  = new Array();
var spawner      = new Spawner(canvas, ctx, ground, charClasses, projClasses, characters, projectiles);
var hero         = 0;
var upPressed    = false;
var downPressed  = false;
var leftPressed  = false;
var rightPressed = false;
var spacePressed = false;
// End global vars

function startup(refR) {
    spawner.spawnChar(0, cW / 3, cH / 2);
    hero = characters[0];
    setInterval(draw, refR);
    setInterval(updateTime, 1000);
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
           hero.takeDamage(projectile);
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
    ground.draw();
    characters.forEach(char => {
        char.draw();
    });
    projectiles.forEach(projectile => {
        projectile.draw();
    });
}

function scaleCoeff(maxW, maxH, imgW, imgH) { return Math.min(maxW/imgW, maxH/imgH); }

function updateTime() { 
    if (gameTime % lengthOfDay == 0) {
        ground.toggleTimeOfDay();
        
        //spawner.spawnChar(1, canvas.width-90, ground.getFloor()); // Temp
        //spawner.spawnChar(1, canvas.width-80, ground.getFloor()); // Temp
        //spawner.spawnChar(1, canvas.width-70, ground.getFloor()); // Temp
        //spawner.spawnChar(1, canvas.width-60, ground.getFloor()); // Temp
        spawner.spawnChar(1, cW-50, ground.getFloor()); // Temp

        spawner.spawnProj(0, cW-50, cH/2); // Temp
        spawner.spawnProj(0, cW-50, cH/3); // Temp
    }

    gameTime++; 
}


document.getElementById("canvas").appendChild(canvas);

// Starting screen
ctx.fillStyle = "white";
ctx.fillRect(0, 0, cW, cH);

ctx.textAlign = "center";
ctx.fillStyle = "black";

ctx.font = "40px monospace"
ctx.fillText("Raze", cW / 2, cH / 2);

ctx.font = "18px monospace";
ctx.fillText("Press enter to play...", cW / 2, cH / 2 + 35);