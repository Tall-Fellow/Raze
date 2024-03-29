class Character extends Entity {
    constructor(canvas, ctx, x, y, sprites, environment, team, lifeTime, HP, damage, speedX, speedY, deltaSpeedX, deltaSpeedY, rotation, deltaRotation, scale, animationSpeed) {
        super(canvas, ctx, x, y, sprites, environment, team, lifeTime, damage, speedX, speedY, deltaSpeedX, deltaSpeedY, rotation, deltaRotation, scale, animationSpeed);
        this.HP        = HP;
        this.hpBarSize = HP;
        this.clock     = 0;
    }

    // Return true if damage taken kills character
    takeDamage(projectileEntity) {
        this.HP -= projectileEntity.damage;
        if (this.HP <= 0) {
            this.HP = 0;
            return true;
        }

        else {
            return false;
        }
    }

    checkBounds() {
        // X-axis
        if (this.X < 0 && this.speedX > 0) {
            this.speedX *= -1 * 1/2;
        } 
        
        else if (this.X + this.hitboxWidth > cW && this.speedX < 0) {
            this.speedX *= -1 * 2/1;
        }

        // Y-axis
        if (this.Y < 0 || this.Y + this.hitboxHeight > this.environment.getFloor()) {
            this.Y = this.Y < 0? 0 : this.environment.getFloor() - this.hitboxHeight;
        }
    }

    action() {
        this.clock++;
    }

    draw() {
        super.draw();

        // Mobs health bars
        if (this.team == 0) {
            this.ctx.fillStyle = "#0aa824";
            this.ctx.fillRect(this.X + (this.hitboxWidth / 2) - (this.hpBarSize / 2), this.Y - 50, this.HP, 10);
            this.ctx.strokeStyle = "gold";
            this.ctx.strokeRect(this.X + (this.hitboxWidth / 2) - (this.hpBarSize / 2), this.Y - 50, this.hpBarSize, 10);
        }
    }
}