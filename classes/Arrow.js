class Arrow extends Projectile {
    constructor(canvas, ctx, x, y, sprites, ground, team = 0, lifeTime = 200, damage = 10, speedX = 4, speedY = 4, scale = 0.4, animationSpeed = 80) {
        super(canvas, ctx, x, y, sprites, ground, team, lifeTime, damage, speedX, speedY, scale, animationSpeed);
    }
}