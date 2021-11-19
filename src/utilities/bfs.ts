import { AdjacencyList } from "../types";

const bfs = (adjList: AdjacencyList, start: string, destination: string) => {
  const visited: { [key: string]: boolean } = {};
  const parent: { [key: string]: string | null } = {};
  const distance: { [key: string]: number } = {};
  const queue: string[] = [];

  Object.keys(adjList).forEach((country) => {
    visited[country] = false;
    distance[country] = -1;
    parent[country] = null;
  });

  distance[start] = 0;
  queue.push(start);

  while (queue.length !== 0) {
    const country = queue.shift();
    if (country) {
      if (country === destination) return distance[country];
      console.log(country);
      for (const edge of adjList[country]) {
        if (!visited[edge]) {
          queue.push(edge);
          parent[edge] = country;
          distance[edge] = distance[country] + 1;
          visited[edge] = true;
        }
      }
    }
  }
  return -1;
};

export default bfs;
