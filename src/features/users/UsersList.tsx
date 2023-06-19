import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetchPosts } from "../posts/postsSlice";

const UsersList = () => {
  const users = useSelector(selectAllUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts({}));
  }, [dispatch]);

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section>
      <h2 className="text-white text-2xl ">Users</h2>

      <ul className="text-white text-2xl">{renderedUsers}</ul>
    </section>
  );
};

export default UsersList;
