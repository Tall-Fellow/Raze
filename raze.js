// Global vars
var gameTime;
var gameRunning;
var game; // Holds the game loop
var time;
var dayTime;
var environment;
var entities;
var characters;
var projectiles;
var sprites;
var spawner;
var hero;
var heroSpd      = 5;
var ratio        = window.devicePixelRatio;
var cW           = 800; // Canvas width
var cH           = 600; // Canvas height
var canvas       = createHiPPICanvas(cW, cH);
var ctx          = canvas.getContext("2d");
var refreshRate  = 60;
var lengthOfDay  = 5;
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
// End initialization

function startGame() {
    gameRunning = true;
    gameTime    = 1;
    dayTime     = true;

    environment = new Environment(sprites[3]);
    entities    = new Array();
    characters  = new Array();
    projectiles = new Array();
    spawner     = new Spawner(canvas, ctx, environment, entities, characters, projectiles, sprites);

    spawner.spawnEnt(0, 147, 30);
    spawner.spawnChar(0, cW / 3, cH / 2); // Spawns the hero character
    hero = characters[0];

    game = setInterval(gameLogicLoop, 1000/refreshRate); // Start the main game loop at desired fps
    time = setInterval(updateTime, 1000); // Start the game clock
    window.requestAnimationFrame(render); // Start drawing frames
}

function resetGame() {
    gameRunning = false;
    clearInterval(game); // Disable main game loop
    clearInterval(time); // Disable game clock
    ctx.clearRect(0, 0, cW, cH); // Clear entire canvas
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

// Detects projectile collisions with characters, if a target is hit it takes damage and might die if no HP remains.
function checkProjsHit() {
    projectiles.forEach(projectile => {
        for (let i = 0; i < characters.length; i++) {
            if (projectile.collision(characters[i]) && projectile.impact == false && projectile.team != characters[i].team) {
                if (characters[i].takeDamage(projectile)) {
                    if (characters[i] === hero) {
                        playerDeath();
                    }

                    // Kill character (non-hero)
                    else {
                        characters.splice(i, 1);
                        i--;
                    }
                }

                projectile.setImpact(); // Disables future damage from this projectile
            }
        }
    });
}

// Main graphics render loop
function render() {
    if (gameRunning) {
        ctx.clearRect(0, 0, cW, cH); // Clears whole canvas
        
        environment.draw();

        entities.forEach(entity => {
            entity.draw();
        });

        characters.forEach(char => {
            char.draw();
        });

        projectiles.forEach(projectile => {
            projectile.draw();
        });
        
        window.requestAnimationFrame(render); // Recursive render call
    }
}

// Main logic loop
function gameLogicLoop() {
    if (document.visibilityState == "visible") {
        // Position & Action updates
        environment.updatePosition();

        entities.forEach(entity => {
            entity.updatePosition();
        });

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
}

function updateTime() {
    if (document.visibilityState == "visible") {
        if (gameTime % lengthOfDay == 0) {
            environment.toggleTimeOfDay();
            
            //spawner.spawnChar(1, cW-90, environment.getFloor()); // Temp
            //spawner.spawnChar(1, cW-80, environment.getFloor()); // Temp
            //spawner.spawnChar(1, cW-70, environment.getFloor()); // Temp
            //spawner.spawnChar(1, cW-60, environment.getFloor()); // Temp
            spawner.spawnChar(1, cW-50, environment.getFloor()); // Temp
            //spawner.spawnProj(0, 600, 600);
        }

        gameTime++;
    }
}