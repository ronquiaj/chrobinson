export type Edges = string[];

export type AdjacencyList = {
  [key: string]: { edges: Edges; highlighted: boolean };
};
