class FireBreath extends Projectile {
    constructor(canvas, ctx, x, y, sprites, ground, team = 1, lifeTime = 3000, damage = 20, speedX = -4, speedY = -4, scale = 0.12, animationSpeed = 80) {
        super(canvas, ctx, x, y, sprites, ground, team, lifeTime, damage, speedX, speedY, scale, animationSpeed);
    }
}