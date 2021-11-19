import React, { FC } from "react";
import "./styles.scss";

type Props = {
  options: string[];
};

const Dropdown: FC<Props> = ({ options }: Props) => {
  return (
    <select name="countries" className="dropdown">
      {options.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </select>
  );
};

export default Dropdown;
