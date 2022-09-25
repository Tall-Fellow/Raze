function getSprites() {
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

    return charSprites;
}