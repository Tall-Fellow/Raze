class Arrow extends Projectile {
    constructor(
        canvas, 
        ctx, 
        x, 
        y, 
        sprites, 
        ground, 
        team           = 0, 
        lifeTime       = 200, 
        damage         = 10, 
        speedX         = 4, 
        speedY         = 10, 
        deltaSpeedX    = 0, 
        deltaSpeedY    = 0.095, 
        rotation       = 60, 
        deltaRotation  = 0.5, 
        scale          = 0.4, 
        animationSpeed = 80
    ) {
        super(canvas, ctx, x, y, sprites, ground, team, lifeTime, damage, speedX, speedY, deltaSpeedX, deltaSpeedY, rotation, deltaRotation, scale, animationSpeed);
    }
}