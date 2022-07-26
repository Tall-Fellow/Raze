// Global vars
var ratio        = window.devicePixelRatio;
var cW           = 800;
var cH           = 600;
var canvas       = createHiPPICanvas(cW, cH);
var ctx          = canvas.getContext("2d");
var refreshRate  = 60;
var lengthOfDay  = 5;
var gameTime;
var gameRunning;
var game;
var time;
var dayTime;
var ground;
var characters;
var projectiles;
var sprites;
var spawner;
var hero;
var heroSpd;
var upPressed    = false;
var downPressed  = false;
var leftPressed  = false;
var rightPressed = false;
var spacePressed = false;
// End global vars

// Initialization
sprites = getSprites();
appendCanvas();
renderStartScreen();

function startGame() {
    gameRunning = true;
    gameTime    = 1;
    dayTime     = true;

    ground      = new Ground(75, 2);
    characters  = new Array();
    projectiles = new Array();
    spawner     = new Spawner(canvas, ctx, ground, characters, projectiles, sprites);

    spawner.spawnChar(0, cW / 3, cH / 2);
    hero    = characters[0];
    heroSpd = 5;

    game = setInterval(gameLogicLoop, 1000/refreshRate);
    time = setInterval(updateTime, 1000);
    window.requestAnimationFrame(render);
}

function resetGame() {
    gameRunning = false;
    clearInterval(game);
    clearInterval(time);
    ctx.clearRect(0, 0, cW, cH);
}

function playerDeath() {
    resetGame();
    renderDeathScreen();
}

function despawnProjs() {
    for (let i = 0; i < projectiles.length; i++) {     
        if (projectiles[i].updateLifeTime() || projectiles[i].isOutOfBounds()) {
            projectiles.splice(i, 1);
            i--;
        }
    }
}

function checkProjsHit() {
    projectiles.forEach(projectile => {
        for (let i = 0; i < characters.length; i++) {
            if (projectile.collision(characters[i]) && projectile.impact == false && projectile.team != characters[i].team) {
                if (characters[i].takeDamage(projectile)) {
                    if (characters[i] === hero) {
                        playerDeath();
                    }

                    else {
                        characters.splice(i, 1);
                        i--;
                    }
                }

                projectile.setImpact();
            }
        }
    });
}

function updateGameObjects() {
    // Position & Action updates
    ground.updatePosition();

    characters.forEach(char => {
        char.updatePosition();
        char.action();
    });

    projectiles.forEach(projectile => {
        projectile.updatePosition();
    });

    // Collision checks
    characters.forEach(char => {
        char.checkBounds();
    });

    // Projectile management
    checkProjsHit();
    despawnProjs();
}

function render() {
    // Render
    if (gameRunning) {
        // Clears whole canvas
        ctx.clearRect(0, 0, cW, cH);
        
        ground.draw();

        characters.forEach(char => {
            char.draw();
        });

        projectiles.forEach(projectile => {
            projectile.draw();
        });
        
        window.requestAnimationFrame(render);
    }
}

function gameLogicLoop() {
    if (document.visibilityState == "visible") {
        updateGameObjects();
    }
}

function updateTime() {
    if (document.visibilityState == "visible") {
        if (gameTime % lengthOfDay == 0) {
            ground.toggleTimeOfDay();
            
            //spawner.spawnChar(1, cW-90, ground.getFloor()); // Temp
            //spawner.spawnChar(1, cW-80, ground.getFloor()); // Temp
            //spawner.spawnChar(1, cW-70, ground.getFloor()); // Temp
            //spawner.spawnChar(1, cW-60, ground.getFloor()); // Temp
            spawner.spawnChar(1, cW-50, ground.getFloor()); // Temp
            //spawner.spawnProj(0, 600, 600);
        }

        gameTime++;
    }
}