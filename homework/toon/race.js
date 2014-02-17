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
                keyframes: [
                    {
                        frame: 25,
                        tx: 1300,
                        ty: 20,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 75,
                        tx: 1100,
                        ty: 50,
                        bobLevel: 0.5
                        //rotate: 60
                    },

                    {
                        frame: 100,
                        tx: 1100,
                        ty: 50,
                        bobLevel: 0
                        //rotate: -60,
                        //ease: KeyframeTweener.backInCubic
                    },

                    {
                        frame: 100,
                        tx: 1100,
                        ty: 50
                        //rotate: -60,
                        //ease: KeyframeTweener.backInCubic
                    },

                    {
                        frame: 115,
                        tx: 1100,
                        ty: 45
                    },

                    {
                        frame: 125,
                        tx: 1100,
                        ty: 55
                    },

                    {
                        frame: 140,
                        tx: 1100,
                        ty: 45
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
                        ty: 45
                    },

                    //Head towards the car

                    {
                        frame: 270,
                        tx: 1150,
                        ty: 170
                    },

                    {
                        frame: 290,
                        tx: 1150,
                        ty: 170
                    },

                    // {
                    //     frame: 140,
                    //     tx: 1100,
                    //     ty: 50,
                    //     ease: KeyframeTweener.backThenForwardSmall
                    // },

                    // {
                    //     frame: 190,
                    //     tx: 50,
                    //     ty: 600
                    // }

                    // {
                    //     frame: 200,
                    //     tx: 10,
                    //     ty: 600
                    // }
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
                        frame: 100,
                        tx: 1300,
                        ty: 10,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 110,
                        tx: 1000,
                        ty: 10,
                        bobLevel: 0.5
                        //rotate: 60
                    },

                    {
                        frame: 125,
                        tx: 1000,
                        ty: 15,
                        bobLevel: 0
                        //rotate: -60,
                        //ease: KeyframeTweener.backInCubic
                    },

                    {
                        frame: 125,
                        tx: 1000,
                        ty: 20
                        //rotate: -60,
                        //ease: KeyframeTweener.backInCubic
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
                        ty: 45
                    },

                    //Head towards the car

                    {
                        frame: 270,
                        tx: 1150,
                        ty: 170
                    },

                    {
                        frame: 290,
                        tx: 1150,
                        ty: 170
                    },
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
                        tx: 1000,
                        ty: 5
                    },

                    {
                        frame: 300,
                        tx: 1000,
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
