import React, { FC, useCallback, useEffect, useRef } from "react";
import { AdjacencyList, GraphType } from "../../types";
import "./styles.scss";

const graph: GraphType = {};

const WIDTH = window.innerWidth / 1.5;
let HEIGHT = window.outerHeight / 2;
const RADIUS = 50;

type Props = {
  adjacencyList: AdjacencyList;
  path: string[];
};

/**
 * Method to create a node
 * @param context The canvas context
 * @param text The text we want to display in this node
 * @param x The x position we want to place the node in
 * @param y The y position we want to place the node in
 * @param radius The radius of this node
 */
const createNode = (
  context: CanvasRenderingContext2D | null,
  text: string,
  x: number,
  y: number,
  radius: number,
  color: string,
  fontColor: string
) => {
  if (context) {
    context.beginPath();
    outlineNode(context, x, y, radius, color);
    context.stroke();
    context.fillStyle = color;
    context.fill();
    context.fillStyle = fontColor;
    context.fillText(text, x + radius, y + radius);
  }
};

/**
 *
 * @param context The canvas context
 * @param x The x position we want to place the node in
 * @param y The y position we want to place the node in
 * @param radius The radius of this node
 * @param color The color of the outline of this node
 */
const outlineNode = (
  context: CanvasRenderingContext2D | null,
  x: number,
  y: number,
  radius: number,
  color: string
) => {
  if (context) {
    context.lineWidth = 4;
    context.strokeStyle = color;
    context.beginPath();
    context.arc(x + radius, y + radius, radius, 0, 2 * Math.PI);
    context.stroke();
    context.lineWidth = 1;
  }
};

/**
 * Method to draw a line between two nodes
 * @param context The canvas context
 * @param startX The starting x position we want to start drawing the line at
 * @param startY The starting y position we want to start drawing the line at
 * @param endX The ending x position we want the line to end at
 * @param endY The ending y position we want the line to end at
 * @param radius We need the radius in order to draw to the center of the node
 */
const drawLine = (
  context: CanvasRenderingContext2D | null,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  radius: number,
  color: string
) => {
  if (context) {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(startX + radius, startY + radius);
    context.lineTo(endX + radius, endY + radius);
    context.stroke();
    context.strokeStyle = "black";
  }
};

const Graph: FC<Props> = ({ adjacencyList, path }: Props) => {
  let x = Math.floor(Math.random() * 50);
  let y = Math.floor(Math.random() * 20);

  // Start populating our graph based on our current nodes
  Object.keys(adjacencyList).forEach((country) => {
    // This node hasn't been created yet
    if (!(country in graph)) {
      graph[country] = { x, y };
      x += Math.floor(Math.random() * 100) + 300;
      if (x + RADIUS >= WIDTH - RADIUS) {
        y += Math.floor(Math.random() * 50) + 200;
        x = Math.floor(Math.random() * 100) + 50;
      }
      if (y + RADIUS >= HEIGHT - RADIUS) HEIGHT += RADIUS * 2;
    }
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const resetGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      canvas.width = WIDTH;
      canvas.height = HEIGHT;

      if (context) {
        context.font = "bold 2rem Raleway";
        context.textAlign = "center";
      }

      Object.keys(graph).forEach((country) => {
        const { x, y } = graph[country];

        createNode(context, country, x, y, RADIUS, "gray", "black");
        adjacencyList[country].edges.forEach((edge) => {
          const { x: edgeX, y: edgeY } = graph[edge];
          drawLine(context, x, y, edgeX, edgeY, RADIUS, "gray");
        });
      });
    }
  }, [adjacencyList]);

  useEffect(() => {
    const canvas = canvasRef.current;
    resetGraph();
    if (canvas) {
      const context = canvas.getContext("2d");
      let lastNode: { x: null | number; y: null | number } = {
        x: null,
        y: null,
      };
      path.forEach((country) => {
        const { x, y } = graph[country];
        createNode(context, country, x, y, RADIUS, "lightgreen", "white");
        if (lastNode.x && lastNode.y) {
          drawLine(context, lastNode.x, lastNode.y, x, y, RADIUS, "lightgreen");
        }
        lastNode = { x, y };
      });
    }
  }, [path, adjacencyList, resetGraph]);

  return <canvas className="canvas" ref={canvasRef} />;
};

export default Graph;
