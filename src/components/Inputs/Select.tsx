import tw from "twin.macro";

export type SelectProps = {
  id?: string;
  name: string;
  value?: string;
  label?: string;
  options: option[];
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

interface option {
  id: string | number;
  name: string;
}

const StyledSelect = tw.select`bg-gray-700 text-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `;
const StyledLabel = tw.label`block mb-2 text-sm font-medium text-white `;

export const Select: React.FC<SelectProps> = ({
  id,
  name,
  options,
  onChange,
  label,
  placeholder = "Select",
}) => {
  return (
    <>
      <StyledLabel htmlFor={id ? id : name}>{label ? label : name}</StyledLabel>
      <StyledSelect id={id} name={name} onChange={onChange}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option className="text-white" key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </StyledSelect>
    </>
  );
};
