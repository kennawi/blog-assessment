import { addNewPost } from "../features/posts/postsSlice";
import { unwrapResult } from "@reduxjs/toolkit";

import { useAppDispatch } from "../app/hooks";

import { Post } from "../types/post";
import PostForm, { FormProps } from "../components/Forms/PostForm";

const AddNewPost = () => {
  const dispatch = useAppDispatch();

  const onSavePostClicked = async (newPost: Post) => {
    try {
      const actionResult = await dispatch(addNewPost(newPost));
      unwrapResult(actionResult);
    } catch (err) {
      console.error("Failed to save the post", err);
    }
  };
  const addPostFormProps: FormProps = {
    onSavePost: onSavePostClicked,
  };

  return <PostForm {...addPostFormProps} />;
};

export default AddNewPost;
