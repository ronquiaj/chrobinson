import React, { FC, useState } from "react";
import Node from "./components/Node";
import { AdjacencyList } from "./types";
import bfs from "./utilities/bfs";

const CountryList: AdjacencyList = {
  CAN: ["USA"],
  USA: ["CAN", "MEX"],
  MEX: ["USA", "BLZ", "GTM"],
  GTM: ["MEX", "BLZ", "SLV", "HND"],
  BLZ: ["MEX", "GTM"],
  SLV: ["GTM", "HND"],
  HND: ["NIC", "GTM", "SLV"],
  NIC: ["HND", "CRI"],
  CRI: ["NIC", "PAN"],
  PAN: ["CRI"],
};

const App: FC = () => {
  const [adjacencyList, setAdjacencyList] =
    useState<AdjacencyList>(CountryList);
  console.log(bfs(adjacencyList, "USA", "BLZ"));
  return (
    <>
      {Object.keys(adjacencyList).map((node) => (
        <Node countryName={node} />
      ))}
    </>
  );
};

export default App;
