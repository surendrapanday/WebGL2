import React, { useEffect, useRef } from "react";
import Twinf from "twinf";
import { initializeSimulatorEvents } from "./initializer";

const WebGl2Animation = (props: any) => {
  const webglCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const gl = webglCanvasRef?.current?.getContext("webgl2");
    if (gl) {
      // renderWebGL2(gl);
      // drawSingleDot(gl);
      initializeSimulatorEvents(gl);
    }
  }, []);

  const renderWebGL2 = (gl: any): any => {
    // Set the color of the canvas.
    // Parameters are RGB colors (red, green, blue, alpha)
    gl.clearColor(0, 0.6, 0.0, 1.0);
    // Clear the color buffer with specified color
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Define shaders: vertex shader and fragment shader
    const shaders = {
      vs: `#version 300 es
		in vec2 vertPosition;
		in vec3 vertColor;
		out vec3 fragColor;
	
		void main() {
			fragColor = vertColor;
			gl_Position = vec4(vertPosition, 0, 1);
		}`,

      fs: `#version 300 es
		precision mediump float;
		in vec3 fragColor;
		out vec4 outColor;
	
		void main() {
			outColor = vec4(fragColor, 1);
		}`,
    };

    // Create WebGl Shader objects
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    // sets the source code of the WebGL shader
    gl.shaderSource(vertexShader, shaders.vs);
    gl.shaderSource(fragmentShader, shaders.fs);

    // Compile GLSL Shaders to a binary data so
    // WebGLProgram can use them
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // Create a WebGLProgram
    var program = gl.createProgram();

    // Attach pre-existing shaders
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    const vertexAttributes = {
      position: {
        // X and Y ordered pair coordinates
        numberOfComponents: 2,
        data: new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]),
      },
      color: {
        numberOfComponents: 3, // RGB triple
        data: new Float32Array([1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]),
      },
    };

    // Create an initialize vertex buffers
    var vertexBufferObjectPosition = gl.createBuffer();
    var vertexBufferObjectColor = gl.createBuffer();

    // Bind existing attribute data
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObjectPosition);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      vertexAttributes.position.data,
      gl.STATIC_DRAW
    );

    var positionAttribLocation = gl.getAttribLocation(program, "vertPosition");

    gl.vertexAttribPointer(
      positionAttribLocation,
      vertexAttributes.position.numberOfComponents,
      gl.FLOAT,
      gl.FALSE,
      0,
      0
    );
    gl.enableVertexAttribArray(positionAttribLocation);

    // Bind existing attribute data
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObjectColor);
    gl.bufferData(gl.ARRAY_BUFFER, vertexAttributes.color.data, gl.STATIC_DRAW);

    var colorAttribLocation = gl.getAttribLocation(program, "vertColor");

    gl.vertexAttribPointer(
      colorAttribLocation,
      vertexAttributes.color.numberOfComponents,
      gl.FLOAT,
      gl.FALSE,
      0,
      0
    );
    gl.enableVertexAttribArray(colorAttribLocation);

    // Set program as part of the current rendering state
    gl.useProgram(program);
    // Draw the trinagle
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const drawSingleDot = (gl: any) => {
    // Compile the vertex shader
    const vertexShaderSource = `#version 300 es
  void main() {
    gl_Position = vec4(0, 0, 0, 1);
    gl_PointSize = 3.0;
  }`;
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vertexShaderSource);
    gl.compileShader(vs);

    // Compile the fragment shader
    const fragmentShaderSource = `#version 300 es
  precision highp float;
  out vec4 color;
  void main() {
    color = vec4(0,1,0,1);
  }`;
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fragmentShaderSource);
    gl.compileShader(fs);

    // Link the program
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("prog info-log:", gl.getProgramInfoLog(prog));
      console.error("vert info-log: ", gl.getShaderInfoLog(vs));
      console.error("frag info-log: ", gl.getShaderInfoLog(fs));
    }

    // Use the program
    gl.useProgram(prog);

    // Draw the point
    gl.clearColor(0, 0, 0, 1); // set clear color to black
    gl.clear(gl.COLOR_BUFFER_BIT); // clear the screen
    gl.drawArrays(gl.POINTS, 0, 1); // draw 1 point
  };

  return (
    <div>
      <table id="info">
        <tr>
          <td>centre</td>
          <td id="centre"></td>
        </tr>
        <tr>
          <td>range</td>
          <td>:</td>
          <td id="range"></td>
        </tr>
        <tr>
          <td>tracks</td>
          <td>:</td>
          <td id="tracks"></td>
        </tr>
        <tr>
          <td>fps</td>
          <td>:</td>
          <td id="fps"></td>
        </tr>
      </table>
      <canvas
        id="canvas"
        ref={webglCanvasRef}
        {...props}
        style={{ height: "800px", width: "1000px" }}
      ></canvas>
    </div>
  );
};

export default WebGl2Animation;
