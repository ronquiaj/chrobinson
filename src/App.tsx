import React, { FC, useEffect, useState } from "react";
import PathInput from "./components/PathInput";
import Node from "./components/Node";
import bfs from "./utilities/bfs";
import { AdjacencyList } from "./types";
import "./styles.scss";
import Header from "./components/Header";
import Button from "./components/Button";

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
  const [path, setPath] = useState<string[]>([]);
  const [compute, setCompute] = useState<boolean>(false);
  const [distance, setDistance] = useState<number>();

  useEffect(() => {
    const pathInfo = bfs(adjacencyList, start, destination);
    setDistance(pathInfo.distance);

    console.log("in here");

    setCompute(false);
  }, [compute]);

  const renderedNodes = Object.keys(adjacencyList).map((node) => (
    <Node
      key={node}
      countryName={node}
      highlighted={adjacencyList[node].highlighted}
    />
  ));

  return (
    <div className="container">
      <Header
      destination={destination}
      start={start}
        adjacencyList={adjacencyList}
        setDestination={setDestination}
        setStart={setStart}
        distance={distance}
        path={path}
      />
      <Button buttonText={"Compute"} onClick={() => setCompute(true)} />
      {renderedNodes}
    </div>
  );
};

export default App;
