$(function () {
    window['sprites'] = window['sprites'] || {};

    window['sprites'].geoff = {
        x: 50,
        y: 50
    };

    window['sprites'].drawGeoff = function () {
        sprites.drawGeoffsHead();
        sprites.drawGeoffsGlasses();
        sprites.drawGeoffsSmile();
    };

    window['sprites'].drawGeoffsHead = function() {
        var fleshR = 255,
            fleshG = 204,
            fleshB = 150;

        sprites.renderingContext.save();
        sprites.renderingContext.translate(sprites.geoff.x, sprites.geoff.y);
        sprites.renderingContext.scale(1.0, 1.25);
        sprites.renderingContext.fillStyle = "rgb(" + fleshR + "," + fleshG + "," + fleshB + ")";
        sprites.renderingContext.strokeStyle = "black";
        sprites.renderingContext.beginPath();
        sprites.renderingContext.arc(0, 0, 20, 0, Math.PI * 2);
        sprites.renderingContext.fill();
        sprites.renderingContext.stroke();
        sprites.renderingContext.restore();
    };

    window['sprites'].drawGeoffsGlasses = function() {
        sprites.renderingContext.save();
        sprites.renderingContext.translate(sprites.geoff.x, sprites.geoff.y);
        sprites.renderingContext.beginPath();
        sprites.renderingContext.arc(-10, -5, 7, 0, Math.PI * 2);
        sprites.renderingContext.moveTo(-3, -5);
        sprites.renderingContext.lineTo(3, -5);
        sprites.renderingContext.moveTo(17, -5);
        sprites.renderingContext.arc(10, -5, 7, 0, Math.PI * 2);
        sprites.renderingContext.stroke();
        sprites.renderingContext.restore();
    };

    window['sprites'].drawGeoffsSmile = function() {
        sprites.renderingContext.save();
        sprites.renderingContext.beginPath();
        sprites.renderingContext.translate(sprites.geoff.x, sprites.geoff.y);
        sprites.renderingContext.scale(1.0, 1.0);
        sprites.renderingContext.arc(0, 10, 7, 0, Math.PI);
        sprites.renderingContext.stroke();
        sprites.renderingContext.restore();
    };

    window['sprites'].drawGeoffShirt = function () {
        sprites.renderingContext.save();
        sprites.renderingContext.translate(sprites.geoff.x, sprites.geoff.y);
        sprites.renderingContext.fillStyle = "rgb(" + 250 + "," + 250 + "," + 250 + ")";
        sprites.renderingContext.strokeStyle = "black";
        sprites.renderingContext.beginPath();
        sprites.renderingContext.strokeRect(-37, 25, 75, 75);
        sprites.renderingContext.fillRect(-37, 25, 75, 75);

        sprites.renderingContext.restore();

    };
});
