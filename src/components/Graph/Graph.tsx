import React, { FC, useEffect, useRef } from "react";
import { AdjacencyList, GraphType } from "../../types";
import "./styles.scss";

const WIDTH = window.innerWidth / 1.5;
let HEIGHT = window.outerHeight / 2;
const RADIUS = 30;

type Props = {
  adjacencyList: AdjacencyList;
};

const Graph: FC<Props> = ({ adjacencyList }: Props) => {
  const graph: GraphType = {};
  let x = Math.floor(Math.random() * 50);
  let y = Math.floor(Math.random() * 20);
  Object.keys(adjacencyList).forEach((country) => {
    // This node hasn't been created yet
    if (!(country in graph)) {
      graph[country] = { highlighted: false, x, y };
      x += Math.floor(Math.random() * 100) + 300;
      if (x + RADIUS >= WIDTH - RADIUS) {
        y += Math.floor(Math.random() * 50) + 200;
        x = Math.floor(Math.random() * 100) + 50;
      }
      if (y + RADIUS >= HEIGHT) HEIGHT += RADIUS + 100;
    }
  });

  console.log(graph);

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
        context.font = "bold 1rem serif";
        context.beginPath();
        context.textAlign = "center";
        context.arc(x + radius, y + radius, radius, 0, 2 * Math.PI);
        context.stroke();
        context.fillStyle = "gray";
        context.fill();
        context.fillStyle = "black";
        context.fillText(text, x + radius, y + radius);
      }
    };

    const drawLine = (
      context: CanvasRenderingContext2D | null,
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      radius: number
    ) => {
      if (context) {
        context.strokeStyle = "gray";
        context.beginPath();
        context.moveTo(startX + radius, startY + radius);
        context.lineTo(endX + radius, endY + radius);
        context.stroke();
        context.strokeStyle = "black";
      }
    };

    if (canvas) {
      const context = canvas.getContext("2d");
      canvas.width = WIDTH;
      canvas.height = HEIGHT;

      Object.keys(graph).forEach((country) => {
        const { highlighted, x, y } = graph[country];

        createNode(context, country, x, y, RADIUS);
        adjacencyList[country].edges.forEach((edge) => {
          const { x: edgeX, y: edgeY } = graph[edge];
          drawLine(context, x, y, edgeX, edgeY, RADIUS);
        });
      });
    }
  }, []);

  return <canvas className="canvas" ref={canvasRef} />;
};

export default Graph;
