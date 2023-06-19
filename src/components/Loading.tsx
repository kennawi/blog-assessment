import tw from "twin.macro";

const StyledContainer = tw.div`z-50 bg-transparent bg-gray-300 inset-0 w-screen  fixed flex h-screen top-20 justify-center items-center py-8 px-4 mx-auto max-w-screen-xl mt-5 lg:py-16`;
const StyledLoading = tw.div`bg-transparent text-white text-5xl`;
const Loading = () => {
  return (
    <StyledContainer>
      <StyledLoading>Loading...</StyledLoading>
    </StyledContainer>
  );
};

export default Loading;
