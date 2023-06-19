import React, { FC } from "react";
import tw from "twin.macro";

export type InputProps = {
  id?: string;
  name: string;
  value: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?:
    | "text"
    | "email"
    | "url"
    | "password"
    | "date"
    | "datetime-local"
    | "month"
    | "search"
    | "tel"
    | "time"
    | "week";
  rules?: Record<string, any>;
  width?: string;
  placeholder?: string;
  notValid?: any;
};

const StyledInput = tw.input`shadow-sm bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  `;
const StyledLabel = tw.label`block mb-2 text-sm font-medium text-white `;
const Input: FC<InputProps> = ({
  id,
  name,
  type,
  value,
  onChange,
  label,
  placeholder = "",
}) => {
  return (
    <>
      <StyledLabel htmlFor={id ? id : name}>{label ? label : name}</StyledLabel>
      <StyledInput
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        name={name}
        id={id}
      />
    </>
  );
};

export default Input;
