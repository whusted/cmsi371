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
        cameraMatrix,
        currentRotation = 0.0,
        currentInterval,
        projectionMatrix,
        rotationMatrix,
        scaleMatrix,
        translationMatrix,
        vertexPosition,
        vertexSpecularColor,
        shininess,
        vertexDiffuseColor,

        // Lighting variables
        normalVector,
        lightPosition,
        lightDiffuse,
        lightSpecular,

        verticesPasser,

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
    // JD: LOL nice.  Creative and clever :)  The only issue I see here is that you
    //     don't get to exercise your instance matrix code much; just scaling.
    objectsToDraw = [
        {
            color: { r: Math.random(), g: Math.random(), b: Math.random() },
            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
            shininess: 8,
            tx: 0,
            ty: 0,
            tz: 0,
            sx: 1,
            sy: 1,
            sz: 1,
            vertices: Shapes.toRawTriangleArray(Shapes.sphere(10, 32, 32)),
            // JD: Of note here: you create a *bunch* of spheres---but really you only need
            //     to create one.  Do you see how that would be done.  Considering how
            //     involved the sphere and its normals can be, I think adapting this to
            //     derive everything from a single sphere mesh will speed up the initial
            //     display of your scene quite noticeably.
            mode: gl.TRIANGLES,
            normals: Shapes.toVertexNormalArray(Shapes.sphere(10, 32, 32)),
            subobjects: [
               {
                    color: { r: Math.random(), g: Math.random(), b: Math.random() },
                    specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                    shininess: 16,
                    sx: 0.1,
                    sy: 0.1,
                    sz: 0.1,
                    vertices: Shapes.toRawTriangleArray(Shapes.sphere(1, 32, 32)),
                    mode: gl.TRIANGLES,
                    normals: Shapes.toVertexNormalArray(Shapes.sphere(1, 32, 32)),
                    subobjects: [
                        {
                            color: { r: Math.random(), g: Math.random(), b: Math.random() },
                            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                            shininess: 16,
                            sx: 0.1,
                            sy: 0.1,
                            sz: 0.1,
                            vertices: Shapes.toRawTriangleArray(Shapes.sphere(0.1, 32, 32)),
                            mode: gl.TRIANGLES,
                            normals: Shapes.toVertexNormalArray(Shapes.sphere(0.1, 32, 32)),
                            subobjects: [
                                {
                                    color: { r: Math.random(), g: Math.random(), b: Math.random() },
                                    specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                                    shininess: 16,
                                    sx: 0.1,
                                    sy: 0.1,
                                    sz: 0.1,
                                    vertices: Shapes.toRawTriangleArray(Shapes.sphere(0.01, 32, 32)),
                                    mode: gl.TRIANGLES,
                                    normals: Shapes.toVertexNormalArray(Shapes.sphere(0.01, 32, 32)),
                                    subobjects: [
                                        {
                                            color: { r: Math.random(), g: Math.random(), b: Math.random() },
                                            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                                            shininess: 16,
                                            sx: 0.1,
                                            sy: 0.1,
                                            sz: 0.1,
                                            vertices: Shapes.toRawTriangleArray(Shapes.sphere(0.001, 32, 32)),
                                            mode: gl.TRIANGLES,
                                            normals: Shapes.toVertexNormalArray(Shapes.sphere(0.001, 32, 32)),
                                            subobjects: [
                                                {
                                                    color: { r: Math.random(), g: Math.random(), b: Math.random() },
                                                    specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                                                    shininess: 16,
                                                    sx: 0.1,
                                                    sy: 0.1,
                                                    sz: 0.1,
                                                    vertices: Shapes.toRawTriangleArray(Shapes.sphere(0.0001, 32, 32)),
                                                    mode: gl.TRIANGLES,
                                                    normals: Shapes.toVertexNormalArray(Shapes.sphere(0.0001, 32, 32)),
                                                    subobjects: [
                                                        {
                                                            color: { r: Math.random(), g: Math.random(), b: Math.random() },
                                                            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                                                            shininess: 16,
                                                            sx: 0.1,
                                                            sy: 0.1,
                                                            sz: 0.1,
                                                            vertices: Shapes.toRawTriangleArray(Shapes.sphere(0.00001, 32, 32)),
                                                            mode: gl.TRIANGLES,
                                                            normals: Shapes.toVertexNormalArray(Shapes.sphere(0.00001, 32, 32)),

                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        // JD: There is still a fly in your shape group ointment.
        //     To see it, add more objects to your scene at the top
        //     level, then watch the console (and the screen, for
        //     that matter).
    ];

    var sphere = objectsToDraw[0];

    // Pass the vertices to WebGL.
    verticesPasser = function (objectsToDraw) {
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

            if (!objectsToDraw[i].specularColors) {
            // Future refactor: helper function to convert a single value or
            // array into an array of copies of itself.
            objectsToDraw[i].specularColors = [];
                for (j = 0, maxj = objectsToDraw[i].vertices.length / 3;
                        j < maxj; j += 1) {
                    objectsToDraw[i].specularColors = objectsToDraw[i].specularColors.concat(
                        objectsToDraw[i].specularColor.r,
                        objectsToDraw[i].specularColor.g,
                        objectsToDraw[i].specularColor.b
                    );
                }
            }
            objectsToDraw[i].specularBuffer = GLSLUtilities.initVertexBuffer(gl,
                objectsToDraw[i].specularColors);

            objectsToDraw[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].colors);

            // normals buffer
            objectsToDraw[i].normalBuffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].normals);
            
            if (objectsToDraw[i].subobjects && (objectsToDraw[i].subobjects.length != 0)) {
                verticesPasser(objectsToDraw[i].subobjects);
            }
        }
    },

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
    vertexDiffuseColor = gl.getAttribLocation(shaderProgram, "vertexDiffuseColor");
    gl.enableVertexAttribArray(vertexDiffuseColor);
    vertexSpecularColor = gl.getAttribLocation(shaderProgram, "vertexSpecularColor");
    gl.enableVertexAttribArray(vertexSpecularColor);
    normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
    gl.enableVertexAttribArray(normalVector);

    rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    translationMatrix = gl.getUniformLocation(shaderProgram, "translationMatrix");
    scaleMatrix = gl.getUniformLocation(shaderProgram, "scaleMatrix");
    cameraMatrix = gl.getUniformLocation(shaderProgram, "cameraMatrix");
    
    // Lighting matrices initialized
    lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
    lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");
    lightSpecular = gl.getUniformLocation(shaderProgram, "lightSpecular");
    shininess = gl.getUniformLocation(shaderProgram, "shininess");


    // Initialize projection matrix
    gl.uniformMatrix4fv(projectionMatrix, 
        gl.FALSE, 
        new Float32Array(Matrix4x4.getFrustumMatrix(-2, 2, 2, -2, 20, 2000).toDirectConsumption())
    );

    // Initialize scale matrix
    gl.uniformMatrix4fv(scaleMatrix, 
        gl.FALSE, 
        new Float32Array(Matrix4x4.getScaleMatrix(0.25, 0.25, 0.25).toDirectConsumption())
    );

    // Initialize translation matrix
    gl.uniformMatrix4fv(translationMatrix, 
        gl.FALSE, 
        new Float32Array(Matrix4x4.getTranslationMatrix(0, 0, 0).toDirectConsumption())
    );

    // Initialize camera matrix
    gl.uniformMatrix4fv(cameraMatrix,
        gl.FALSE,
        new Float32Array(Matrix4x4.lookAt(0, 0, 100, 0, 0, 0, 0, 1, 0).toDirectConsumption())
    );


    /*
     * Displays an individual object.
     */
    drawObject = function (objectsToDraw, inheritedInstance) {
        
        for (var i = 0; i < objectsToDraw.length; i++) {
            // Set the varying colors.
            gl.bindBuffer(gl.ARRAY_BUFFER, objectsToDraw[i].colorBuffer);
            gl.vertexAttribPointer(vertexDiffuseColor, 3, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, objectsToDraw[i].specularBuffer);
            gl.vertexAttribPointer(vertexSpecularColor, 3, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, objectsToDraw[i].normalBuffer);
            gl.vertexAttribPointer(normalVector, 3, gl.FLOAT, false, 0, 0);

            // Set the shininess.
            gl.uniform1f(shininess, objectsToDraw[i].shininess);

            // Build our instance transformation matrix.
            var instanceMatrix = inheritedInstance || new Matrix4x4();

            // Translate, scale, and rotate.
            // JD: Yep, pretty much right for an instance matrix.
            instanceMatrix = instanceMatrix.multiply(
                Matrix4x4.getTranslationMatrix(
                    objectsToDraw[i].tx || 0, objectsToDraw[i].ty || 0, objectsToDraw[i].tz || 0
                ).multiply(
                    Matrix4x4.getScaleMatrix(
                        objectsToDraw[i].sx || 1, objectsToDraw[i].sy || 1, objectsToDraw[i].sz || 1
                    ).multiply(
                        Matrix4x4.getRotationMatrix(
                            objectsToDraw[i].angle || 0, objectsToDraw[i].rx || 1, objectsToDraw[i].ry || 1, objectsToDraw[i].rz || 1
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
           

            // Set the varying vertex coordinates.
            gl.bindBuffer(gl.ARRAY_BUFFER, objectsToDraw[i].buffer);
            gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
            gl.drawArrays(objectsToDraw[i].mode, 0, objectsToDraw[i].vertices.length / 3);
            
            if (objectsToDraw[i].subobjects) {
                drawObject(objectsToDraw[i].subobjects, instanceMatrix);
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

        // Display the objects
        drawObject(objectsToDraw);

        // All done.
        gl.flush();
    };

    verticesPasser(objectsToDraw);

    // Set up our one light source and color.  Note the uniform3fv function.
    gl.uniform4fv(lightPosition, [30.0, 20.0, 90.0, 1.0]);
    gl.uniform3fv(lightDiffuse, [1.0, 1.0, 1.0]);
    gl.uniform3fv(lightSpecular, [1.0, 1.0, 1.0]);

    // Draw the initial scene.
    drawScene();

    // prevent arrow keys from moving entire page
    window.addEventListener("keydown", function(e) {
        if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    $(canvas).mousemove(function (event) {
        var xLight,
            yLight;

        // 612 and 416 is roughly middle of canvas
        xLight = event.pageX > 612 ? -(event.pageX / 12) : event.pageX / 12;
        yLight = event.pageY > 416 ? -(event.pageY / 12) : event.pageY / 12;
        
        gl.uniform4fv(lightPosition, [xLight, yLight, 90.0, 1.0]);
        gl.uniform3fv(lightDiffuse, [1.0, 1.0, 1.0]);
        drawScene();
    });

    $('body').keydown(function(event) {
        var actions = {
            
            // Up arrow key
            38: function () {
                sphere.sx *= 1.2;
                sphere.sy *= 1.2;
                sphere.sz *= 1.2;
                if (sphere.sx >= 34166027830095.31) {
                    sphere.sx = 0.33;
                    sphere.sy = 0.33;
                    sphere.sz = 0.33;
                }
            },
            // Down arrow key
            40: function() {
                sphere.sx /= 1.2;
                sphere.sy /= 1.2;
                sphere.sz /= 1.2;
            }

        };

        if (actions[event.which]) {
            actions[event.which]();
            drawScene();
        }
    });

}(document.getElementById("hello-webgl")));
