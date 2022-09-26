class Spawner {
    constructor(canvas, ctx, ground, charArr, projArr, sprites) {
        this.canvas      = canvas;
        this.ctx         = ctx;
        this.ground      = ground
        this.charArr     = charArr;
        this.projArr     = projArr;
        this.charSprites = sprites[0];
        this.projSprites = sprites[1];
    }
    
    spawnChar(typeID, posX, posY) {
        switch (typeID) {
            case 0:
                this.charArr.push(new Player(this.canvas, this.ctx, posX, posY, this.charSprites[typeID], this.ground));
                break;
        
            case 1:
                this.charArr.push(new Infantry(this.canvas, this.ctx, posX, posY, this.charSprites[typeID], this.ground));
                break;

            default:
                break;
        }
    }

    spawnProj(typeID, posX, posY) {
        switch (typeID) {
            case 0:
                this.projArr.push(new Arrow(this.canvas, this.ctx, posX, posY, this.projSprites[typeID], this.ground));
                break;
        
            case 1:
                this.projArr.push(new FireBreath(this.canvas, this.ctx, posX, posY, this.projSprites[typeID], this.ground));
                break;

            default:
                break;
        }
    }
}