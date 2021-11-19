import React, { FC, useEffect, useState } from "react";
import Node from "./components/Node";
import { AdjacencyList } from "./types";
import bfs from "./utilities/bfs";

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

  useEffect(() => {
    console.log("in here");
    const pathInfo = bfs(adjacencyList, start, destination);
    setDistance(pathInfo.distance);
    pathInfo.path.forEach((country) => {
      setTimeout(() => {
        setAdjacencyList((oldAdjacencyList) => {
          oldAdjacencyList[country].highlighted = true;
          return { ...oldAdjacencyList };
        });
      }, 1000);
    });
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
    <>
      Start
      <input onChange={(e) => setStart(e.target.value)} value={start} />
      Destination
      <input
        onChange={(e) => setDestination(e.target.value)}
        value={destination}
      />
      Distance: {distance}
      <button onClick={() => setCompute(true)}>submit</button>
      {renderedNodes}
    </>
  );
};

export default App;
