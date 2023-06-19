import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Post } from "../../types/post";
import PostCard from "./PostCard";
import {
  clearPosts,
  fetchPosts,
  getPostsError,
  getPostsStatus,
  pageSet,
  selectAllPosts,
  selectSortedPosts,
} from "./postsSlice";
import Loading from "../../components/Loading";

const PostsList = () => {
  const posts = useAppSelector(selectAllPosts);
  const sortedPosts = useAppSelector(selectSortedPosts);
  const postStatus = useAppSelector(getPostsStatus);
  const error = useAppSelector(getPostsError);
  const hasNextPage = useAppSelector((state) => state.posts.hasNextPage);
  const pageNum = useAppSelector((state) => state.posts.pageNum);

  const dispatch = useAppDispatch();

  // Clear posts when the component is mounted
  useEffect(() => {
    dispatch(clearPosts());
  }, [dispatch]);

  // Fetch posts when the pageNum changes
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    dispatch(fetchPosts({ pageNum, signal }));

    return () => {
      controller.abort();
    };
  }, [dispatch, pageNum]);

  const initObserver = useRef<IntersectionObserver | null>(null);

  // Callback function for the last post reference
  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (postStatus === "loading") return;

      if (initObserver.current) initObserver.current.disconnect();

      initObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          dispatch(pageSet(pageNum + 1));
        }
      });

      if (node) initObserver.current.observe(node);
    },
    [dispatch, hasNextPage, pageNum, postStatus]
  );

  // Render error message if fetching posts failed
  if (postStatus === "failed") return <p>{error}</p>;

  // Generate content based on search results or sorted posts
  const content = sortedPosts.map((post: Post, i) => {
    if (posts.length === i + 1) {
      // Render the last post with a reference
      return (
        <div key={`${post.id}-${i}`}>
          <PostCard
            id={post?.id}
            title={post?.title}
            description={post?.body}
            userId={post?.userId}
            timestamp={post?.date}
            ref={lastPostRef}
          />
        </div>
      );
    }

    // Render regular post
    return (
      <div key={`${post.id}-${i}`}>
        <PostCard
          id={post?.id}
          title={post?.title}
          description={post?.body}
          userId={post?.userId}
          timestamp={post?.date}
        />
      </div>
    );
  });

  return (
    <section>
      {content}
      {postStatus === "loading" && (
        <div>
          <Loading />
        </div>
      )}
    </section>
  );
};

export default PostsList;
