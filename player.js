function updatePlayerPos() {
    var spd = 3;
    if (upPressed) {
        characters[0].Y -= spd;
    }

    if (downPressed) {
        characters[0].Y += spd;
    }
    
    if (leftPressed) {
        characters[0].X -= spd;
    }
    
    if (rightPressed) {
        characters[0].X += spd;
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