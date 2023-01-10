class Spawner {
    constructor(canvas, ctx, environment, entArr, charArr, projArr, sprites) {
        this.canvas      = canvas;
        this.ctx         = ctx;
        this.environment      = environment;
        this.entArr      = entArr;
        this.charArr     = charArr;
        this.projArr     = projArr;
        this.charSprites = sprites[0];
        this.projSprites = sprites[1];
        this.entSprites  = sprites[2];
    }
    
    spawnEnt(typeID, posX, posY) {
        switch (typeID) {
            case 0:
                this.entArr.push(new Moon(this.canvas, this.ctx, posX, posY, this.entSprites[typeID], this.environment));
                break;

            default:
                break;
        }
    }

    spawnChar(typeID, posX, posY) {
        switch (typeID) {
            case 0:
                this.charArr.push(new Player(this.canvas, this.ctx, posX, posY, this.charSprites[typeID], this.environment));
                break;
        
            case 1:
                this.charArr.push(new Infantry(this.canvas, this.ctx, posX, posY, this.charSprites[typeID], this.environment));
                break;

            default:
                break;
        }
    }

    spawnProj(typeID, posX, posY) {
        switch (typeID) {
            case 0:
                this.projArr.push(new Arrow(this.canvas, this.ctx, posX, posY, this.projSprites[typeID], this.environment));
                break;
        
            case 1:
                this.projArr.push(new FireBreath(this.canvas, this.ctx, posX, posY, this.projSprites[typeID], this.environment));
                break;

            default:
                break;
        }
    }
}