$(function () {
    window['sprites'] = window['sprites'] || {};
    window['sprites'].willy = {
        x: 50,
        y: 50,
        bobLevel: 0
    };
    
    // Willy's face
    window['sprites'].drawWilly = function () {
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

        // Willy's smile
        sprites.renderingContext.beginPath();
        sprites.renderingContext.scale(1.0, 1.0);
        sprites.renderingContext.arc(0, 10, 7, 0, Math.PI);
        sprites.renderingContext.stroke();

        // Willy's eyes
        sprites.renderingContext.beginPath();
        sprites.renderingContext.scale(1.0, 1.0);
        sprites.renderingContext.arc(8, -3, 2, 0, Math.PI * 2);
        sprites.renderingContext.moveTo(-5, -3);
        sprites.renderingContext.arc(-8, -3, 2, 0, Math.PI * 2);
        sprites.renderingContext.stroke();
        sprites.renderingContext.restore();
    };

    // Willy's white shirt
    window['sprites'].shirt = {
        x: 50,
        y: 50
    };

    window['sprites'].drawWillyShirt = function () {
        sprites.renderingContext.save();
        sprites.renderingContext.translate(sprites.willy.x, sprites.willy.y);
        sprites.renderingContext.fillStyle = "rgb(" + 250 + "," + 250 + "," + 250 + ")";
        sprites.renderingContext.strokeStyle = "black";
        sprites.renderingContext.beginPath();
        sprites.renderingContext.strokeRect(sprites.willy.x - 137, sprites.willy.y - 25, 75, 75);
        sprites.renderingContext.fillRect(sprites.willy.x - 137, sprites.willy.y - 25, 75, 75);

        sprites.renderingContext.restore();

    };

    
});
