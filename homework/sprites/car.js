$(function () {
    window['sprites'] = window['sprites'] || {};
    window['sprites'].car = {
        x: 100,
        y: 175
    };
    
    
    window['sprites'].drawCar = function () {
        sprites.renderingContext.save();
        //sprites.renderingContext.translate(sprites.willy.x, sprites.willy.y);
        sprites.renderingContext.fillStyle = "rgb(" + 40 + "," + 15 + "," + 20 + ")";
        sprites.renderingContext.strokeStyle = "black";
        sprites.renderingContext.beginPath();
        sprites.renderingContext.strokeRect(sprites.car.x, sprites.car.y, 220, 110);
        sprites.renderingContext.fillRect(sprites.car.x, sprites.car.y, 220, 110);

        sprites.renderingContext.restore();

    };

    
});
