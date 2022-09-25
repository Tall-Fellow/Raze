class Spawner {
    constructor(canvas, ctx, ground, charArr, projArr, sprites) {
        this.canvas      = canvas;
        this.ctx         = ctx;
        this.ground      = ground
        this.charArr     = charArr;
        this.projArr     = projArr;
        this.sprites     = sprites;
    }
    
    spawnChar(typeID, posX, posY) {
        switch (typeID) {
            case 0:
                this.charArr.push(new Player(this.canvas, this.ctx, posX, posY, this.sprites[typeID], this.ground));
                break;
        
            case 1:
                this.charArr.push(new Infantry(this.canvas, this.ctx, posX, posY, this.sprites[typeID], this.ground));
                break;

            default:
                break;
        }
    }

    spawnProj(classID, posX, posY) {
        var proj = this.projClasses[classID];
        this.projArr.push(new Projectile(
            this.canvas, 
            this.ctx, 
            posX, 
            posY, 
            proj.sprites, 
            this.ground, 
            proj.team, 
            proj.lifeTime, 
            proj.damage, 
            proj.speedX, 
            proj.speedY, 
            proj.scale, 
            proj.animationSpeed
        ));
    }
}