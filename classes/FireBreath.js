class FireBreath extends Projectile {
    constructor(
        canvas, 
        ctx, 
        x, 
        y, 
        sprites, 
        environment, 
        team           = 1, 
        lifeTime       = 3000, 
        damage         = 4, 
        speedX         = -4, 
        speedY         = -4,
        deltaSpeedX    = 0, 
        deltaSpeedY    = 0, 
        rotation       = 0, 
        deltaRotation  = 0, 
        scale          = 0.12, 
        animationSpeed = 80
    ) {
        super(canvas, ctx, x, y, sprites, environment, team, lifeTime, damage, speedX, speedY, deltaSpeedX, deltaSpeedY, rotation, deltaRotation, scale, animationSpeed);
    }
}