import React, { FC } from "react";
import "./styles.scss";

type Props = { buttonText: string; onClick: () => void };

const Button: FC<Props> = ({ buttonText, onClick }: Props) => {
  return (
    <div className="button" onClick={onClick}>
      <span>{buttonText}</span>
    </div>
  );
};

export default Button;
