var Matrix4x4 = (function() {
	// Constructor with identity matrix default
	var matrix4x4 = function () {
        this.elements = arguments.length > 0 ? [].slice.call(arguments):
            [ 1, 0, 0, 0,
              0, 1, 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1 ];
    },

	    checkDimensions = function (m1, m2) {
	            if (m1.dimensions() !== m2.dimensions()) {
	                throw "Matrices have different dimensions";
	            }
	    };

    matrix4x4.prototype.dimensions = function () {
        return this.elements.length;
    };
    

    matrix4x4.prototype.multiply = function (m) {
        var result = new Matrix4x4,
            row,
            col,
            sum;

        checkDimensions(this, m);

        for (row = 0; row < 4; row++) {
            for (col = 0; col < 4; col++) {
            	// reset the indivdual sum each iteration
            	sum = 0;
            	for (i = 0; i < 4; i++) {
		            sum += this.elements[row * 4 + i] * m.elements[i * 4 + col];
		        }
		        result.elements[row * 4 + col] = sum;
            }
        }

        return result;
    };

    matrix4x4.getTranslationMatrix = function (dx, dy, dz) {

    	return new Matrix4x4(
            1, 0 , 0 , dx,
            0 , 1, 0 , dy,
            0 , 0 , 1, dz,
            0, 0, 0, 1 
    	);
    };

    matrix4x4.getScaleMatrix = function (sx, sy, sz) {

    	return new Matrix4x4(
    	    sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0, 1
        );
    };

    matrix4x4.getFrustumMatrix = function (r, l, t, b, n, f) {
    	var width = r - l,
    	    height = t - b,
    	    depth = f - n;

    	return new Matrix4x4(
            ((2 * n) / width), 0 , ((r + l) / width), 0,
            0, ((2 * n) / height), ((t + b) / height), 0,
            0, 0, (f + n) / depth, - ((2 * n * f) / depth),
            0,  0, 1, 0
    	);
    };

    matrix4x4.getOrthoMatrix = function (r, l, t, b, n, f) {
    	var width = r - l,
    	    height = t - b,
    	    depth = f - n;

    	return new Matrix4x4(
            2 / width, 0, 0, - ((r + l) / width),
            0, 2 / height, 0, - ((t + b) / height),
            0, 0, - 2 / depth, - ((f + n) / depth),
            0, 0, 0, 1
    	);
    };

    matrix4x4.getRotationMatrix = function (angle, x, y, z) {
        var axisLength = Math.sqrt((x * x) + (y * y) + (z * z)),
            s = Math.sin(angle * Math.PI / 180.0),
            c = Math.cos(angle * Math.PI / 180.0),
            oneMinusC = 1.0 - c,

            // We can't calculate this until we have normalized
            // the axis vector of rotation.
            x2, // "2" for "squared."
            y2,
            z2,
            xy,
            yz,
            xz,
            xs,
            ys,
            zs;

        // Normalize the axis vector of rotation.
        x /= axisLength;
        y /= axisLength;
        z /= axisLength;

        // *Now* we can calculate the other terms.
        x2 = x * x;
        y2 = y * y;
        z2 = z * z;
        xy = x * y;
        yz = y * z;
        xz = x * z;
        xs = x * s;
        ys = y * s;
        zs = z * s;

        // GL expects its matrices in column major order.
        return new Matrix4x4(
            (x2 * oneMinusC) + c, (xy * oneMinusC) - zs, (xz * oneMinusC) + ys, 0.0,
            (xy * oneMinusC) + zs, (y2 * oneMinusC) + c, (yz * oneMinusC) - xs, 0.0,
            (xz * oneMinusC) - ys, (yz * oneMinusC) + xs, (z2 * oneMinusC) + c, 0.0,
            0.0, 0.0, 0.0, 1.0
        );
    };

    // Changes the rows to columns to be consumed by GL
    matrix4x4.prototype.toDirectConsumption = function () {
        var result = [];

        for (var i = 0; i < 4; i++) {
        	result.push(this.elements[i], this.elements[i + 4], this.elements[i + 8], this.elements[i + 12]);
        }
    	return result;
    };

    // Array of elements of the matrix
    matrix4x4.elements = function () {
        return this.elements;
    };

    return matrix4x4;


})();