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
  ${({ info, purple, pink, red, disabled }) => {
    const baseStyles = tw`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none focus:ring-4`;
    const gradientStyles = tw`hover:bg-gradient-to-br`;
    const shadowStyles = tw`shadow-lg dark:shadow-lg`;
    const disabledStyles = tw`disabled:!bg-gray-800`;
    const infoStyles = tw`text-blue-500 hover:underline`;
    const purpleStyles = tw`!bg-gradient-to-r !from-purple-500 !via-purple-600 !to-purple-700 focus:ring-purple-300 dark:focus:ring-purple-800 shadow-purple-500/50 dark:shadow-purple-800/80`;
    const pinkStyles = tw`!bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 focus:ring-pink-300 dark:focus:ring-pink-800 shadow-pink-500/50 dark:shadow-pink-800/80`;
    const redStyles = tw`!bg-gradient-to-r from-red-400 via-red-500 to-red-600 focus:ring-red-300 dark:focus:ring-red-800 shadow-red-500/50 dark:shadow-red-800/80`;

    const styles = [
      baseStyles,
      gradientStyles,
      shadowStyles,
      disabled ? disabledStyles : null,
      info ? infoStyles : null,
      purple ? purpleStyles : null,
      pink ? pinkStyles : null,
      red ? redStyles : null,
    ];

    return styles.filter(Boolean);
  }}
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
