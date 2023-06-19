import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectPostById,
  updatePost,
  deletePost,
} from "../features/posts/postsSlice";
import PostForm from "../components/Forms/PostForm";
import { Post } from "../types/post";

import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useAppSelector((state) => selectPostById(state, Number(postId)));

  const dispatch = useAppDispatch();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onSavePost = async (updatedPost: Post) => {
    try {
      await dispatch(updatePost(updatedPost));
      navigate(`/post/${postId}`);
    } catch (err) {
      console.error("Failed to save the post", err);
    }
  };

  const handelDeletePost = async () => {
    try {
      await dispatch(deletePost(post));
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <PostForm
        initialPost={post}
        onSavePost={onSavePost}
        onDeletePost={handelDeletePost}
      />
    </section>
  );
};

export default EditPost;
