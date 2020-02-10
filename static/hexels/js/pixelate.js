class MatrixUtils {
    constructor() {
        this.mvMatrix = undefined;
        this.mvMatrixStack = [];
        this.perspectiveMatrix = undefined;
    }
    //
    // Matrix utility functions
    //

    loadIdentity() {
        this.mvMatrix = Matrix.I(4);
    }

    multMatrix(m) {
        this.mvMatrix = this.mvMatrix.x(m);
    }

    mvTranslate(v) {
        this.multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
    }

    makePerspective(fieldOfView, aspectRatio, nearDist, farDist) {
        this.perspectiveMatrix = makePerspective(fieldOfView, aspectRatio, nearDist, farDist);
    }

    setMatrixUniforms(gl, shaderProgram) {
        const pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        gl.uniformMatrix4fv(pUniform, false, new Float32Array(this.perspectiveMatrix.flatten()));

        const mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
        gl.uniformMatrix4fv(mvUniform, false, new Float32Array(this.mvMatrix.flatten()));

        let normalMatrix = this.mvMatrix.inverse();
        normalMatrix = normalMatrix.transpose();
        const nUniform = gl.getUniformLocation(shaderProgram, "uNormalMatrix");
        gl.uniformMatrix4fv(nUniform, false, new Float32Array(normalMatrix.flatten()));
    }

    mvPushMatrix(m) {
        if (m) {
            this.mvMatrixStack.push(m.dup());
            this.mvMatrix = m.dup();
        } else {
            this.mvMatrixStack.push(this.mvMatrix.dup());
        }
    }

    mvPopMatrix() {
        if (!this.mvMatrixStack.length) {
            throw("Can't pop from an empty matrix stack.");
        }

        this.mvMatrix = this.mvMatrixStack.pop();
        return this.mvMatrix;
    }

    mvRotate(angle, v) {
        const inRadians = angle * Math.PI / 180.0;

        const m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
        multMatrix(m);
    }

}

class Pixelator {
    constructor(canvasID, sliderID, fragShaderUrl, vertShaderUrl) {
        this.fragShaderUrl = fragShaderUrl;
        this.vertShaderUrl = vertShaderUrl;

        this.matrixUtils = new MatrixUtils();

        this.pixSize = 70/255;
        const that = this;
        $(function(){
            $(document.getElementById(sliderID)).slider({
                max: 255,
                value: 70,
                slide: function(event, ui){
                    that.updatePixSize(ui.value);
                }
            });
        });

        this.canvas = document.getElementById(canvasID);
        this.start();
    }

    //
    // start
    //
    // Called when the canvas is created to get the ball rolling.
    //
    async start() {
        this.initWebGL(this.canvas);            // Initialize the GL context

        // Only continue if WebGL is available and working

        if (this.gl) {
            this.gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
            this.gl.clearDepth(1.0);                // Clear everything
            this.gl.enable(this.gl.DEPTH_TEST);          // Enable depth testing
            this.gl.depthFunc(this.gl.LEQUAL);           // Near things obscure far things

            await this.initShaders();
            this.initBuffers();
            this.initTextures();
            this.drawScene();
        }
    }

    //
    // initWebGL
    //
    // Initialize WebGL, returning the GL context or null if
    // WebGL isn't available or could not be initialized.
    //
    initWebGL() {
        this.gl = this.canvas.getContext("experimental-webgl");

        // If we don't have a GL context, give up now
        if (!this.gl) {
            alert("Unable to initialize WebGL. Your browser may not support it.");
        }
    }

    //
    // initBuffers
    //
    // Initialize the buffers we'll need. For this demo, we just have
    // one object -- a simple two-dimensional square.
    //
    initBuffers() {

        // Create a buffer for the square's vertices.

        this.squareVerticesBuffer = this.gl.createBuffer();

        // Select the squareVerticesBuffer as the one to apply vertex
        // operations to from here out.

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVerticesBuffer);

        // Now create an array of vertices for the square.

        let vertices = [
            // Front face
            -2.0, -2.0, 1.0,
             2.0, -2.0, 1.0,
             2.0,  2.0, 1.0,
            -2.0,  2.0, 1.0,
        ];

        // Now pass the list of vertices into WebGL to build the shape. We
        // do this by creating a Float32Array from the JavaScript array,
        // then use it to fill the current vertex buffer.

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

        // Set up the normals for the vertices, so that we can compute lighting.

