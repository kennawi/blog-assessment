import { selectUserById } from "./usersSlice";
import {
  fetchPosts,
  selectAllPosts,
  selectPostsByUser,
} from "../posts/postsSlice";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";

const UserPage = () => {
  const { userId } = useParams();
  const user = useAppSelector((state) => selectUserById(state, Number(userId)));

  const postsForUser = useAppSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts({}));
  }, [dispatch]);

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2 className="text-white text-3xl">{user?.name}</h2>

      <ol className="text-white text-3xl">{postTitles}</ol>
    </section>
  );
};

export default UserPage;
