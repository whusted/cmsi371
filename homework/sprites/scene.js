$(function () {
    var canvas = $("#canvas")[0], // Note the array dereference.
        renderingContext = canvas.getContext("2d");

    sprites.renderingContext = renderingContext;

    sprites.willy.x = 100;

    sprites.geoff.x = 250;

    sprites.drawWilly();
    sprites.drawGeoff();
    sprites.drawWillyShirt();
    sprites.drawGeoffShirt();
});
