import React, { FC } from "react";
import "./styles.scss";

type Props = { path: string[] };

const PathContainer: FC<Props> = ({ path }: Props) => {
  return <div className="path">Path: {path}</div>;
};

export default PathContainer;
