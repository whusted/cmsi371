$(function () {
    window['sprites'] = window['sprites'] || {};
    window['sprites'].willy = {
        x: 50,
        y: 50,
        bobLevel: 0
    };
    
    window['sprites'].drawWilly = function () {
        sprites.drawWillysHead();
        sprites.drawWillysSmile();
        sprites.drawWillysEyes();
        
    };

    window['sprites'].drawWillysHead = function() {
        var fleshR = 255 - Math.floor(sprites.willy.bobLevel * 50),
            fleshG = 249 - Math.floor(sprites.willy.bobLevel * 50),
            fleshB = 229 - Math.floor(sprites.willy.bobLevel * 50);

        sprites.renderingContext.save();
        sprites.renderingContext.translate(sprites.willy.x, sprites.willy.y);
        sprites.renderingContext.scale(1.0 + sprites.willy.bobLevel, 1.25 + sprites.willy.bobLevel);
        sprites.renderingContext.fillStyle = "rgb(" + fleshR + "," + fleshG + "," + fleshB + ")";
        sprites.renderingContext.strokeStyle = "black";
        sprites.renderingContext.beginPath();
        sprites.renderingContext.arc(0, 0, 20, 0, Math.PI * 2);
        sprites.renderingContext.fill();
        sprites.renderingContext.stroke();
        sprites.renderingContext.restore();


    };

    window['sprites'].drawWillysSmile = function() {
        sprites.renderingContext.save();
        sprites.renderingContext.translate(sprites.willy.x, sprites.willy.y);
        sprites.renderingContext.beginPath();
        sprites.renderingContext.arc(0, 10, 7, 0, Math.PI);
        sprites.renderingContext.stroke();
        sprites.renderingContext.restore();
    };

    window['sprites'].drawWillysEyes = function() {
        sprites.renderingContext.save();
        sprites.renderingContext.translate(sprites.willy.x, sprites.willy.y);
        sprites.renderingContext.beginPath();
        sprites.renderingContext.arc(8, -3, 2.5, 0, Math.PI * 2);
        sprites.renderingContext.moveTo(-5, -3);
        sprites.renderingContext.arc(-8, -3, 2.5, 0, Math.PI * 2);
        sprites.renderingContext.stroke();
        sprites.renderingContext.restore();

    };

    // Willy's white shirt
    window['sprites'].shirt = {
        x: sprites.willy.x,
        y: sprites.willy.y
    };

    window['sprites'].drawWillyShirt = function () {
        sprites.renderingContext.save();
        sprites.renderingContext.translate(sprites.willy.x, sprites.willy.y);
        sprites.renderingContext.fillStyle = "rgb(" + 250 + "," + 250 + "," + 250 + ")";
        sprites.renderingContext.strokeStyle = "black";
        sprites.renderingContext.beginPath();
        sprites.renderingContext.strokeRect(-37, 25, 75, 75);
        sprites.renderingContext.fillRect(-37, 25, 75, 75);

        sprites.renderingContext.restore();

    };

    
});
