$(function () {
    window['sprites'] = window['sprites'] || {};
    window['sprites'].willy = {
        x: 50,
        y: 50,
        bobLevel: 0
    };

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
        sprites.renderingContext.restore();
    };
});
