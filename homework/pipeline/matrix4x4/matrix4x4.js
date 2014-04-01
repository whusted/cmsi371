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





})();