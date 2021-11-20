import React, { FC, useEffect, useRef } from "react";
import "./styles.scss";

const Canvas: FC = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;

    const createNode = (
      context: CanvasRenderingContext2D | null,
      text: string,
      x: number,
      y: number,
      radius: number
    ) => {
      if (context) {
        context.beginPath();
        context.textAlign = "center";
        context.arc(x + radius, y + radius, radius, 0, 2 * Math.PI);
        context.stroke();
        context.fillText(text, x + radius, y + radius);
      }
    };

    if (canvas) {
      const context = canvas.getContext("2d");
      canvas.width = window.innerWidth / 1.25;
      canvas.height = window.innerHeight / 2;

      for (let i = 0; i < 1000; i += 40) {
        createNode(context, "USA", i, i, 20);
      }
    }
  }, []);

  return <canvas className="canvas" ref={canvasRef} {...props} />;
};

export default Canvas;
