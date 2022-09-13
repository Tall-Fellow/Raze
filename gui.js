function createHiPPICanvas(w, h) {
    let cv    = document.createElement("canvas");
    cv.width  = w * ratio;
    cv.height = h * ratio;
    cv.style.width  = w + "px";
    cv.style.height = h + "px";
    cv.getContext("2d").scale(ratio, ratio);
    return cv;
}

function scaleCoeff(maxW, maxH, imgW, imgH) { return Math.min(maxW/imgW, maxH/imgH); }

function renderStartScreen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cW, cH);

    ctx.textAlign = "center";
    ctx.fillStyle = "black";

    ctx.font = "40px monospace"
    ctx.fillText("Raze", cW / 2, cH / 2);

    ctx.font = "18px monospace";
    ctx.fillText("Press enter to play...", cW / 2, cH / 2 + 35);
}

function renderDeathScreen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cW, cH);
    
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    
    ctx.font = "40px monospace"
    ctx.fillText("You died...", cW / 2, cH / 2);
    
    ctx.font = "18px monospace";
    ctx.fillText("Press enter to play again", cW / 2, cH / 2 + 35);
}

function appendCanvas() {
    document.getElementById("canvas").appendChild(canvas);
}