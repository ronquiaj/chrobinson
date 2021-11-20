import React, { FC } from "react";
import { AdjacencyList } from "../../types";
import Canvas from "../Canvas/Canvas";
import "./styles.scss";

type Props = { adjacencyList: AdjacencyList };

const Graph: FC<Props> = ({ adjacencyList }: Props) => {
  return <Canvas />;
};

export default Graph;
