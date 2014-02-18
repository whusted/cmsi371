/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
$(function () {
    var canvas = document.getElementById("canvas"),

        //We have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        cartoons = [
            {
                draw: racers.drawWilly,
                callback: function (ease, startKeyframe, endKeyframe, currentTweenFrame, duration) {
                    var aStart = startKeyframe.bob || 0,
                        aDistance = (endKeyframe.bob || 0) - aStart;
                    racers.willy.bobLevel = Math.min(
                        Math.max(ease(currentTweenFrame, aStart, aDistance, duration), 0
                        ), 2
                    );
                },

                keyframes: [
                    {
                        frame: 25,
                        tx: 1300,
                        ty: 20,
                        ease: KeyframeTweener.linear,
                        bob: 0.5
                    },

                    {
                        frame: 75,
                        tx: 1100,
                        ty: 50,
                        bob: 0
                    },

                    {
                        frame: 100,
                        tx: 1100,
                        ty: 50,
                        bob: 0.5
                    },

                    {
                        frame: 115,
                        tx: 1100,
                        ty: 45,
                        bob: 0.25
                    },

                    {
                        frame: 125,
                        tx: 1100,
                        ty: 55
                    },

                    {
                        frame: 140,
                        tx: 1100,
                        ty: 45,
                        bob: 0
                    },

                    {
                        frame: 170,
                        tx: 1100,
                        ty: 55
                    },

                    {
                        frame: 190,
                        tx: 1100,
                        ty: 45
                    },

                    {
                        frame: 200,
                        tx: 1100,
                        ty: 55
                    },

                    {
                        frame: 210,
                        tx: 1100,
                        ty: 45
                    },

                    {
                        frame: 230,
                        tx: 1100,
                        ty: 55
                    },

                    {
                        frame: 250,
                        tx: 1100,
                        ty: 45
                    },

                    {
                        frame: 250,
                        tx: 1100,
                        ty: 45,
                        ease: KeyframeTweener.quinticEaseIn
                    },

                    //Head towards the car

                    {
                        frame: 265,
                        tx: 1150,
                        ty: 170
                    },

                    {
                        frame: 290,
                        tx: 1150,
                        ty: 170
                    }
                ]
            },

            {
                draw: racers.drawGeoff,

                keyframes: [
                    {
                        frame: 100,
                        tx: 1300,
                        ty: 10                    
                    },

                    {
                        frame: 110,
                        tx: 1000,
                        ty: 10,
                        bobLevel: 0.5
                    },

                    {
                        frame: 125,
                        tx: 1000,
                        ty: 15,
                        bobLevel: 0
                    },

                    {
                        frame: 125,
                        tx: 1000,
                        ty: 20
                    },

                    {
                        frame: 130,
                        tx: 1000,
                        ty: 10
                    },

                    {
                        frame: 140,
                        tx: 1000,
                        ty: 20
                    },

                    {
                        frame: 150,
                        tx: 1000,
                        ty: 10
                    },

                    {
                        frame: 180,
                        tx: 1000,
                        ty: 15
                    },

                    {
                        frame: 200,
                        tx: 1000,
                        ty: 20
                    },

                    {
                        frame: 220,
                        tx: 1000,
                        ty: 55
                    },

                    {
                        frame: 230,
                        tx: 1000,
                        ty: 45
                    },

                    {
                        frame: 240,
                        tx: 1000,
                        ty: 55
                    },

                    {
                        frame: 250,
                        tx: 1000,
                        ty: 45
                    },

                    {
                        frame: 250,
                        tx: 1000,
                        ty: 45,
                        ease: KeyframeTweener.quinticEaseIn
                    },

                    //Head towards the car

                    {
                        frame: 270,
                        tx: 1200,
                        ty: 200
                    },

                    {
                        frame: 310,
                        tx: 1200,
                        ty: 200
                    },
                ]
            },

            {
                draw: racers.drawCar,

                keyframes: [
                    {
                        frame: 0,
                        tx: 990,
                        ty: 5
                    },

                    {
                        frame: 300,
                        tx: 990,
                        ty: 5,
                        ease: KeyframeTweener.backThenForwardSmall
                    },

                    {
                        frame: 350,
                        tx: -100,
                        ty: 5
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
        sprites: cartoons,
        background: function (renderingContext) {
            renderingContext.save();
            renderingContext.fillStyle = "green";
            renderingContext.fillRect(0, 0, canvas.width, canvas.height);
            renderingContext.fillStyle = "black";
            renderingContext.fillRect(0, 250, canvas.width, 200);
            for (var i = 0; i < 7; i++) {
                renderingContext.fillStyle = "yellow";
                renderingContext.fillRect(10 + (i * 200), 330, 100, 20);
            }
            renderingContext.restore();
        }
    });
});
