import React, { Children } from "react";
import tw from "twin.macro";

interface IContainerProps {
  children: React.ReactNode;
}

const StyledContainer = tw.div`py-8 px-4 mx-auto max-w-screen-xl mt-5 lg:py-16`;
const Container: React.FC<IContainerProps> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
