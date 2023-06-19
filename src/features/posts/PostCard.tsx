import React, { Ref, useState } from "react";
import tw, { styled } from "twin.macro";
import Button from "../../components/Inputs/Button";
import { formatDistanceToNow, parseISO } from "date-fns";

import PostAuthor from "./PostAuthor";
import { Link } from "react-router-dom";
import Container from "../../components/Layout/Container";

interface IPostCardProps {
  title: string;
  description: string;
  userId: number | string | undefined;
  date?: string;
  id?: number | string;
  timestamp?: string;
  editButton?: boolean;
  ref?: Ref<HTMLDivElement>;
}

// Styled components
const Wrapper = tw.div`bg-gray-800 border border-gray-700 rounded-lg p-8 md:p-12 flex flex-col gap-4`;
const Title = tw.h2`text-white text-3xl font-extrabold mb-2`;
const Description = tw.p`text-lg font-normal text-gray-400 mb-4`;
const Bottom = styled.div.attrs({
  className: "flex justify-between items-center",
})`
  & {
    span {
      ${tw`text-gray-300 font-medium text-lg inline-flex items-center`}
    }
  }
`;

const PostCard: React.FC<IPostCardProps> = React.forwardRef<
  HTMLDivElement,
  IPostCardProps
>(({ title, description, userId, timestamp, id, editButton }, ref) => {
  const [showFullText, setShowFullText] = useState(false);

  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  const handleReadMore = () => {
    setShowFullText(!showFullText);
  };

  // Return error message if title is missing
  if (!title) {
    return (
      <article>
        <h2>Post not found!</h2>
      </article>
    );
  }

  const postBody = (
    <Wrapper>
      <div>
        <Title>{title}</Title>
        <Description>
          {`${showFullText ? description : description.substring(0, 75)}...`}
        </Description>
        <Button info onClick={handleReadMore}>
          {showFullText ? "Read less" : "Read more"}
        </Button>
      </div>
      <Bottom>
        {editButton ? (
          <Link to={`/post/edit/${id}`}>
            <Button pink> Edit Post</Button>
          </Link>
        ) : (
          <Link to={`/post/${id}`}>
            <Button purple> View Post</Button>
          </Link>
        )}

        <PostAuthor userId={userId} />
        <span>
          &nbsp; <i>{timeAgo}</i>
        </span>
      </Bottom>
    </Wrapper>
  );

  // Conditionally wrap postBody with ref and Container component
  const content = ref ? (
    <div ref={ref}>
      <Container>{postBody}</Container>
    </div>
  ) : (
    <Container>{postBody}</Container>
  );

  return content;
});

export default PostCard;
