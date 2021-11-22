export type Edges = string[];

export type AdjacencyList = {
  [key: string]: { edges: Edges };
};

export type GraphType = {
  [key: string]: { x: number; y: number };
};
