import React, { ChangeEvent, useState } from "react";
import { Select } from "../Inputs/Select";
import { useAppSelector } from "../../app/hooks";
import { selectAllUsers } from "../../features/users/usersSlice";
import Input from "../Inputs/Input";
import TextArea from "../Inputs/TextArea";
import Button from "../Inputs/Button";
import { Post } from "../../types/post";

export interface FormProps {
  initialPost?: Post;
  onSavePost: (newPost: Post) => Promise<void>;
  onDeletePost?: (() => void) | undefined;
}

const PostForm: React.FC<FormProps> = ({
  initialPost,
  onSavePost,
  onDeletePost,
}) => {
  const [title, setTitle] = useState(initialPost?.title || "");
  const [content, setContent] = useState(initialPost?.body || "");
  const [userId, setUserId] = useState(initialPost?.userId || "");

  const users = useAppSelector(selectAllUsers);

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) =>
    setUserId(Number(e.target.value));

  const canSave = [title, content, userId].every(Boolean);

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        const updatedPost: Post = {
          id: initialPost?.id || 0,
          title,
          body: content,
          userId: Number(userId),
        };
        await onSavePost(updatedPost);

        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-5 border border-purple-600 max-w-4xl mx-auto">
      <h2 className="text-white text-3xl">Add a New Post</h2>
      <form className="bg-gray-800 rounded-lg p-5 max-w-5xl mx-auto">
        <div className="mb-6">
          <Input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
        </div>
        <div className="mb-6">
          <Select
            id="postAuthor"
            name="postAuthor"
            options={users}
            onChange={onAuthorChanged}
          />
        </div>
        <div className="mb-6">
          <TextArea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
            rows={5}
            placeholder="Create a new post"
          />
        </div>
        <div className="flex justify-between">
          <Button onClick={onSavePostClicked} disabled={!canSave}>
            {initialPost ? "Update" : "Add New Post"}
          </Button>
          {onDeletePost && (
            <Button red onClick={onDeletePost}>
              Delete Post
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostForm;
