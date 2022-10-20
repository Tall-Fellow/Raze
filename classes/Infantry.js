class Infantry extends Character {
    constructor(canvas, ctx, x, y, sprites, ground, team = 0, lifeTime = 0, HP = 100, damage = 20, speedX = 2.3, speedY = 0, scale = 0.35, animationSpeed = 80) {
        super(canvas, ctx, x, y, sprites, ground, team, lifeTime, HP, damage, speedX, speedY, scale, animationSpeed);
    }

    action() {
        super.action();
        if ((this.clock/refreshRate) % 5 == 0) {
            spawner.spawnProj(0, this.X, this.Y);
        }
    }
}