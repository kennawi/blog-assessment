import PostsList from "../features/posts/PostsList";

import NewPostForm from "./AddNewPost";

const BlogPage = () => {
  return (
    <div className="mt-10">
      <NewPostForm />
      <PostsList />
    </div>
  );
};

export default BlogPage;
