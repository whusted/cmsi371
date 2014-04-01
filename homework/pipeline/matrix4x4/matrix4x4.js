var Matrix4x4 = (function() {
	// Constructor with identity matrix default
	var matrix4x4 = function () {
        this.elements = arguments ? [].slice.call(arguments):
            [ 1, 0 , 0 , 0,
              0 , 1, 0 , 0,
              0 , 0 , 1, 0,
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





})();