import React, { FC } from "react";
import "./styles.scss";

type Props = { path: string[] };

const PathContainer: FC<Props> = ({ path }: Props) => {
  return (
    <div className="path">
      Path:{" "}
      <span className="path--countries">
        {path.length === 0 ? "None" : path.join(", ")}
      </span>
    </div>
  );
};

export default PathContainer;
