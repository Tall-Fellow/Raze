class Entity {
    constructor(canvas, ctx, x, y, sprites, environment, team, lifeTime, damage, speedX, speedY, deltaSpeedX, deltaSpeedY, rotation, deltaRotation, scale, animationSpeed) {
        this.canvas        = canvas,
        this.ctx           = ctx,
        this.X             = x;
        this.Y             = y;
        this.sprites       = sprites;
        this.environment   = environment;
        this.team          = team;
        this.lifeTime      = lifeTime;
        this.damage        = damage;
        this.speedX        = speedX;
        this.speedY        = speedY;
        this.deltaSpeedX   = deltaSpeedX, 
        this.deltaSpeedY   = deltaSpeedY, 
        this.rotation      = rotation, 
        this.deltaRotation = deltaRotation, 
        this.scale         = scale;
        this.onenvironment = false;
        this.currentSprite = 0;
        setInterval(() => {
            this.currentSprite = (this.currentSprite > sprites.length - 2)? 0 : this.currentSprite + 1;
            this.hitboxWidth  = this.sprites[this.currentSprite].width * this.scale;
            this.hitboxHeight = this.sprites[this.currentSprite].height * this.scale;
        }, animationSpeed);
    }

    draw() {
        if (this.deltaRotation != 0) {
            this.ctx.save();
            this.ctx.translate(this.X + (this.hitboxWidth / 2), this.Y + (this.hitboxHeight / 2));
            this.ctx.rotate(this.rotation * Math.PI / 180);
            this.ctx.drawImage(this.sprites[this.currentSprite], 0, 0, this.hitboxWidth, this.hitboxHeight);
            this.ctx.restore();
        }

        else {
            this.ctx.drawImage(this.sprites[this.currentSprite], this.X, this.Y, this.hitboxWidth, this.hitboxHeight);
        }
    }

    updatePosition() {
        this.rotation -= this.deltaRotation;
        this.speedX -= this.deltaSpeedX;
        this.speedY -= this.deltaSpeedY;
        this.X -= this.speedX;
        this.Y -= this.speedY;
    }

    updateLifeTime() {
        this.lifeTime--;
        return this.lifeTime <= 0? true : false;
    }

    checkBounds() {
        // X-axis
        if (this.X < 0 || this.X + this.hitboxWidth > cW) {
            this.X = this.X < 0? 0 : cW - this.hitboxWidth;
        }

        // Y-axis
        if (this.Y < 0 || this.Y + this.hitboxHeight > this.environment.getFloor()) {
            this.Y = this.Y < 0? 0 : this.environment.getFloor() - this.hitboxHeight;
        }
    }
}