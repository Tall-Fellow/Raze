// Global vars
var canvas       = document.getElementById("canvas");
var ctx          = canvas.getContext("2d");
var gameTime     = 1;
var dayTime      = true;
var lengthOfDay  = 5;
var ground       = new Ground(50, 2);
var characters   = new Array();
var projectiles  = new Array();
var spawner      = new Spawner(canvas, ctx, ground, charClasses, projClasses, characters, projectiles);
var upPressed    = false;
var downPressed  = false;
var leftPressed  = false;
var rightPressed = false;
var spacePressed = false;
// End global vars

function startup(refreshRate) {
    spawner.spawnChar(0, canvas.width / 3, canvas.height / 2);
    setInterval(draw, refreshRate);
    setInterval(updateTime, 1000);
}

function draw() {
    // Clears whole canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
        //if (projectile.collision(hero) && projectile.impact == false) {
        //    hero.takeDamage(projectile);
        //    projectile.setImpact();
        //}
    });

    // Misc
        // Projectile management
    for (let i = 0; i < projectiles.length; i++) {
        if (projectiles[i].updateLifeTime() || projectiles[i].isOutOfBounds()) {
            removeProjectile(i, projectiles);
            i--;
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
        spawner.spawnChar(1, canvas.width, ground.getFloor() - 30); // Temp
        spawner.spawnChar(1, canvas.width+10, ground.getFloor() - 28); // Temp
        spawner.spawnChar(1, canvas.width+20, ground.getFloor() - 26); // Temp
        spawner.spawnChar(1, canvas.width+30, ground.getFloor() - 24); // Temp
        spawner.spawnChar(1, canvas.width+40, ground.getFloor() - 22); // Temp
    }

    gameTime++; 
}

startup(10);