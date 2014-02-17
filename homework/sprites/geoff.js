$(function () {
    window['racers'] = window['racers'] || {};

    window['racers'].geoff = {
        x: 50,
        y: 50
    };

    window['racers'].drawGeoff = function (renderingContext) {
        racers.drawGeoffsHead();
        racers.drawGeoffsGlasses();
        racers.drawGeoffsSmile();
    };

    window['racers'].drawGeoffsHead = function() {
        // JD: Ooooh, parameterize this and you can totally make Geoff blush :)
        var fleshR = 255,
            fleshG = 204,
            fleshB = 150;

        racers.renderingContext.save();
        racers.renderingContext.translate(racers.geoff.x, racers.geoff.y);
        racers.renderingContext.scale(1.0, 1.25);
        racers.renderingContext.fillStyle = "rgb(" + fleshR + "," + fleshG + "," + fleshB + ")";
        racers.renderingContext.strokeStyle = "black";
        racers.renderingContext.beginPath();
        racers.renderingContext.arc(0, 0, 20, 0, Math.PI * 2);
        racers.renderingContext.fill();
        racers.renderingContext.stroke();
        racers.renderingContext.restore();
    };

    window['racers'].drawGeoffsGlasses = function() {
        racers.renderingContext.save();
        racers.renderingContext.translate(racers.geoff.x, racers.geoff.y);
        racers.renderingContext.beginPath();
        racers.renderingContext.arc(-10, -5, 7, 0, Math.PI * 2);
        racers.renderingContext.moveTo(-3, -5);
        racers.renderingContext.lineTo(3, -5);
        racers.renderingContext.moveTo(17, -5);
        racers.renderingContext.arc(10, -5, 7, 0, Math.PI * 2);
        racers.renderingContext.stroke();
        racers.renderingContext.restore();
    };

    window['racers'].drawGeoffsSmile = function() {
        racers.renderingContext.save();
        racers.renderingContext.beginPath();
        racers.renderingContext.translate(racers.geoff.x, racers.geoff.y);
        racers.renderingContext.scale(1.0, 1.0);
        racers.renderingContext.arc(0, 10, 7, 0, Math.PI);
        racers.renderingContext.stroke();
        racers.renderingContext.restore();
    };

    window['racers'].drawGeoffShirt = function () {
        racers.renderingContext.save();
        racers.renderingContext.translate(racers.geoff.x, racers.geoff.y);
        racers.renderingContext.fillStyle = "rgb(" + 250 + "," + 250 + "," + 250 + ")";
        racers.renderingContext.strokeStyle = "black";
        racers.renderingContext.beginPath();
        racers.renderingContext.strokeRect(-37, 25, 75, 75);
        racers.renderingContext.fillRect(-37, 25, 75, 75);

        racers.renderingContext.restore();

    };
});
