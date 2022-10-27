import { useEffect, useRef } from "react";

const Canvas = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let frameCount = 0;
  let animationFrameId: number;
  let context;
  let planeImg = require("../../../node_modules/styles/image/plane.png");
  const drawCircle = (ctx: any, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Fill with gradient
    const gradient = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
    ctx.fillStyle = gradient;
    gradient.addColorStop(0, "black");
    gradient.addColorStop(1, "white");
    ctx.beginPath();
    ctx.arc(250, 50, 10 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);

    ctx.fill();
    // drawPlane(ctx, frameCount);
    //ctx.fill(10, 10, 150, 100);
  };

  const drawPlane = (ctx: any, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 100, 150);
    };
    img.src = planeImg;
  };

  useEffect(() => {
    runSimulation();
  }, [drawCircle]);

  // request animation
  function runSimulation() {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      context = canvas.getContext("2d");

      renderAnimation(context, frameCount);

      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    }
  }

  // render animation when needed
  const renderAnimation = (context: any, frameCount: any) => {
    frameCount++;
    drawCircle(context, frameCount);
    animationFrameId = window.requestAnimationFrame(() =>
      renderAnimation(context, animationFrameId)
    );
  };

  return <canvas ref={canvasRef} {...props}></canvas>;
};

export default Canvas;