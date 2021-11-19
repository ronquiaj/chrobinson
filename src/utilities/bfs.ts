import { AdjacencyList } from "../types";

const bfs = (adjList: AdjacencyList, start: string, destination: string) => {
  const visited: { [key: string]: boolean } = {}; // Countries mapped to whether they've been visited
  const parent: { [key: string]: string } = {}; // Countries mapped to their parent
  const distance: { [key: string]: number } = {}; // Countries mapped to their distance
  const queue: string[] = [];
  const path: string[] = [];

  if (start === destination) return { path: [], distance: 0 };

  let totalDistance = -1;

  Object.keys(adjList).forEach((country) => {
    visited[country] = false;
    distance[country] = -1;
    parent[country] = "";
  });

  distance[start] = 0;
  queue.push(start);

  while (queue.length !== 0) {
    const country = queue.shift();
    if (country) {
      if (country === destination) {
        totalDistance = distance[country];
        break;
      }
      for (const edge of adjList[country].edges) {
        if (!visited[edge]) {
          queue.push(edge);
          parent[edge] = country;
          distance[edge] = distance[country] + 1;
          visited[edge] = true;
        }
      }
    }
  }

  if (totalDistance !== -1) {
    // Get the path from our destination to start
    let country = destination;
    path.push(destination);
    while (parent[country] !== start) {
      path.push(parent[country]);
      country = parent[country];
    }
    path.push(start);
    return { distance: totalDistance, path: path.reverse() };
  } else return { distance: totalDistance, path };
};

export default bfs;
