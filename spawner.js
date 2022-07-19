// For generating stuff, want spawnPos, ability to attach to obj as anchors, 
// ability to spawn different sorts of entities (through functions?).
class Spawner {
    constructor(canvas, ctx, ground, charClasses, projClasses, charArr, projArr) {
        this.canvas      = canvas;
        this.ctx         = ctx;
        this.ground      = ground
        this.charClasses = charClasses;
        this.projClasses = projClasses;
        this.charArr     = charArr;
        this.projArr     = projArr;
    }
    
    spawnChar(classID, posX, posY) {
        var char = this.charClasses[classID]
        var c = new Character(
            this.canvas, 
            this.ctx, 
            posX, 
            posY, 
            char.sprites, 
            this.ground, 
            char.team, 
            char.lifeTime, 
            char.damage, 
            char.speedX, 
            char.speedY, 
            char.scale, 
            char.animationSpeed
        );

        this.charArr.push(c);
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