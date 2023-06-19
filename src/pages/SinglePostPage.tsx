import { fetchPosts } from "../features/posts/postsSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import PostCard from "../features/posts/PostCard";
import Container from "../components/Layout/Container";

const SinglePostPage = () => {
  const posts = useAppSelector((state) => state.posts.posts);
  const { postId } = useParams();
  console.log(postId, "postId");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts({}));
  }, [dispatch]);
  const post = posts.find((post) => post.id === Number(postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <Container>
      <article>
        <PostCard
          editButton
          id={post?.id}
          title={post?.title}
          description={post?.body}
          userId={post?.userId}
          timestamp={post?.date}
        />
      </article>
    </Container>
  );
};

export default SinglePostPage;
