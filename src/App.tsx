import React, { FC, useEffect, useState } from "react";
import PathInput from "./components/PathInput";
import Node from "./components/Node";
import bfs from "./utilities/bfs";
import { AdjacencyList } from "./types";
import "./styles.scss";

const CountryList: AdjacencyList = {
  CAN: { edges: ["USA"], highlighted: false },
  USA: { edges: ["CAN", "MEX"], highlighted: false },
  MEX: { edges: ["USA", "BLZ", "GTM"], highlighted: false },
  GTM: { edges: ["MEX", "BLZ", "SLV", "HND"], highlighted: false },
  BLZ: { edges: ["MEX", "GTM"], highlighted: false },
  SLV: { edges: ["GTM", "HND"], highlighted: false },
  HND: { edges: ["NIC", "GTM", "SLV"], highlighted: false },
  NIC: { edges: ["HND", "CRI"], highlighted: false },
  CRI: { edges: ["NIC", "PAN"], highlighted: false },
  PAN: { edges: ["CRI"], highlighted: false },
};

const App: FC = () => {
  const [adjacencyList, setAdjacencyList] =
    useState<AdjacencyList>(CountryList);
  const [start, setStart] = useState<string>("USA");
  const [destination, setDestination] = useState<string>("PAN");
  const [compute, setCompute] = useState<boolean>(false);
  const [distance, setDistance] = useState<number>();

  // useEffect(() => {
  //   console.log("in here");

  //   pathInfo.path.forEach((country) => {
  //     setTimeout(() => {
  //       setAdjacencyList((oldAdjacencyList) => {
  //         oldAdjacencyList[country].highlighted = true;
  //         return { ...oldAdjacencyList };
  //       });
  //     }, 1000);
  //   });
  //   setCompute(false);
  // }, [compute]);

  const pathInfo = bfs(adjacencyList, start, destination);

  const renderedNodes = Object.keys(adjacencyList).map((node) => (
    <Node
      key={node}
      countryName={node}
      highlighted={adjacencyList[node].highlighted}
    />
  ));

  return (
    <div className="container">
      <h1 className="title">Path Finder</h1>
      <PathInput adjacencyList={adjacencyList} />

      {renderedNodes}
    </div>
  );
};

export default App;
