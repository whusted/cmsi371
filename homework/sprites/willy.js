$(function () {
    window['racers'] = window['racers'] || {};
    
    window['racers'].willy = {
        x: 50,
        y: 50,
        bobLevel: 0
    };
    
    window['racers'].drawWilly = function (renderingContext) {
        racers.drawWillysHead();
        racers.drawWillysSmile();
        racers.drawWillysEyes();
    };

    window['racers'].drawWillysHead = function(renderingContext) {
        var fleshR = 255 - Math.floor(racers.willy.bobLevel * 50),
            fleshG = 249 - Math.floor(racers.willy.bobLevel * 50),
            fleshB = 229 - Math.floor(racers.willy.bobLevel * 50);

        racers.renderingContext.save();
        racers.renderingContext.translate(racers.willy.x, racers.willy.y);
        racers.renderingContext.scale(1.0 + racers.willy.bobLevel, 1.25 + racers.willy.bobLevel);
        racers.renderingContext.fillStyle = "rgb(" + fleshR + "," + fleshG + "," + fleshB + ")";
        racers.renderingContext.strokeStyle = "black";
        racers.renderingContext.beginPath();
        racers.renderingContext.arc(0, 0, 20, 0, Math.PI * 2);
        racers.renderingContext.fill();
        racers.renderingContext.stroke();
        racers.renderingContext.restore();
    };

    window['racers'].drawWillysSmile = function(renderingContext) {
        racers.renderingContext.save();
        racers.renderingContext.translate(racers.willy.x, racers.willy.y);
        racers.renderingContext.beginPath();
        racers.renderingContext.arc(0, 10, 7, 0, Math.PI);
        racers.renderingContext.stroke();
        racers.renderingContext.restore();
    };

    window['racers'].drawWillysEyes = function(renderingContext) {
        racers.renderingContext.save();
        racers.renderingContext.translate(racers.willy.x, racers.willy.y);
        racers.renderingContext.beginPath();
        racers.renderingContext.arc(8, -3, 2.5, 0, Math.PI * 2);
        racers.renderingContext.moveTo(-5, -3);
        racers.renderingContext.arc(-8, -3, 2.5, 0, Math.PI * 2);
        racers.renderingContext.stroke();
        racers.renderingContext.restore();

    };

    // Willy's white shirt
    window['racers'].shirt = {
        x: racers.willy.x,
        y: racers.willy.y
    };

    window['racers'].drawWillyShirt = function (renderingContext) {
        racers.renderingContext.save();
        racers.renderingContext.translate(racers.willy.x, racers.willy.y);
        racers.renderingContext.fillStyle = "rgb(" + 250 + "," + 250 + "," + 250 + ")";
        racers.renderingContext.strokeStyle = "black";
        racers.renderingContext.beginPath();
        racers.renderingContext.strokeRect(-37, 25, 75, 75);
        racers.renderingContext.fillRect(-37, 25, 75, 75);
        racers.renderingContext.restore();
    };

    
});
