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
        {
            color: { r: 0.4, g: 0.7, b: 0.8 },
            // angle: 0,
            // ty: 0.75,
            vertices: Shapes.toRawTriangleArray(Shapes.sphere(2, 32, 32)),
            mode: gl.TRIANGLES,
            normals: Shapes.toVertexNormalArray(Shapes.sphere(2, 32, 32))
        },
        {
            color: { r: 0.9, g: 0.7, b: 0.8 },
            tz: 5,
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            normals: Shapes.toVertexNormalArray(Shapes.cube())
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
        // One more buffer: normals.
        console.log(objectsToDraw[i].normals);
        objectsToDraw[i].normalBuffer = GLSLUtilities.initVertexBuffer(gl,
                objectsToDraw[i].normals);
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
        new Float32Array(Matrix4x4.getFrustumMatrix(-2, 2, 2, -2, 20, 2000).toDirectConsumption())
    );

    // Initialize scale matrix
    gl.uniformMatrix4fv(scaleMatrix, 
        gl.FALSE, 
        new Float32Array(Matrix4x4.getScaleMatrix(1, 1, 1).toDirectConsumption())
    );

    // Initialize translation matrix
    gl.uniformMatrix4fv(translationMatrix, 
        gl.FALSE, 
        new Float32Array(Matrix4x4.getTranslationMatrix(0, 0, 0).toDirectConsumption())
    );

    // Initialize camera matrix
    gl.uniformMatrix4fv(cameraMatrix,
        gl.FALSE,
        new Float32Array(Matrix4x4.lookAt(12, 5, 35, 0, 0, 0, 0, 1, 0).toDirectConsumption())
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
        gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(Matrix4x4.getRotationMatrix(currentRotation, 0, 1, 0).toDirectConsumption()));

        // Display the objects.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    };

    // Set up our one light source and color.  Note the uniform3fv function.
    gl.uniform3fv(lightPosition, [10.0, 10.0, 10.0]);
    gl.uniform3fv(lightDiffuse, [1.0, 1.0, 1.0]);

    // Draw the initial scene.
    drawScene();

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
