import React, { Dispatch, FC, SetStateAction } from "react";
import "./styles.scss";

type Props = {
  options: string[];
  startValue: string;
  onChange: Dispatch<SetStateAction<string>>;
};

const Dropdown: FC<Props> = ({ options, onChange, startValue }: Props) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      value={startValue}
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
