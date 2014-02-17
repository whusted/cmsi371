/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
$(function () {
    var canvas = document.getElementById("canvas"),

        // First, a selection of "drawing functions" from which we
        // can choose.  Their common trait: they all accept a single
        // renderingContext argument.
        square = function (renderingContext) {
            renderingContext.fillStyle = "blue";
            renderingContext.fillRect(-20, -20, 40, 40);
        },

        circle = function (renderingContext) {
            renderingContext.strokeStyle = "red";
            renderingContext.beginPath();
            renderingContext.arc(0, 0, 50, 0, Math.PI * 2);
            renderingContext.stroke();
        },

        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        cartoons = [
            {
                draw: racers.drawWilly,
                keyframes: [
                    {
                        frame: 0,
                        tx: 10,
                        ty: 20,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 50,
                        tx: 75,
                        ty: 50,
                        ease: KeyframeTweener.backInCubic
                    },

                    {
                        frame: 130,
                        tx: 400,
                        ty: 50,
                        //ease: KeyframeTweener.backInCubic
                    }
                ]
            },

            {
                draw: racers.drawGeoff,

                predraw: function (currentFrame) {
                    if (currentFrame % 30) {
                        return;
                    }
                },

                keyframes: [
                    {
                        frame: 50,
                        tx: 75,
                        ty: 50,
                        sx: 0.5,
                        sy: 0.5,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 100,
                        tx: 300,
                        ty: 0,
                        sx: 3,
                        sy: 0.25,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 150,
                        tx: 300,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5
                    }
                ]
            },

            {
                draw: racers.drawCar,

                predraw: function (currentFrame) {
                    if (currentFrame % 30) {
                        return;
                    }
                },

                keyframes: [
                    {
                        frame: 0,
                        tx: 50,
                        ty: 50,
                        sx: 0.5,
                        sy: 0.5,
                        ease: KeyframeTweener.backInCubic
                    },

                    {
                        frame: 100,
                        tx: 300,
                        ty: 50,
                        sx: 3,
                        sy: 0.25,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 150,
                        tx: 300,
                        ty: 50
                    }
                ]
            }
        ];

    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    racers.renderingContext = canvas.getContext("2d");
    KeyframeTweener.initialize({
        renderingContext: racers.renderingContext,
        width: canvas.width,
        height: canvas.height,
        sprites: cartoons
        // background: function (renderingContext) {
        //     renderingContext.save();
        //     renderingContext.fillStyle = "white";
        //     renderingContext.fillRect(0, 0, canvas.width, canvas.height);
        //     //sprites.car.drawCar(renderingContext);
        //     renderingContext.restore();
        // }
    });
});
