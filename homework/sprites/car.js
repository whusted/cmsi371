$(function () {
    window['sprites'] = window['sprites'] || {};
    window['sprites'].car = {
        x: 100,
        y: 175
    };
    
    
    window['sprites'].drawCar = function () {
        // Body of car
        sprites.renderingContext.save();
        sprites.renderingContext.fillStyle = "rgb(" + 90 + "," + 90 + "," + 100 + ")";
        sprites.renderingContext.strokeStyle = "black";
        sprites.renderingContext.beginPath();
		sprites.renderingContext.fillRect(sprites.car.x - 50, sprites.car.y + 60, 50, 50);
        sprites.renderingContext.fillRect(sprites.car.x, sprites.car.y, 190, 110);
		sprites.renderingContext.fillRect(sprites.car.x + 180, sprites.car.y - 20, 30, 20);

        // Front windshield
        sprites.renderingContext.fillStyle = "rgb(" + 240 + "," + 240 + "," + 240 + ")";
        sprites.renderingContext.strokeStyle = "white";
        sprites.renderingContext.beginPath();
        sprites.renderingContext.strokeRect(sprites.car.x, sprites.car.y, 70, 60);
        sprites.renderingContext.fillRect(sprites.car.x, sprites.car.y, 70, 60);

        //Steering wheel
        sprites.renderingContext.fillStyle = "rgb(" + 10 + "," + 10 + "," + 10 + ")";
        sprites.renderingContext.strokeStyle = "rgb(" + 10 + "," + 10 + "," + 10 + ")";
        sprites.renderingContext.moveTo(sprites.car.x + 60, sprites.car.y + 50);
        sprites.renderingContext.arc(sprites.car.x + 50, sprites.car.y + 50, 10, 0, Math.PI * 2);
        sprites.renderingContext.arc(sprites.car.x + 50, sprites.car.y + 50, 12, 0, Math.PI * 2);
        sprites.renderingContext.stroke();

        //Wheels
        sprites.renderingContext.fillStyle = "rgb(" + 10 + "," + 10 + "," + 10 + ")";
        sprites.renderingContext.beginPath();
        sprites.renderingContext.arc(sprites.car.x + 50, sprites.car.y + 110, 30, 0, Math.PI * 2);
        sprites.renderingContext.moveTo(sprites.car.x + 180, sprites.car.y + 110);
        sprites.renderingContext.arc(sprites.car.x + 150, sprites.car.y + 110, 30, 0, Math.PI * 2);
        sprites.renderingContext.fill();
        sprites.renderingContext.stroke();
        sprites.renderingContext.restore();
        
        //Hubcaps
        sprites.renderingContext.fillStyle = "rgb(" + 210 + "," + 210 + "," + 210 + ")";
        sprites.renderingContext.beginPath();
        sprites.renderingContext.arc(sprites.car.x + 50, sprites.car.y + 110, 15, 0, Math.PI * 2);
        sprites.renderingContext.moveTo(sprites.car.x + 180, sprites.car.y + 110);
        sprites.renderingContext.arc(sprites.car.x + 150, sprites.car.y + 110, 15, 0, Math.PI * 2);
        sprites.renderingContext.fill();
        sprites.renderingContext.stroke();
        sprites.renderingContext.restore();

    };

    
});
