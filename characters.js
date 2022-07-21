class Character extends Entity {
    constructor(canvas, ctx, x, y, sprites, ground, team, lifeTime, damage, speedX, speedY, scale, animationSpeed) {
        super(canvas, ctx, x, y, sprites, ground, team, lifeTime, damage, speedX, speedY, scale, animationSpeed);
    }

    // Return true if damage taken kills character
    takeDamage(projectileEntity) {
        this.HP -= projectileEntity.damage;
        return this.HP > 0? false : true;
    }

    checkBoundsV0() {
        // Y-axis
        if (this.Y < 0 || this.Y + this.hitboxHeight > this.ground.getFloor()) {
            this.Y = this.Y < 0? 0 : this.ground.getFloor() - this.hitboxHeight;
        }
        // X-axis
        if (this.X < 0 || this.X + this.hitboxWidth > canvas.width) {
            this.X = this.X < 0? 0 : canvas.width - this.hitboxWidth;
        }
    }

    checkBounds() {
        // X-axis
        //For mobs
        if (this.team == 0) {
            if (this.X < 0 && this.speedX > 0) {
                this.speedX *= -1 * 1/2;
            } 
            
            else if (this.X + this.hitboxWidth > canvas.width && this.speedX < 0) {
                this.speedX *= -1 * 2/1;
            }
        }
        
        // For player
        else if (this.team == 1 && (this.X < 0 || this.X + this.hitboxWidth > canvas.width)) {
            this.X = this.X < 0? 0 : canvas.width - this.hitboxWidth;
        }
    }
}

class Player {
    constructor(sprites, team = 1, HP = 100, damage = 30, speedX = 0, speedY = 0, scale = 0.4, animationSpeed = 80) {
        this.sprites        = sprites;
        this.team           = team;
        this.HP             = HP;
        this.damage         = damage;
        this.speedX         = speedX;
        this.speedY         = speedY;
        this.scale          = scale;
        this.animationSpeed = animationSpeed;
    }
}

class Infantry {
    constructor(sprites, team = 0, HP = 100, damage = 20, speedX = 2.3, speedY = 0, scale = 0.35, animationSpeed = 80) {
        this.sprites        = sprites;
        this.team           = team;
        this.HP             = HP;
        this.damage         = damage;
        this.speedX         = speedX;
        this.speedY         = speedY;
        this.scale          = scale;
        this.animationSpeed = animationSpeed;
    }
}

//Sprite loads
var playerSprites = new Array();
for (let i = 0; i < 10; i++) {
    var playerSprite = new Image();
    playerSprite.src = "media/dragon/draco" + i + ".png";
    playerSprites[i] = playerSprite;
}

var infSprites = new Array();
for (let i = 0; i < 4; i++) {
    var infSprite = new Image();
    infSprite.src = "media/infantry/legio" + i + ".png";
    infSprites[i] = infSprite;
}

// Projectile Class ID assignments
var charClasses = new Array();
charClasses[0] = new Player(playerSprites);
charClasses[1] = new Infantry(infSprites);