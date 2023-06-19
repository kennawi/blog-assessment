import React, { ChangeEvent } from "react";
import tw from "twin.macro";

interface ITextAreaProps {
  value: string;
  label?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  rows: number;
  name: string;
  id?: string;
  placeholder?: string;
}
const StyledLabel = tw.label`block mb-2 text-sm font-medium text-white `;
const StyledTextArea = tw.textarea`block p-2.5 w-full text-sm text-white bg-gray-700   rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 `;
const TextArea: React.FC<ITextAreaProps> = ({
  value,
  onChange,
  rows,
  name,
  label,
  id,
  placeholder,
}) => {
  return (
    <>
      <StyledLabel htmlFor={id ? id : name}>{label ? label : name}</StyledLabel>
      <StyledTextArea
        id={id ? id : name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextArea;
