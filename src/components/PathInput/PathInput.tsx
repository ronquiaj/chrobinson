import React, { Dispatch, FC, SetStateAction } from "react";
import { AdjacencyList } from "../../types";
import Dropdown from "../Dropdown";
import "./styles.scss";

type Props = {
  adjacencyList: AdjacencyList;
  startOnChange: Dispatch<SetStateAction<string>>;
  destinationOnChange: Dispatch<SetStateAction<string>>;
};

const PathInput: FC<Props> = ({
  adjacencyList,
  destinationOnChange,
  startOnChange,
}: Props) => {
  return (
    <div className="pathinput">
      <div className="pathinput--start">
        <span>Start</span>
        <Dropdown
          onChange={startOnChange}
          options={Object.keys(adjacencyList)}
        />
      </div>
      <div className="pathinput--destination">
        <span>Destination</span>
        <Dropdown
          onChange={destinationOnChange}
          options={Object.keys(adjacencyList)}
        />
      </div>
    </div>
  );
};

export default PathInput;
