/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shapes = {
    /*
     * Returns the vertices for a small icosahedron.
     */
    icosahedron: function () {
        // These variables are actually "constants" for icosahedron coordinates.
        var X = 0.525731112119133606,
            Z = 0.850650808352039932;

        return {
            vertices: [
                [ -X, 0.0, Z ],
                [ X, 0.0, Z ],
                [ -X, 0.0, -Z ],
                [ X, 0.0, -Z ],
                [ 0.0, Z, X ],
                [ 0.0, Z, -X ],
                [ 0.0, -Z, X ],
                [ 0.0, -Z, -X ],
                [ Z, X, 0.0 ],
                [ -Z, X, 0.0 ],
                [ Z, -X, 0.0 ],
                [ -Z, -X, 0.0 ]
            ],

            indices: [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ]
        };
    },

    cube: function () {
        var vertices = [],
            indices = [];

        // First square
        vertices.push([0.0, 0.3, 0.0]);
        
        for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 2) {
            vertices.push([0.5 * Math.cos(theta), 0.3, 0.5 * Math.sin(theta)]);
        }

        for (var i = 1; i <= 4; i++) {
            indices.push([0, i, (i === 4) ? 1 : (i + 1)]);
        }

        // Second square
        vertices.push([0.0, -0.3, 0.0]);
        
        for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 2) {
            vertices.push([0.5 * Math.cos(theta), -0.3, 0.5 * Math.sin(theta)]);
        }

        for (var i = 6; i <= 9; i++) {
            indices.push([5, i, (i === 9) ? 6 : (i + 1)]);
        }

        // Connect top and bottom square
        indices.push(

            [2, 7, 8],
            [2, 8, 3],
            [3, 8, 4],
            [8, 9, 4],
            [2, 1, 7],
            [1, 6, 7],
            [1, 4, 9],
            [1, 9, 6]

        );

        return {
            vertices: vertices,
            indices: indices
        }

    },

    babyCarriage: function () {
        var vertices = [],
            indices = [];

        // First side
        vertices.push([0.0, 0.2, 0.0]);
        
        for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 5) {
            vertices.push([0.5 * Math.cos(theta), 0.2, 0.5 * Math.sin(theta)]);
        }

        for (var i = 1; i <= 4; i++) {
            indices.push([0, i, (i === 4) ? 1 : (i + 1)]);
        }

        // Second side
        vertices.push([0.0, -0.2, 0.0]);

        for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 5) {
            vertices.push([0.5 * Math.cos(theta), -0.2, 0.5 * Math.sin(theta)]);
        }

        for (var i = 6; i <= 9; i++) {
            indices.push([5, i, (i === 9) ? 6 : (i + 1)]);
        }

        indices.push(
            [1, 4, 5]
            //[]


            );



      return {
        vertices: vertices,
        indices: indices
      }
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    toRawTriangleArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ]
                );
            }
        }

        return result;
    },


    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    toRawLineArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ],

                    indexedVertices.vertices[
                        indexedVertices.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        return result;
    }

};
