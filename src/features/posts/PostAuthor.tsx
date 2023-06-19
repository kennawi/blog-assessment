import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

interface IPostAuthorProps {
  userId: number | string | undefined;
}

const PostAuthor: React.FC<IPostAuthorProps> = ({ userId }) => {
  const users = useSelector(selectAllUsers);


  const author = users.find((user) => user.id === userId);


  return <span>by {author ? author.name : "Unknown author"}</span>;
};
export default PostAuthor;
