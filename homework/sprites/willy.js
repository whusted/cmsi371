$(function () {
    var canvas = $("#canvas")[0], // Note the array dereference.
        renderingContext = canvas.getContext("2d"),

        willy = {
            x: 50,
            y: 50,
            bobLevel: 0
        },

        drawWilly = function () {
            var fleshR = 255 - Math.floor(willy.bobLevel * 50),
                fleshG = 249 - Math.floor(willy.bobLevel * 50),
                fleshB = 229 - Math.floor(willy.bobLevel * 50);

            renderingContext.save();
            renderingContext.translate(willy.x, willy.y);
            renderingContext.scale(1.0 + willy.bobLevel, 1.25 + willy.bobLevel);
            renderingContext.fillStyle = "rgb(" + fleshR + "," + fleshG + "," + fleshB + ")";
            renderingContext.strokeStyle = "black";
            renderingContext.beginPath();
            renderingContext.arc(0, 0, 20, 0, Math.PI * 2);
            renderingContext.fill();
            renderingContext.stroke();
            renderingContext.restore();
        };

    willy.x = 50;
    drawWilly();

    willy.x = 150;
    willy.bobLevel = 0.25;
    drawWilly();

    willy.x = 250;
    willy.bobLevel = 0.5;
    drawWilly();

    willy.x = 350;
    willy.bobLevel = 0.75;
    drawWilly();
});
