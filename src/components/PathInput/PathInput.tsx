import React, { FC } from "react";
import { AdjacencyList } from "../../types";
import Dropdown from "../Dropdown";
import "./styles.scss";

type Props = {
  adjacencyList: AdjacencyList;
};

const PathInput: FC<Props> = ({ adjacencyList }: Props) => {
  return (
    <div className="pathinput">
      <div className="pathinput--start">
        <span>Start</span>
        <Dropdown options={Object.keys(adjacencyList)} />
      </div>
      <div className="pathinput--destination">
        <span>Destination</span>
        <Dropdown options={Object.keys(adjacencyList)} />
      </div>
    </div>
  );
};

export default PathInput;
