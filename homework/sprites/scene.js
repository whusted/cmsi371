$(function () {
    var canvas = $("#canvas")[0], // Note the array dereference.
        renderingContext = canvas.getContext("2d");

    sprites.renderingContext = renderingContext;

    sprites.willy.x = 100;

    sprites.geoff.x = 200;

    sprites.car.x = 300;

    sprites.drawWilly();
    sprites.drawGeoff();
    sprites.drawCar();
});
