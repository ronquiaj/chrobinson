import React, { FC, useEffect, useState } from "react";
import bfs from "./utilities/bfs";
import { AdjacencyList } from "./types";
import "./styles.scss";
import Header from "./components/Header";
import Button from "./components/Button";
import Graph from "./components/Graph";

const CountryList: AdjacencyList = {
  CAN: { edges: ["USA"] },
  USA: { edges: ["CAN", "MEX"] },
  MEX: { edges: ["USA", "BLZ", "GTM"] },
  GTM: { edges: ["MEX", "BLZ", "SLV", "HND"] },
  BLZ: { edges: ["MEX", "GTM"] },
  SLV: { edges: ["GTM", "HND"] },
  HND: { edges: ["NIC", "GTM", "SLV"] },
  NIC: { edges: ["HND", "CRI"] },
  CRI: { edges: ["NIC", "PAN"] },
  PAN: { edges: ["CRI"] },
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
    setPath(pathInfo.path);

    console.log("in here");
    setCompute(false);
  }, [compute]);

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
      <Graph adjacencyList={adjacencyList} />
    </div>
  );
};

export default App;
