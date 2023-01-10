class Environment {
    constructor(heightAdjuster, scrollSpeed) {
        var self             = this;
        var moonSprite       = new Array();
        this.heightAdjuster  = heightAdjuster;
        this.scrollSpeed     = scrollSpeed;
        this.scrollPos1      = 0;
        this.scrollPos2      = 0;
        this.trans           = false;
        this.transAcc        = 0.002;
        this.transState      = 1; // Goes from 0 to 1 and sets opacity
        this.dayBgImg        = new Image();
        this.nightBgImg      = new Image();
        this.dayFloorImg     = new Image();
        this.nightFloorImg   = new Image();
        this.moonImg         = new Image();
        this.moon            = new Entity(canvas, ctx, 147, 30, moonSprite, this, 0, 0, 0, -0.02, 0.05, 0.8, 80);
        moonSprite.push(this.moonImg);
        
        this.dayFloorImg.onload = function() {
            self.scale               = scaleCoeff(cW, cH, self.dayFloorImg.width, self.dayFloorImg.height);
            self.dayFloorImg.height  = self.dayFloorImg.height * self.scale;
            self.dayFloorImg.width   = self.dayFloorImg.width * self.scale;
            self.scrollPos2          = self.dayFloorImg.width;
            self.height              = cH - self.dayFloorImg.height;
        }
        this.nightFloorImg.onload = function() {
            self.scale                = scaleCoeff(cW, cH, self.nightFloorImg.width, self.nightFloorImg.height);
            self.nightFloorImg.height = self.nightFloorImg.height * self.scale;
            self.nightFloorImg.width  = self.nightFloorImg.width * self.scale;
        }

        this.dayFloorImg.src   = "media/background/dayGround.png";
        this.nightFloorImg.src = "media/background/nightGround.png";
        this.dayBgImg.src      = "media/background/dayBG.jpg";
        this.nightBgImg.src    = "media/background/nightBG.jpg";
        this.moonImg.src       = "media/background/nightMoon.png";
    }

    draw() {
        // Night - BG Start
        ctx.drawImage(
            // Src img render portion settings
            this.nightBgImg, 0, 0, this.nightBgImg.width, this.nightBgImg.height, 
            // X & Y
            0, 0, 
            // Width & Height
            cW, cH
        );
        this.moon.draw();
        // Night - BG End

        // Day - BG Start
        ctx.globalAlpha = this.transState;
        ctx.drawImage(
            // Src img render portion settings
            this.dayBgImg, 0, 0, this.dayBgImg.width, this.dayBgImg.height, 
            // X & Y
            0, 0, 
            // Width & Height
            cW, cH
        );        
        ctx.globalAlpha = 1;
        // Day - BG End

        // Night - Floor Start
        ctx.drawImage(
            // Src img render portion settings
            this.nightFloorImg, 0, 0, this.nightFloorImg.width / this.scale, this.nightFloorImg.height / this.scale, 
            // X & Y
            this.scrollPos1, this.height, 
            // Width & Height
            this.nightFloorImg.width, this.nightFloorImg.height
        );
        
        ctx.drawImage(
            // Src img render portion settings
            this.nightFloorImg, 0, 0, this.nightFloorImg.width / this.scale, this.nightFloorImg.height / this.scale, 
            // X & Y
            this.scrollPos2, this.height, 
            // Width & Height
            this.nightFloorImg.width, this.nightFloorImg.height
        );
        // Night - Floor End

        // Day - Floor Start
        ctx.globalAlpha = this.transState;
        ctx.drawImage(
            // Src img render portion settings
            this.dayFloorImg, 0, 0, this.dayFloorImg.width / this.scale, this.dayFloorImg.height / this.scale, 
            // X & Y
            this.scrollPos1, this.height, 
            // Width & Height
            this.dayFloorImg.width, this.dayFloorImg.height
        );
        
        ctx.drawImage(
            // Src img render portion settings
            this.dayFloorImg, 0, 0, this.dayFloorImg.width / this.scale, this.dayFloorImg.height / this.scale, 
            // X & Y
            this.scrollPos2, this.height, 
            // Width & Height
            this.dayFloorImg.width, this.dayFloorImg.height
        );
        ctx.globalAlpha = 1;
        // Day - Floor End
    };

    toggleTimeOfDay() {
        this.trans = true;
        dayTime = !dayTime;
    }

    updatePosition() {
        this.scrollPos1 -= this.scrollSpeed
        this.scrollPos2 -= this.scrollSpeed
        this.moon.X -= this.moon.speedX;
        this.moon.Y -= this.moon.speedY;
        this._checkRepeat();

        // Day/Night transition
        if (this.trans) {
            this.transState -= this.transAcc;

            if (this.transState <= 0) {
                this.transState = 0;
                this.trans      = false;
                this.transAcc  *= -1;
            }
            
            else if (this.transState >= 1) {
                this.transState = 1;
                this.trans      = false;
                this.transAcc  *= -1;
            }
        }
    };

    getFloor() {
        return this.height + this.heightAdjuster;
    }

    _checkRepeat() {
        if (this.scrollPos1 <= -this.dayFloorImg.width) {
            this.scrollPos1 = this.dayFloorImg.width;
        }

        if (this.scrollPos2 <= -this.dayFloorImg.width) {
            this.scrollPos2 = this.dayFloorImg.width;
        }

        if (this.moon.X >= 157 || this.moon.X <= 137) { this.moon.speedX *= -1; }
        if (this.moon.Y >= 40 || this.moon.Y <= 20) { this.moon.speedY *= -1; }
    };
}