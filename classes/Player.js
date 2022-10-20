class Player extends Character {
    constructor(canvas, ctx, x, y, sprites, ground, team = 1, lifeTime = 0, HP = 100, damage = 30, speedX = 0, speedY = 0, scale = 0.4, animationSpeed = 80) {
        super(canvas, ctx, x, y, sprites, ground, team, lifeTime, HP, damage, speedX, speedY, scale, animationSpeed);

        this.breath = 100;
        this.breathCountdown = 0;

        // Health & Breath bar setup
        this.offset = cW - (this.hpBarSize * 2) - (cW * 0.05);
        this.hpGradient = ctx.createLinearGradient(this.offset, 0, this.offset + this.hpBarSize * 2, 0);
        this.hpGradient.addColorStop(0, "#00b529");
        this.hpGradient.addColorStop(1, "#79e400");
        
        this.breathGradient = ctx.createLinearGradient(this.offset, 0, this.offset + this.hpBarSize * 2, 0);
        this.breathGradient.addColorStop(0, "#ff8f00");
        this.breathGradient.addColorStop(1, "#ffe500");
    }

    checkBounds() {
        // X-axis
        if (this.X < 0 || this.X + this.hitboxWidth > cW) {
            this.X = this.X < 0? 0 : cW - this.hitboxWidth;
        }

        // Y-axis
        if (this.Y < 0 || this.Y + this.hitboxHeight > this.ground.getFloor()) {
            this.Y = this.Y < 0? 0 : this.ground.getFloor() - this.hitboxHeight;
        }
    }

    action() {
        super.action();
        if (spacePressed && this.breath > 0) {
            spawner.spawnProj(1, this.X, this.Y);  
            this.breath -= 1.5;

            this.breathCountdown = this.clock + (1500 / refreshRate); // ms
        }

        else if (!spacePressed && this.breath < 100 && this.clock >= this.breathCountdown) {
            this.breath++;
        }
    }

    updatePosition() {
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

    draw() {
        super.draw();
        
        // HP & Breath Bars
        this.ctx.fillStyle = this.hpGradient;
        this.ctx.fillRect(this.offset, cH * 0.05, this.HP*2, 20);
        this.ctx.fillStyle = this.breathGradient;
        this.ctx.fillRect(this.offset, cH * 0.05 + 30, this.breath*2, 20);

        this.ctx.strokeStyle = "gold";
        this.ctx.strokeRect(this.offset, cH * 0.05, this.hpBarSize*2, 20);
        this.ctx.strokeRect(this.offset, cH * 0.05 + 30, this.hpBarSize*2, 20);
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