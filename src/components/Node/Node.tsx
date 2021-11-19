import React, { FC } from "react";
import "./styles.css";

type Props = { countryName: string; highlighted: boolean };

const Node: FC<Props> = ({ countryName, highlighted }: Props) => (
  <div className={`node ${highlighted && "highlighted"}`}>
    <span>{countryName}</span>
  </div>
);

export default Node;
