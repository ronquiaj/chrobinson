import React, { FC } from "react";
import "./styles.css";

type Props = { countryName: string };

const Node: FC<Props> = ({ countryName }: Props) => (
  <div className="node">
    <span className="node--text">{countryName}</span>
  </div>
);

export default Node;