        this.squareVerticesNormalBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVerticesNormalBuffer);

        let vertexNormals = [
            // Front
             0.0, 0.0, 1.0,
             0.0, 0.0, 1.0,
             0.0, 0.0, 1.0,
             0.0, 0.0, 1.0,
        ];

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
                                    this.gl.STATIC_DRAW);

        // Map the texture onto the square's faces.

        this.squareVerticesTextureCoordBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVerticesTextureCoordBuffer);

        let textureCoordinates = [
            // Front
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        ];

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), this.gl.STATIC_DRAW);

        // Build the element array buffer; this specifies the indices
        // into the vertex array for each face's vertices.

        this.squareVerticesIndexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.squareVerticesIndexBuffer);

        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.

        let squareVertexIndices = [
            0,  1,  2,      0,  2,  3,    // front
        ]

        // Now send the element array to GL
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(squareVertexIndices), this.gl.STATIC_DRAW);
    }

    //
    // initTextures
    //
    // Initialize the textures we'll be using, then initiate a load of
    // the texture images. The handleTextureLoaded() callback will finish
    // the job; it gets called each time a texture finishes loading.
    //
    initTextures() {
        this.squareTexture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.squareTexture);
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, document.getElementById('galaxy'));

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

        this.gl.generateMipmap(this.gl.TEXTURE_2D);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }

    //
    // drawScene
    //
    // Draw the scene.
    //
    drawScene() {
        // Clear the canvas before we start drawing on it.

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Establish the perspective with which we want to view the
        // scene. Our field of view is 45 degrees, with a width/height
        // ratio of 640:480, and we only want to see objects between 0.1 units
        // and 100 units away from the camera.

        this.matrixUtils.makePerspective(45, this.canvas.width / this.canvas.height, 0.1, 100.0);

        // Set the drawing position to the "identity" point, which is
        // the center of the scene.

        this.matrixUtils.loadIdentity();
        // Now move the drawing position a bit to where we want to start
        // drawing the square.
        this.matrixUtils.mvTranslate([0.0, 0.0, -3.0]);
        this.matrixUtils.mvPushMatrix();

        // Draw the square by binding the array buffer to the square's vertices
        // array, setting attributes, and pushing it to GL.

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVerticesBuffer);
        this.gl.vertexAttribPointer(this.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);

        // Set the texture coordinates attribute for the vertices.

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVerticesTextureCoordBuffer);
        this.gl.vertexAttribPointer(this.textureCoordAttribute, 2, this.gl.FLOAT, false, 0, 0);

        // Bind the normals buffer to the shader attribute.

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVerticesNormalBuffer);
        this.gl.vertexAttribPointer(this.vertexNormalAttribute, 3, this.gl.FLOAT, false, 0, 0);

        // Specify the texture to map onto the faces.

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.squareTexture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgram, "uSampler"), 0);
        this.gl.uniform1f(
            this.gl.getUniformLocation(this.shaderProgram, "uPixSize"), this.pixSize);

        // Draw the square.
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.squareVerticesIndexBuffer);
        this.matrixUtils.setMatrixUniforms(this.gl, this.shaderProgram);
        this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);

        // Restore the original matrix
        this.matrixUtils.mvPopMatrix();
    }

    //
    // initShaders
    //
    // Initialize the shaders, so WebGL knows how to light our scene.
    //
    async initShaders() {
        let fragmentShader = await this.getShader(this.fragShaderUrl);
        let vertexShader = await this.getShader(this.vertShaderUrl);

        // Create the shader program

        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, vertexShader);
        this.gl.attachShader(this.shaderProgram, fragmentShader);
        this.gl.linkProgram(this.shaderProgram);

        // If creating the shader program failed, alert

        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
            alert("Unable to initialize the shader program: " + this.gl.getProgramInfoLog(shader));
        }

        this.gl.useProgram(this.shaderProgram);

        this.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
        this.gl.enableVertexAttribArray(this.vertexPositionAttribute);

        this.textureCoordAttribute = this.gl.getAttribLocation(this.shaderProgram, "aTextureCoord");
        this.gl.enableVertexAttribArray(this.textureCoordAttribute);

        this.vertexNormalAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexNormal");
        this.gl.enableVertexAttribArray(this.vertexNormalAttribute);
    }

    //
    // getShader
    //
    // Loads a shader program by scouring the current document,
    // looking for a script with the specified ID.
    //
    async getShader(url) {
        const isVertShader = url.endsWith('.vert.c');
        const isFragShader = url.endsWith('.frag.c');
        if (!isVertShader && !isFragShader)
            throw("Shader file " + url + " must end with one of ['.vert.c', '.frag.c']");

        const resp = await fetch(url);
        if (resp.status !== 200)
            throw("Could not find shader " + url);

        const shaderBody = await resp.body.getReader().read();
        const shaderSource = String.fromCharCode.apply(null, shaderBody.value)

        let shader;
        if (isFragShader) {
            shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        } else {
            shader = this.gl.createShader(this.gl.VERTEX_SHADER);
        }

        this.gl.shaderSource(shader, shaderSource);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            alert("An error occurred compiling the shaders: " + this.gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }

    updatePixSize(val){
        this.pixSize = val/255;
        this.drawScene();
    }
}

var pixelObj;
function startWebgl() {
    // hexelObj = new Pixelator("glcanvas", "slider", "shader-fs-hx");
    pixelObj = new Pixelator("glcanvas-pixel", "slider-pixel", pixelShader);
    // new Pixelator("glcanvas2", "slider2", "shader-fs-hx-test");
}
