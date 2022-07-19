class Entity {
    constructor(canvas, ctx, x, y, sprites, ground, team, lifeTime, damage, speedX, speedY, scale, animationSpeed) {
        this.canvas   = canvas,
        this.ctx      = ctx,
        this.X        = x;
        this.Y        = y;
        this.sprites  = sprites;
        this.ground   = ground;
        this.team     = team;
        this.lifeTime = lifeTime;
        this.damage   = damage;
        this.speedX   = speedX;
        this.speedY   = speedY;
        this.scale    = scale;
        this.onGround = false;
        this.currentSprite = 0;
        setInterval(() => {
            this.currentSprite = (this.currentSprite > sprites.length - 2)? 0 : this.currentSprite + 1;
        
            this.hitboxWidth  = this.sprites[this.currentSprite].width * this.scale;
            this.hitboxHeight = this.sprites[this.currentSprite].height * this.scale;
        }, animationSpeed);
    }

    draw() {
        this.ctx.drawImage(this.sprites[this.currentSprite], this.X, this.Y, this.hitboxWidth, this.hitboxHeight);
    }

    updatePosition() {
        this.X -= this.speedX;
        this.Y -= this.speedY;
    }

    checkBounds() {
        // Y-axis
        if (this.Y < 0 || this.Y + this.hitboxHeight > this.ground.getFloor()) {
            this.Y = this.Y < 0? 0 : this.ground.getFloor() - this.hitboxHeight;
        }
        // X-axis
        if (this.X < 0 || this.X + this.hitboxWidth > canvas.width) {
            this.X = this.X < 0? 0 : canvas.width - this.hitboxWidth;
        }
    }

    isOutOfBounds() {
        if (
            this.Y < 0 ||
            this.X < -this.hitboxWidth ||
            this.X > this.canvas.width
        ) {
            return true;
        }

        return false;
    }
}