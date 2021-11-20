import React, { Dispatch, FC, SetStateAction } from "react";
import { AdjacencyList } from "../../types";
import DistanceContainer from "../DistanceContainer";
import PathContainer from "../PathContainer";
import PathInput from "../PathInput";
import "./styles.scss";

type Props = {
  setDestination: Dispatch<SetStateAction<string>>;
  setStart: Dispatch<SetStateAction<string>>;
  distance: number | undefined;
  start: string;
  destination: string;
  path: string[];
  adjacencyList: AdjacencyList;
};

const Header: FC<Props> = ({
  setDestination,
  setStart,
  adjacencyList,
  distance,
  path,
  destination,
  start,
}: Props) => {
  return (
    <>
      <h1 className="title">Path Finder</h1>
      <h4 className="subheader">Created by Adrian Ronquillo</h4>
      <div className="row">
        <PathContainer path={path} />
        <PathInput
          destination={destination}
          destinationOnChange={setDestination}
          startOnChange={setStart}
          adjacencyList={adjacencyList}
          start={start}
        />
        <DistanceContainer distance={distance} />
      </div>
    </>
  );
};

export default Header;
