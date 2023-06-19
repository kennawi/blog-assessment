import { FC } from "react";
import tw, { styled } from "twin.macro";
export type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  info?: boolean;
  purple?: boolean;
  pink?: boolean;
  red?: boolean;
  // as: string;
};

const StyledButton = styled.button<ButtonProps>`
  ${({ info, purple, pink, red }) =>
    info
      ? tw`text-blue-500 hover:underline font-medium text-lg inline-flex items-center`
      : purple
      ? tw`text-white !bg-gradient-to-r !from-purple-500 !via-purple-600 !to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`
      : pink
      ? tw`text-white !bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`
      : red
      ? tw`text-white !bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`
      : tw`text-white !bg-blue-700 disabled:!bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
`;

const Button: FC<ButtonProps> = ({
  children,
  type,
  disabled,
  info,
  onClick,
  purple,
  pink,
  red,
}) => {
  return (
    <StyledButton
      red={red}
      pink={pink}
      purple={purple}
      info={info}
      disabled={disabled}
      onClick={onClick}
      type={type ? type : "button"}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
