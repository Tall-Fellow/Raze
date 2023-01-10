class Environment {
    constructor(sprites, heightAdjuster = 75, scrollSpeed = 2) {
        this.heightAdjuster = heightAdjuster;
        this.scrollSpeed    = scrollSpeed;
        this.trans          = false;
        this.transAcc       = 0.002;
        this.transState     = 1; // Goes from 0 to 1 and sets opacity
        this.dayBgImg       = sprites[0][0];
        this.nightBgImg     = sprites[0][1];
        this.dayFloorImg    = sprites[1][0];
        this.nightFloorImg  = sprites[1][1];
        this.scale = scaleCoeff(cW, cH, this.dayFloorImg.width, this.dayFloorImg.height);
        this.dayFloorImg.height   = this.dayFloorImg.height * this.scale;
        this.dayFloorImg.width    = this.dayFloorImg.width * this.scale;
        this.nightFloorImg.height = this.nightFloorImg.height * this.scale;
        this.nightFloorImg.width  = this.nightFloorImg.width * this.scale;
        this.scrollPos1           = 0;
        this.scrollPos2           = this.dayFloorImg.width;
        this.height               = cH - this.dayFloorImg.height;
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
        this.scrollPos1 -= this.scrollSpeed;
        this.scrollPos2 -= this.scrollSpeed;
        this._checkRepeat();

        // Day/Night transition
        if (this.trans) {
            this.transState -= this.transAcc;

            if (this.transState <= 0) {
                this.transState = 0;
                this.trans      = false;
                this.transAcc *= -1;
            }
            
            else if (this.transState >= 1) {
                this.transState = 1;
                this.trans      = false;
                this.transAcc *= -1;
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
    };
}