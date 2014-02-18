$(function () {
    window['racers'] = window['racers'] || {};
    window['racers'].car = {
        x: 100,
        y: 175
    };
    
    
    window['racers'].drawCar = function () {
        racers.drawBody();
        racers.drawWindshield();
        racers.drawSteeringWheel();
        racers.drawWheels();
        racers.drawHubcaps();
    };

    window['racers'].drawBody = function () {
        racers.renderingContext.save();
        racers.renderingContext.fillStyle = "rgb(" + 90 + "," + 90 + "," + 100 + ")";
        racers.renderingContext.strokeStyle = "black";
        racers.renderingContext.beginPath();
        racers.renderingContext.fillRect(racers.car.x - 50, racers.car.y + 60, 50, 50);
        racers.renderingContext.fillRect(racers.car.x, racers.car.y, 190, 110);
        racers.renderingContext.fillRect(racers.car.x + 180, racers.car.y - 20, 30, 20);
        racers.renderingContext.restore();
    };

    window['racers'].drawWindshield = function () {
        racers.renderingContext.save();
        racers.renderingContext.fillStyle = "rgb(" + 240 + "," + 240 + "," + 240 + ")";
        racers.renderingContext.strokeStyle = "white";
        racers.renderingContext.beginPath();
        racers.renderingContext.strokeRect(racers.car.x, racers.car.y, 70, 60);
        racers.renderingContext.fillRect(racers.car.x, racers.car.y, 70, 60);
        racers.renderingContext.restore();
    };

    // JD: Little spacing note: for function literals, we like to add a space
    //     between "function" and "("---the logic being, when we use a function
    //     statement, we put the name in between:
    //
    //         function nameOfFunction(arguments)
    //
    //     So when we have a function literal, the name simply goes away...but
    //     not the space.  And so:
    //
    //         function (arguments)
    //
    //     Anyway, that's the rationale.
    window['racers'].drawSteeringWheel = function () {
        racers.renderingContext.save();
        racers.renderingContext.fillStyle = "rgb(" + 10 + "," + 10 + "," + 10 + ")";
        racers.renderingContext.strokeStyle = "rgb(" + 10 + "," + 10 + "," + 10 + ")";
        racers.renderingContext.moveTo(racers.car.x + 60, racers.car.y + 50);
        racers.renderingContext.arc(racers.car.x + 50, racers.car.y + 50, 10, 0, Math.PI * 2);
        racers.renderingContext.arc(racers.car.x + 50, racers.car.y + 50, 12, 0, Math.PI * 2);
        racers.renderingContext.stroke();
        racers.renderingContext.restore();
    };

    window['racers'].drawWheels = function () {
        racers.renderingContext.save();
        racers.renderingContext.fillStyle = "rgb(" + 30 + "," + 30 + "," + 30 + ")";
        racers.renderingContext.beginPath();
        racers.renderingContext.arc(racers.car.x + 50, racers.car.y + 110, 30, 0, Math.PI * 2);
        racers.renderingContext.moveTo(racers.car.x + 180, racers.car.y + 110);
        racers.renderingContext.arc(racers.car.x + 150, racers.car.y + 110, 30, 0, Math.PI * 2);
        racers.renderingContext.fill();
        racers.renderingContext.stroke();
        racers.renderingContext.restore();

    };

    window['racers'].drawHubcaps = function () {
        racers.renderingContext.save();
        racers.renderingContext.fillStyle = "rgb(" + 210 + "," + 210 + "," + 210 + ")";
        racers.renderingContext.beginPath();
        racers.renderingContext.arc(racers.car.x + 50, racers.car.y + 110, 15, 0, Math.PI * 2);
        racers.renderingContext.moveTo(racers.car.x + 180, racers.car.y + 110);
        racers.renderingContext.arc(racers.car.x + 150, racers.car.y + 110, 15, 0, Math.PI * 2);
        racers.renderingContext.fill();
        racers.renderingContext.stroke();
        racers.renderingContext.restore();
    };
    
});
