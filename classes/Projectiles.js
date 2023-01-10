class Projectile extends Entity {
    constructor(canvas, ctx, x, y, sprites, environment, team, lifeTime, damage, speedX, speedY, deltaSpeedX, deltaSpeedY, rotation, deltaRotation, scale, animationSpeed) {
        super(canvas, ctx, x, y, sprites, environment, team, lifeTime, damage, speedX, speedY, deltaSpeedX, deltaSpeedY, rotation, deltaRotation, scale, animationSpeed);
        this.impact = false;
    }

    updatePosition() {
        super.updatePosition();

        if (this.onGround) { 
            this.X += this.speedX;
            this.X -= this.environment.scrollSpeed;
            this.Y = this.environment.getFloor() - this.hitboxHeight;
        };
    }

    isOutOfBounds() {
        if (
            this.Y < 0 ||
            this.X < (-2 * this.hitboxWidth) ||
            this.X > cW
        ) {
            return true;
        }

        return false;
    }

    setImpact() {
        this.impact = true;
    }

    collision(char) {
        // Check ground collision first
        if (this.Y + this.hitboxHeight > this.environment.getFloor()) {
            this.onGround = true;
        }

        if (
            this.X < char.X + char.hitboxWidth &&
            this.Y < char.Y + char.hitboxHeight &&
            this.X + this.hitboxWidth > char.X &&
            this.Y + this.hitboxHeight > char.Y
        ) {
            return true;
        }

        return false;
    }
}