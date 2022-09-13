function updatePlayerPos() {
    if (upPressed) {
        hero.Y -= heroSpd;
    }

    if (downPressed) {
        hero.Y += heroSpd;
    }
    
    if (leftPressed) {
        hero.X -= heroSpd;
    }
    
    if (rightPressed) {
        hero.X += heroSpd;
    }
}

// if (spacePressed && this.breath > 0) {
//     projectiles.push(
//         new Fire(
//             canvas, 
//             ctx, 
//             this.X + this.hitboxWidth - 40, 
//             this.Y + this.hitboxHeight - 50, 
//             fireSprites, 
//             ground, 
//             fireLifeTime, 
//             20, 
//             -4, 
//             -4, 
//             0.12
//         )
//     );
//     this.breath--;
// }

// else if (!spacePressed && this.breath < 100) {
//     this.breath++;
// }

// drawStats() {
//     document.getElementById("health").innerText = "HP: " + this.HP;
//     document.getElementById("breath").innerText = "Breath: " + this.breath;
// }