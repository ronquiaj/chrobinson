import React, { FC } from "react";
import "./styles.scss";

type Props = { distance: number | undefined };

const DistanceContainer: FC<Props> = ({ distance }: Props) => {
  return <div className="distance">Distance: {distance}</div>;
};

export default DistanceContainer;
