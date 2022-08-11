class Character extends Entity {
    constructor(canvas, ctx, x, y, sprites, ground, team, lifeTime, HP, damage, speedX, speedY, scale, animationSpeed) {
        super(canvas, ctx, x, y, sprites, ground, team, lifeTime, damage, speedX, speedY, scale, animationSpeed);
        this.HP        = HP;
        this.hpBarSize = HP;

        // For player only, bars gradient setup
        if (team == 1) {
            this.offset = this.canvas.width - (this.hpBarSize * 2) - (canvas.width * 0.05);
            this.hpGradient = ctx.createLinearGradient(this.offset, 0, this.offset + this.hpBarSize * 2, 0);
            this.hpGradient.addColorStop(0, "#00b529");
            this.hpGradient.addColorStop(1, "#79e400");
            
            this.breathGradient = ctx.createLinearGradient(this.offset, 0, this.offset + this.hpBarSize * 2, 0);
            this.breathGradient.addColorStop(0, "#ff8f00");
            this.breathGradient.addColorStop(1, "#ffe500");
        }
    }

    // Return true if damage taken kills character
    takeDamage(projectileEntity) {
        this.HP -= projectileEntity.damage;
        if (this.HP <= 0) {
            this.HP = 0;
            return true;
        }

        else {
            return false;
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

        // Y-axis
        if (this.Y < 0 || this.Y + this.hitboxHeight > this.ground.getFloor()) {
            this.Y = this.Y < 0? 0 : this.ground.getFloor() - this.hitboxHeight;
        }
    }

    draw() {
        super.draw();
        
        // Player HP & Breath bars
        if (this.team == 1) {
            this.ctx.fillStyle = this.hpGradient;
            this.ctx.fillRect(this.offset, canvas.height * 0.05, this.HP*2, 20);
            this.ctx.fillStyle = this.breathGradient;
            this.ctx.fillRect(this.offset, canvas.height * 0.05 + 30, this.HP*2, 20);

            this.ctx.strokeStyle = "gold";
            this.ctx.strokeRect(this.offset, canvas.height * 0.05, this.hpBarSize*2, 20);
            this.ctx.strokeRect(this.offset, canvas.height * 0.05 + 30, this.hpBarSize*2, 20);
        }

        // Mobs health bars
        else {      
            this.ctx.fillStyle = "#0aa824";
            this.ctx.fillRect(this.X + (this.hitboxWidth / 2) - (this.hpBarSize / 2), this.Y - 50, this.HP, 10);
            this.ctx.strokeStyle = "gold";
            this.ctx.strokeRect(this.X + (this.hitboxWidth / 2) - (this.hpBarSize / 2), this.Y - 50, this.hpBarSize, 10);
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