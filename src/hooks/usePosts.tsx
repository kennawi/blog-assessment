import { useEffect, useState } from "react";
import {
  fetchPosts,
  getPostsError,
  getPostsStatus,
  selectAllPosts,
} from "../features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Post } from "../types/post";

const usePosts = (pageNum = 1) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    dispatch(fetchPosts({ pageNum, signal }));

    return () => {
      controller.abort();
    };
  }, [dispatch, pageNum]);

  return { posts, postStatus, error, hasMore, results };
};

export default usePosts;
