// Base projectile class
class Projectile extends Entity {
    constructor(canvas, ctx, x, y, sprites, ground, team, lifeTime, damage, speedX, speedY, scale, animationSpeed) {
        super(canvas, ctx, x, y, sprites, ground, team, lifeTime, damage, speedX, speedY, scale, animationSpeed);
        this.impact = false;
    }

    updateLifeTime() {
        this.lifeTime--;
        return this.lifeTime <= 0? true : false;
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

// Projectile type definitions
class FireBreath {
    constructor(sprites, team = 1, lifeTime = 300, damage = 20, speedX = -4, speedY = -4, scale = 0.12, animationSpeed = 80) {
        this.sprites        = sprites;
        this.team           = team;
        this.lifeTime       = lifeTime;
        this.damage         = damage;
        this.speedX         = speedX;
        this.speedY         = speedY;
        this.scale          = scale;
        this.animationSpeed = animationSpeed;
    }
}

class Arrow {
    constructor(sprites, team = 0, lifeTime = 200, damage = 10, speedX = 7, speedY = -0.4, scale = 0.4, animationSpeed = 80) {
        this.sprites        = sprites;
        this.team           = team;
        this.lifeTime       = lifeTime;
        this.damage         = damage;
        this.speedX         = speedX;
        this.speedY         = speedY;
        this.scale          = scale;
        this.animationSpeed = animationSpeed;
    }
}

// Sprite loads
var arrowSprites    = new Array();
arrowSprites[0]     = new Image();
arrowSprites[0].src = "media/arrow.png";

var fireSprites    = new Array();
fireSprites[0]     = new Image();
fireSprites[0].src = "media/fire/fireBall1.png";

// Projectile Class ID assignments
var projClasses = new Array();
projClasses[0] = new Arrow(arrowSprites);
projClasses[1] = new FireBreath(fireSprites);

// Projectile functions
function removeProjectile(index, projArr) {
    var newProjArr = new Array();
    for (let i = 0; i < projArr.length; i++) {
        if (i == index) { continue; }
        newProjArr.push(projArr[i]);
    }

    projArr = newProjArr;
}