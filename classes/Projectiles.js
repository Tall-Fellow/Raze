class Projectile extends Entity {
    constructor(canvas, ctx, x, y, sprites, ground, team, lifeTime, damage, speedX, speedY, scale, animationSpeed) {
        super(canvas, ctx, x, y, sprites, ground, team, lifeTime, damage, speedX, speedY, scale, animationSpeed);
        this.impact = false;
    }

    updatePosition() {
        super.updatePosition();
        if (this.onGround) { 
            this.X += this.speedX;
            this.X -= this.ground.scrollSpeed;
            this.Y = this.ground.getFloor();
        };
    }

    setImpact() {
        this.impact = true;
    }

    collision(char) {
        // Check ground collision first
        if (this.Y + this.hitboxHeight > this.ground.getFloor()) {
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