import React, { Dispatch, FC, SetStateAction } from "react";
import "./styles.scss";

type Props = {
  options: string[];
  onChange: Dispatch<SetStateAction<string>>;
};

const Dropdown: FC<Props> = ({ options, onChange }: Props) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      name="countries"
      className="dropdown"
    >
      {options.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </select>
  );
};

export default Dropdown;
