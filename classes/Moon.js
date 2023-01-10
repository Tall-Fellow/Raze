class Moon extends Entity {
    constructor(
        canvas, 
        ctx, 
        x, 
        y, 
        sprites, 
        environment, 
        team           = 0, 
        lifeTime       = -1, 
        damage         = 0, 
        speedX         = -0.02, 
        speedY         = 0.05, 
        deltaSpeedX    = 0, 
        deltaSpeedY    = 0, 
        rotation       = 0, 
        deltaRotation  = 0, 
        scale          = 0.8, 
        animationSpeed = 80
    ) {
        super(canvas, ctx, x, y, sprites, environment, team, lifeTime, damage, speedX, speedY, deltaSpeedX, deltaSpeedY, rotation, deltaRotation, scale, animationSpeed);
        this.cX = x; // Center X
        this.cY = y; // Center Y
        this.bounceAreaRadius = 10;
    }

    updatePosition() {
        this.X -= this.speedX;
        this.Y -= this.speedY;

        if (this.X >= this.cX + this.bounceAreaRadius || this.X <= this.cX - this.bounceAreaRadius) {
            this.speedX *= -1;
        }
        if (this.Y >= this.cY + this.bounceAreaRadius || this.Y <= this.cY - this.bounceAreaRadius) {
            this.speedY *= -1;
        }
    }
}