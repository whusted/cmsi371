/*
 * This is a very simple module that demonstrates rudimentary,
 * pixel-level image processing.
 */
var Nanoshop = {
    /*
     * Applies the given filter to the given ImageData object,
     * then modifies its pixels according to the given filter.
     *
     * A filter is a function (r, g, b, a) that returns another
     * pixel as a 4-element array representing an RGBA value.
     */
    // JD: Nice, all good, nothing to say actually :)
    colorShiftLeft: function (r, g, b, a) {
        var newR = g,
            newG = b,
            newB = r,
            newA = a;
        return [newR, newG, newB, newA];
    },

    // This is a basic "darkener."
    darkener: function (r, g, b, a) {
        return [r / 2, g / 2, b / 2, a];
    },
    
    inverter: function (r, g, b, a) {
        var newR = Math.abs(255 - r),
            newG = Math.abs(255 - g),
            newB = Math.abs(255 - b),
            newA = a;
        return [newR, newG, newB, newA];
    },


    applyFilter: function (imageData, filter) {
        // For every pixel, replace with something determined by the filter.
        var i,
            j,
            max,
            pixel,
            pixelArray = imageData.data;

        for (i = 0, max = imageData.width * imageData.height * 4; i < max; i += 4) {
            pixel = filter(pixelArray[i], pixelArray[i + 1], pixelArray[i + 2], pixelArray[i + 3]);
            for (j = 0; j < 4; j += 1) {
                pixelArray[i + j] = pixel[j];
            }
        }

        return imageData;
    }
};
