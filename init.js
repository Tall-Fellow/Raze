function getSprites() {
    // Environment
    var envSprites = new Array();

    var backgroundSprites    = new Array();
    backgroundSprites[0]     = new Image();
    backgroundSprites[0].src = "media/environment/dayBG.jpg";
    backgroundSprites[1]     = new Image();
    backgroundSprites[1].src = "media/environment/nightBG.jpg";
    envSprites.push(backgroundSprites);

    var groundSprites    = new Array();
    groundSprites[0]     = new Image();
    groundSprites[0].src = "media/environment/dayGround.png";
    groundSprites[1]     = new Image();
    groundSprites[1].src = "media/environment/nightGround.png";
    envSprites.push(groundSprites);

    // Characters
    var charSprites = new Array();

    var playerSprites = new Array();
    for (let i = 0; i < 10; i++) {
        var playerSprite = new Image();
        playerSprite.src = "media/dragon/draco" + i + ".png";
        playerSprites[i] = playerSprite;
    }
    charSprites.push(playerSprites);

    var infSprites = new Array();
    for (let i = 0; i < 4; i++) {
        var infSprite = new Image();
        infSprite.src = "media/infantry/legio" + i + ".png";
        infSprites[i] = infSprite;
    }
    charSprites.push(infSprites);

    // Projectiles
    var projSprites = new Array();

    var arrowSprites    = new Array();
    arrowSprites[0]     = new Image();
    arrowSprites[0].src = "media/arrow.png";
    projSprites.push(arrowSprites);

    var fireSprites    = new Array();
    fireSprites[0]     = new Image();
    fireSprites[0].src = "media/fire/fireBall1.png";
    projSprites.push(fireSprites);

    // Entities
    var entSprites = new Array();

    var moonSprites    = new Array();
    moonSprites[0]     = new Image();
    moonSprites[0].src = "media/environment/nightMoon.png";
    entSprites.push(moonSprites);

    return [charSprites, projSprites, entSprites, envSprites];
}