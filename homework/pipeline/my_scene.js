/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

    // Because many of these variables are best initialized then immediately
    // used in context, we merely name them here.  Read on to see how they
    // are used.
    var gl, // The WebGL context.

        // This variable stores 3D model information.
        objectsToDraw,

        // The shader program to use.
        shaderProgram,

        // Utility variable indicating whether some fatal has occurred.
        abort = false,

        // Important state variables.
        currentRotation = 0.0,
        currentInterval,
        projectionMatrix,
        rotationMatrix,
        vertexPosition,
        vertexColor,

        // Lighting variables
        normalVector,
        lightPosition,
        lightDiffuse,

        // An individual "draw object" function.
        drawObject,

        // The big "draw scene" function.
        drawScene,

        // Reusable loop variables.
        i,
        maxi,
        j,
        maxj,

        /*
         * This code does not really belong here: it should live
         * in a separate library of matrix and transformation
         * functions.  It is here only to show you how matrices
         * can be used with GLSL.
         *
         * Based on the original glRotate reference:
         *     http://www.opengl.org/sdk/docs/man/xhtml/glRotate.xml
         */
        getRotationMatrix = function (angle, x, y, z) {
            // In production code, this function should be associated
            // with a matrix object with associated functions.
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
            return [
                (x2 * oneMinusC) + c,
                (xy * oneMinusC) + zs,
                (xz * oneMinusC) - ys,
                0.0,

                (xy * oneMinusC) - zs,
                (y2 * oneMinusC) + c,
                (yz * oneMinusC) + xs,
                0.0,

                (xz * oneMinusC) + ys,
                (yz * oneMinusC) - xs,
                (z2 * oneMinusC) + c,
                0.0,

                0.0,
                0.0,
                0.0,
                1.0
            ];
        };

    // Grab the WebGL rendering context.
    gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Build the objects to display.
    objectsToDraw = [

        // {
        //     color: { r: 0.7, g: 0.7, b: 0.8 },
        //     // angle: 0,
        //     // tx: -1,
        //     vertices: Shapes.toRawTriangleArray(Shapes.cube()),
        //     mode: gl.TRIANGLES
        // },
        // {
        //     color: { r: 0.4, g: 0.7, b: 0.8 },
        //     // angle: 0,
        //     // ty: -0.75,
        //     vertices: Shapes.toRawTriangleArray(Shapes.cube()),
        //     mode: gl.TRIANGLES
        // },
        // {
        //     color: { r: 0.4, g: 0.7, b: 0.8 },
        //     // angle: 0,
        //     // ty: 0.75,
        //     vertices: Shapes.toRawTriangleArray(Shapes.cube()),
        //     mode: gl.TRIANGLES
        // },
        // {
        //     color: { r: 0.7, g: 0.7, b: 0.8 },
        //     // tx: 1,
        //     vertices: Shapes.toRawTriangleArray(Shapes.cube()),
        //     mode: gl.TRIANGLES
        // },
        {
            color: { r: 0.4, g: 0.9, b: 0.8 },
            tz: -10,
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES
        }
    ];

    // Pass the vertices to WebGL.
    for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
        objectsToDraw[i].buffer = GLSLUtilities.initVertexBuffer(gl,
                objectsToDraw[i].vertices);

        if (!objectsToDraw[i].colors) {
            // If we have a single color, we expand that into an array
            // of the same color over and over.
            objectsToDraw[i].colors = [];
            for (j = 0, maxj = objectsToDraw[i].vertices.length / 3;
                    j < maxj; j += 1) {
                objectsToDraw[i].colors = objectsToDraw[i].colors.concat(
                    objectsToDraw[i].color.r,
                    objectsToDraw[i].color.g,
                    objectsToDraw[i].color.b
                );
            }
        }
        objectsToDraw[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                objectsToDraw[i].colors);
        // normals buffer
        var numberOfTrianlges = objectsToDraw[i].vertices.length / 9;
        var normals = [];

        for (var j = 0; j < numberOfTrianlges; j++) {
            var triangleBase = j * 9;
            var v1 = new Vector(objectsToDraw[i].vertices[triangleBase],
                                objectsToDraw[i].vertices[triangleBase + 1],
                                objectsToDraw[i].vertices[triangleBase + 2]);

            var v2 = new Vector(objectsToDraw[i].vertices[triangleBase + 3],
                                objectsToDraw[i].vertices[triangleBase + 4],
                                objectsToDraw[i].vertices[triangleBase + 5]);

            var v3 = new Vector(objectsToDraw[i].vertices[triangleBase + 6],
                                objectsToDraw[i].vertices[triangleBase + 7],
                                objectsToDraw[i].vertices[triangleBase + 8]);
            var vec1 = v2.subtract(v1);
            var vec2 = v3.subtract(v1);
            var normal = vec1.cross(vec2);

            for (var k = 0; k < 3; k++) {
                normals.push(normal.x());
                normals.push(normal.y());
                normals.push(normal.z());
            }
        }

        objectsToDraw[i].normalBuffer = GLSLUtilities.initVertexBuffer(gl, normals);
    }

    // Initialize the shaders.
    shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(vertexColor);
    normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
    gl.enableVertexAttribArray(normalVector);
    rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    var translationMatrix = gl.getUniformLocation(shaderProgram, "translationMatrix");
    var scaleMatrix = gl.getUniformLocation(shaderProgram, "scaleMatrix");
    var cameraMatrix = gl.getUniformLocation(shaderProgram, "cameraMatrix");
    
    // Lighting matrices initialized
    lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
    lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");


    // Initialize projection matrix
    gl.uniformMatrix4fv(projectionMatrix, 
        gl.FALSE, 
        new Float32Array(Matrix4x4.getFrustumMatrix(-2, 2, 2, -2, -5, 5000).toDirectConsumption())
    );

    // Initialize scale matrix
    gl.uniformMatrix4fv(scaleMatrix, 
        gl.FALSE, 
        new Float32Array(Matrix4x4.getScaleMatrix(2, 2, 1).toDirectConsumption())
    );

    // Initialize translation matrix
    gl.uniformMatrix4fv(translationMatrix, 
        gl.FALSE, 
        new Float32Array(Matrix4x4.getTranslationMatrix(0, 0, 0).toDirectConsumption())
    );

    // Initialize camera matrix
    gl.uniformMatrix4fv(cameraMatrix,
        gl.FALSE,
        new Float32Array(Matrix4x4.lookAt(0, 0, 10, 0, 0, 0, 0, 1, 0).toDirectConsumption())
    );


    /*
     * Displays an individual object.
     */
    drawObject = function (object) {
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

        // Build our instance transformation matrix.
        var instanceMatrix = new Matrix4x4();

        // Translate, scale, and rotate
        instanceMatrix = instanceMatrix.multiply(
            Matrix4x4.getTranslationMatrix(
                object.tx || 0, object.ty || 0, object.tz || 0
            ).multiply(
                Matrix4x4.getScaleMatrix(
                    object.sx || 1, object.sy || 1, object.sz || 1
                ).multiply(
                    Matrix4x4.getRotationMatrix(
                        object.angle || 0, object.rx || 1, object.ry || 1, object.rz || 1
                    )
                )
            )
        );

        // Set it.
        gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "instanceMatrix"),
            gl.FALSE,
            new Float32Array(instanceMatrix.toDirectConsumption())
        );

        // Set the varying normal vectors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.normalBuffer);
        gl.vertexAttribPointer(normalVector, 3, gl.FLOAT, false, 0, 0);

        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);

        // Recrusively draw subobjects/children of objects, if they exist
        if (object.subobjects && object.subobjects.length > 0) {
            for (var i = 0; i < subobjects.length; i++) {
                drawObject(subobjects[i]);
            }
        }
    };

    /*
     * Displays the scene.
     */
    drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set up the rotation matrix.
        gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(getRotationMatrix(currentRotation, 0, 1, 0)));

        // Display the objects.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    };

    // Draw the initial scene.
    drawScene();

    // Set up our one light source and color.  Note the uniform3fv function.
    gl.uniform3fv(lightPosition, [1.0, 1.0, 1.0]);
    gl.uniform3fv(lightDiffuse, [1.0, 1.0, 1.0]);

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
        } else {
            currentInterval = setInterval(function () {
                currentRotation += 1.0;
                drawScene();
                if (currentRotation >= 360.0) {
                    currentRotation -= 360.0;
                }
            }, 30);
        }
    });

}(document.getElementById("hello-webgl")));
